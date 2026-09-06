(function(){
const PRIMARY_UID='aBYdbFwbsTUbpmYtoNurxyu3Roj2';
let fs;
async function api(){if(!fs)fs=await import('https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js');return fs}
function row(b){return b.closest('.row')||b.parentElement}
function uid(b){const r=row(b);return b.dataset.admin||(r&&r.dataset.admin)||(r&&r.dataset.uid)||''}
function patch(){
 const list=document.getElementById('ceList');if(!list)return;
 list.querySelectorAll('button').forEach(function(b){
  if((b.textContent||'').trim()!=='Disable')return;
  const r=row(b),t=(r&&r.textContent||'').toLowerCase();
  if(t.indexOf('disabled')>=0)b.textContent='Enable';
 });
}
async function enable(b){
 const f=window.credenceFirebase;if(!f||!f.auth||!f.db)return;
 const u=f.auth.currentUser;if(!u)return;
 const id=uid(b);if(!id||id===PRIMARY_UID)return;
 try{const x=await api();await x.updateDoc(x.doc(f.db,'superAdmins',id),{active:true,updatedAt:x.serverTimestamp(),updatedBy:u.uid});if(window.credenceOpenSuperAdmins)window.credenceOpenSuperAdmins()}catch(e){alert('Could not enable Super Admin: '+e.message)}
}
document.addEventListener('click',function(e){const b=e.target.closest&&e.target.closest('button');if(!b)return;const list=document.getElementById('ceList');if(!list||!list.contains(b))return;if((b.textContent||'').trim()!=='Enable')return;e.preventDefault();e.stopPropagation();enable(b)},true);
patch();new MutationObserver(patch).observe(document.body,{childList:true,subtree:true,characterData:true});setInterval(patch,1000);
})();
