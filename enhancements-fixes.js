(function(){
const PRIMARY_UID='aBYdbFwbsTUbpmYtoNurxyu3Roj2';
let fsPromise;
const fs=()=>fsPromise||(fsPromise=import('https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js'));
const txt=b=>(b?.textContent||'').replace(/\s+/g,' ').trim();
const authorized=()=>{const f=window.credenceFirebase,u=f?.auth?.currentUser;return !!u&&(u.uid===PRIMARY_UID||!!f)};
async function canManage(){const f=window.credenceFirebase,u=f?.auth?.currentUser;if(!f||!u)return false;if(u.uid===PRIMARY_UID)return true;try{const x=await fs(),s=await x.getDoc(x.doc(f.db,'superAdmins',u.uid));return s.exists()&&s.data().active===true}catch(e){return false}}
async function setAdmin(id,active){if(!(await canManage()))return alert('Not authorized.');if(!id||id===PRIMARY_UID)return;try{const x=await fs(),f=window.credenceFirebase;await x.updateDoc(x.doc(f.db,'superAdmins',id),{active,updatedAt:x.serverTimestamp(),updatedBy:f.auth.currentUser.uid});if(window.credenceOpenSuperAdmins)window.credenceOpenSuperAdmins()}catch(e){alert('Could not update Super Admin: '+e.message)}}
async function setStudent(id,active){if(!(await canManage()))return;try{const x=await fs(),f=window.credenceFirebase;await x.updateDoc(x.doc(f.db,'students',id),{active,updatedAt:x.serverTimestamp()});if(window.credenceOpenStudents)window.credenceOpenStudents()}catch(e){alert('Could not update student: '+e.message)}}
async function removeStudent(id,name){if(!(await canManage()))return;if(!confirm('Remove '+name+' permanently? This cannot be undone.'))return;try{const x=await fs(),f=window.credenceFirebase;await x.deleteDoc(x.doc(f.db,'students',id));if(window.credenceOpenStudents)window.credenceOpenStudents()}catch(e){alert('Could not remove student: '+e.message)}}
function patch(){
 const list=document.getElementById('ceList');
 if(list)list.querySelectorAll('button[data-admin]').forEach(b=>{const row=b.closest('.row');const disabled=!!row?.querySelector('.badge.cancel');b.textContent=disabled?'Enable':'Disable';b.classList.toggle('danger',!disabled)});
 const body=document.getElementById('ceStudentRows');
 if(body)body.querySelectorAll('tr').forEach(r=>{const b=r.querySelector('button[data-toggle-student]');if(!b)return;const disabled=!!r.querySelector('.badge.cancel');b.textContent=disabled?'Enable':'Disable';b.classList.toggle('danger',!disabled);if(!r.querySelector('button[data-remove-student]')){const id=b.dataset.toggleStudent;const rm=document.createElement('button');rm.className='btn danger';rm.dataset.removeStudent=id;rm.textContent='Remove';rm.style.marginLeft='6px';rm.onclick=()=>removeStudent(id,r.querySelector('td b')?.textContent||'this student');b.parentElement.appendChild(rm)}});
 const quick=[...document.querySelectorAll('button')].find(b=>/^\s*Customize App\s*$/i.test(txt(b)));
 document.querySelectorAll('.mobilebar button').forEach(b=>{if(/^\s*Customize\s*$/i.test(txt(b))&&!b.dataset.ceCustomize){b.dataset.ceCustomize='1';b.onclick=e=>{e.preventDefault();if(quick)quick.click()}}});
}
document.addEventListener('click',e=>{const b=e.target.closest?.('button[data-admin]');if(b&&txt(b)==='Enable'){e.preventDefault();e.stopImmediatePropagation();setAdmin(b.dataset.admin,true);return}const s=e.target.closest?.('button[data-toggle-student]');if(s){e.preventDefault();e.stopImmediatePropagation();const r=s.closest('tr');setStudent(s.dataset.toggleStudent,!!r?.querySelector('.badge.cancel'));return}const rm=e.target.closest?.('button[data-remove-student]');if(rm){e.preventDefault();e.stopImmediatePropagation();removeStudent(rm.dataset.removeStudent,'this student');return}},true);
patch();new MutationObserver(patch).observe(document.body,{childList:true,subtree:true,characterData:true});setInterval(patch,600);
})();
