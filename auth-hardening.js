(function(){
  const PRIMARY_UID='aBYdbFwbsTUbpmYtoNurxyu3Roj2';
  const wait=()=>new Promise(resolve=>{
    const started=Date.now();
    const t=setInterval(()=>{
      if(window.credenceFirebase){clearInterval(t);resolve(window.credenceFirebase)}
      else if(Date.now()-started>10000){clearInterval(t);resolve(null)}
    },50);
  });

  wait().then(f=>{
    if(!f)return;
    const {auth,ADMIN_UID,signInWithEmailAndPassword,signOut,db}=f;
    const originalLogin=window.adminLogin;
    if(typeof originalLogin!=='function')return;

    async function authorized(uid){
      if(uid===PRIMARY_UID || uid===ADMIN_UID)return true;
      try{
        const {doc,getDoc}=await import('https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js');
        const s=await getDoc(doc(db,'superAdmins',uid));
        return s.exists() && s.data().active===true;
      }catch(e){
        console.error('CREDENCE admin authorization check failed:',e);
        return false;
      }
    }

    window.adminLogin=async function(){
      const emailEl=document.getElementById('adminEmailInput');
      const passEl=document.getElementById('adminPasswordInput');
      const err=document.getElementById('loginError');
      const btn=document.querySelector('#adminGate .btn');
      const email=(emailEl?.value||'').trim().toLowerCase();
      const password=passEl?.value||'';

      if(!err||!btn)return originalLogin();
      err.textContent='';

      if(!email){
        err.textContent='Enter your registered admin email.';
        return;
      }
      if(!email.includes('@')||!email.includes('.')||email.startsWith('@')||email.endsWith('@')){
        err.textContent='Please enter a valid email address.';
        return;
      }
      if(!password){
        err.textContent='Enter your admin password.';
        return;
      }

      btn.disabled=true;
      btn.textContent='Signing in...';

      try{
        const cred=await signInWithEmailAndPassword(auth,email,password);
        if(!cred?.user || !(await authorized(cred.user.uid))){
          await signOut(auth).catch(()=>{});
          err.textContent='Login denied: this Firebase account is not an active CREDENCE admin.';
          btn.disabled=false;
          btn.textContent='Login as Admin';
          return;
        }
        btn.textContent='Login successful...';
      }catch(e){
        console.error('CREDENCE hardened admin login error:',e);
        const code=e?.code||'';
        if(code==='auth/user-not-found'||code==='auth/invalid-credential'||code==='auth/wrong-password'){
          err.textContent='Login failed: email or password is incorrect, or the account is not registered.';
        }else if(code==='auth/invalid-email'){
          err.textContent='Login failed: please enter a valid registered email address.';
        }else if(code==='auth/too-many-requests'){
          err.textContent='Too many failed attempts. Please wait and try again.';
        }else{
          err.textContent='Login failed: '+(e?.message||'Please check your registered email and password.');
        }
        btn.disabled=false;
        btn.textContent='Login as Admin';
      }
    };
  });
})();
