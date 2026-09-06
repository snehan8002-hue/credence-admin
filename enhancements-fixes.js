(function(){
  const PRIMARY_UID='aBYdbFwbsTUbpmYtoNurxyu3Roj2';
  const wait=()=>new Promise(resolve=>{
    const t=setInterval(()=>{if(window.credenceFirebase){clearInterval(t);resolve(window.credenceFirebase)}},50);
    setTimeout(()=>{clearInterval(t);resolve(window.credenceFirebase)},10000);
  });
  async function start(){
    const f=await wait();if(!f)return;
    const {db,auth}=f;
    const {doc,getDoc,updateDoc,deleteDoc,serverTimestamp}=await import('https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js');
    const isSuper=async()=>{const u=auth.currentUser;if(!u)return false;if(u.uid===PRIMARY_UID)return true;try{const s=await getDoc(doc(db,'superAdmins',u.uid));return s.exists()&&s.data().active===true}catch(e){return false}};
    const toast=msg=>{let x=document.getElementById('ceFixToast');if(!x){x=document.createElement('div');x.id='ceFixToast';x.style='position:fixed;right:18px;bottom:82px;background:#17352a;color:#fff;padding:12px 15px;border-radius:10px;z-index:99999;font-weight:700';document.body.appendChild(x)}x.textContent=msg;x.style.display='block';clearTimeout(x._t);x._t=setTimeout(()=>x.style.display='none',2500)};
    async function setAdmin(uid,active){
      if(!(await isSuper()))return toast('Not authorized.');
      if(uid===PRIMARY_UID)return toast('The primary Super Admin cannot be changed.');
      try{await updateDoc(doc(db,'superAdmins',uid),{active,updatedAt:serverTimestamp(),updatedBy:auth.currentUser.uid});toast(active?'Super Admin enabled.':'Super Admin disabled.');if(window.credenceOpenSuperAdmins)window.credenceOpenSuperAdmins()}catch(e){toast('Could not update admin: '+e.message)}
    }
    function fixAdmins(){
      const list=document.getElementById('ceList');if(!list)return;
      list.querySelectorAll('[data-admin]').forEach(b=>{
        const row=b.closest('.row');const disabled=!!row?.querySelector('.badge.cancel');
        b.textContent=disabled?'Enable':'Disable';
        b.classList.toggle('danger',!disabled);
        b.onclick=()=>setAdmin(b.dataset.admin,disabled);
      });
    }
    async function removeStudent(id,name){
      if(!(await isSuper()))return toast('Not authorized.');
      if(!confirm('Remove '+(name||'this student')+' permanently? This cannot be undone.'))return;
      try{await deleteDoc(doc(db,'students',id));toast('Student removed.')}catch(e){toast('Could not remove student: '+e.message)}
    }
    function fixStudents(){
      const body=document.getElementById('ceStudentRows');if(!body)return;
      body.querySelectorAll('[data-toggle-student]').forEach(toggle=>{
        const row=toggle.closest('tr');if(!row||row.querySelector('[data-remove-student]'))return;
        const id=toggle.dataset.toggleStudent;
        const name=row.querySelector('td b')?.textContent||'this student';
        const b=document.createElement('button');b.className='btn danger';b.textContent='Remove';b.dataset.removeStudent=id;b.style.marginLeft='4px';b.onclick=()=>removeStudent(id,name);
        toggle.parentElement.appendChild(b);
      });
    }
    const observe=(id,fn)=>{const el=document.getElementById(id);if(!el)return;fn();new MutationObserver(fn).observe(el,{childList:true,subtree:true})};
    const boot=()=>{fixAdmins();fixStudents();observe('ceList',fixAdmins);observe('ceStudentRows',fixStudents)};
    boot();setTimeout(boot,500);setTimeout(boot,1500);
    document.addEventListener('click',e=>{
      const b=e.target.closest?.('button');if(!b)return;
      const t=(b.textContent||'').replace(/\s+/g,' ').trim();
      if(/super admins/i.test(t)&&window.credenceOpenSuperAdmins){e.preventDefault();e.stopPropagation();window.credenceOpenSuperAdmins();return}
      if(/^students?$/i.test(t)&&window.credenceOpenStudents){e.preventDefault();e.stopPropagation();window.credenceOpenStudents();return}
    },true);
    window.credenceFixesLoaded=true;
  }
  start();
})();
