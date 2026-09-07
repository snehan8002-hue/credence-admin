(function(){
  'use strict';

  const norm = v => String(v || '').replace(/\s+/g,' ').trim().toLowerCase();

  function findButton(label){
    return [...document.querySelectorAll('button')].find(b => norm(b.textContent) === norm(label));
  }

  function openCustomize(){
    const candidates = [findButton('Customize App'),findButton('Customize')].filter(Boolean);
    const target = candidates[0];
    if(target){
      target.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));
      return true;
    }
    const customizeView = [...document.querySelectorAll('.view')].find(v => {
      const text = norm(v.querySelector('h1,h2,h3')?.textContent || v.textContent);
      return text.includes('customize');
    });
    if(customizeView){
      document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
      customizeView.classList.add('active');
      return true;
    }
    return false;
  }

  function wire(){
    document.querySelectorAll('.mobilebar button').forEach(btn=>{
      if(btn.dataset.ceUiFinal === '1') return;
      const text = norm(btn.textContent);
      if(text.includes('customize')){
        btn.dataset.ceUiFinal = '1';
        btn.type = 'button';
        btn.style.cursor = 'pointer';
        btn.onclick = function(e){
          e.preventDefault(); e.stopPropagation();
          if(!openCustomize()) console.warn('CREDENCE: Customize target not found yet.');
        };
      }
    });
  }

  /* FINAL ADMIN LOGIN REPAIR
     This is intentionally installed last so no older enhancement can replace
     the Firebase login handler. It also completes the UI transition directly
     after a successful authorized sign-in instead of waiting for another
     callback to do it.
  */
  function installAdminLogin(){
    const f=window.credenceFirebase;
    if(!f || typeof f.signInWithEmailAndPassword!=='function') return false;
    const gate=document.getElementById('adminGate');
    const shell=document.getElementById('appShell');
    const emailEl=document.getElementById('adminEmailInput');
    const passEl=document.getElementById('adminPasswordInput');
    const err=document.getElementById('loginError');
    const btn=gate?.querySelector('.btn');
    if(!gate||!shell||!emailEl||!passEl||!err||!btn) return false;
    if(window.__credenceFinalAdminLoginInstalled) return true;
    window.__credenceFinalAdminLoginInstalled=true;

    window.adminLogin=async function(){
      const email=emailEl.value.trim();
      const password=passEl.value;
      err.textContent='';
      if(!email || !password){err.textContent='Enter admin email and password.';return;}
      btn.disabled=true;
      btn.textContent='Signing in...';
      try{
        const cred=await f.signInWithEmailAndPassword(f.auth,email,password);
        const user=cred && cred.user;
        if(!user) throw new Error('Firebase did not return a signed-in user.');
        let authorized=user.uid===f.ADMIN_UID;
        if(!authorized){
          try{
            const mod=await import('https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js');
            const snap=await mod.getDoc(mod.doc(f.db,'superAdmins',user.uid));
            authorized=snap.exists() && snap.data().active===true;
          }catch(authCheckError){
            console.error('CREDENCE admin authorization check failed:',authCheckError);
          }
        }
        if(!authorized){
          await f.signOut().catch(()=>{});
          err.textContent='Firebase login succeeded, but this account is not an active CREDENCE admin (UID: '+user.uid+').';
          btn.disabled=false;
          btn.textContent='Login as Admin';
          return;
        }
        gate.style.display='none';
        shell.style.display='block';
        const who=document.getElementById('adminEmail');
        if(who) who.textContent=user.email || 'Firebase Admin';
        btn.disabled=false;
        btn.textContent='Login as Admin';
      }catch(e){
        console.error('CREDENCE FINAL admin login error:',e);
        const code=e?.code || '';
        let message=e?.message || 'Login failed.';
        if(code==='auth/invalid-credential') message='Incorrect admin email or password.';
        else if(code==='auth/user-not-found') message='No Firebase user exists with this email.';
        else if(code==='auth/wrong-password') message='Incorrect admin password.';
        else if(code==='auth/invalid-email') message='Invalid email address.';
        else if(code==='auth/too-many-requests') message='Too many attempts. Please wait and try again.';
        err.textContent=(code?code+': ':'')+message;
        btn.disabled=false;
        btn.textContent='Login as Admin';
      }
    };
    return true;
  }

  function boot(){
    installAdminLogin();
    wire();
  }

  boot();
  const timer=setInterval(()=>{
    boot();
    if(window.__credenceFinalAdminLoginInstalled) clearInterval(timer);
  },100);

  if(document.body) new MutationObserver(wire).observe(document.body,{childList:true,subtree:true});
})();
