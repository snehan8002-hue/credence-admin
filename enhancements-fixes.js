(function(){
const patch=()=>{
 const list=document.getElementById('ceList');
 if(list)list.querySelectorAll('button[data-admin]').forEach(b=>{const d=!!b.closest('.row')?.querySelector('.badge.cancel');b.textContent=d?'Enable':'Disable';b.classList.toggle('danger',!d)});
 const body=document.getElementById('ceStudentRows');
 if(body)body.querySelectorAll('button[data-toggle-student]').forEach(b=>{const d=!!b.closest('tr')?.querySelector('.badge.cancel');b.textContent=d?'Enable':'Disable';b.classList.toggle('danger',!d)});
 document.querySelectorAll('button').forEach(b=>{if((b.textContent||'').replace(/\s+/g,' ').trim().toLowerCase()==='customize'&&!b.dataset.ceCustomize){b.dataset.ceCustomize='1';b.onclick=()=>{const q=[...document.querySelectorAll('button')].find(x=>/customize app/i.test((x.textContent||'').trim()));if(q)q.click()}}});
};
async function adminEnable(b){const f=window.credenceFirebase,u=f?.auth?.currentUser;if(!f||!u||u.uid==='aBYdbFwbsTUbpmYtoNurxyu3Roj2')return;const id=b.dataset.admin;if(!id)return;try{const x=await import('https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js');await x.updateDoc(x.doc(f.db,'superAdmins',id),{active:true,updatedAt:x.serverTimestamp(),updatedBy:u.uid});if(window.credenceOpenSuperAdmins)window.credenceOpenSuperAdmins()}catch(e){alert('Could not enable Super Admin: '+e.message)}}
document.addEventListener('click',e=>{const b=e.target.closest?.('button[data-admin]');if(b&&(b.textContent||'').trim()==='Enable'){e.preventDefault();e.stopPropagation();adminEnable(b)}},true);
patch();new MutationObserver(patch).observe(document.body,{childList:true,subtree:true,characterData:true});setInterval(patch,700);
})();
