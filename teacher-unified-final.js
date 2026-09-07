(function(){
'use strict';
const UID='aBYdbFwbsTUbpmYtoNurxyu3Roj2';
let fp;
const fs=()=>fp||(fp=import('https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js'));
const fb=()=>window.credenceFirebase;
const txt=e=>String(e?.textContent||'').replace(/\s+/g,' ').trim();
const visible=e=>{if(!e)return false;const s=getComputedStyle(e);return s.display!=='none'&&s.visibility!=='hidden'};
async function admin(){const f=fb(),u=f?.auth?.currentUser;if(!f||!u)return false;if(u.uid===UID)return true;try{const x=await fs(),d=await x.getDoc(x.doc(f.db,'superAdmins',u.uid));return d.exists()&&d.data().active===true}catch(e){return false}}
function modal(){return [...document.querySelectorAll('.modal')].find(m=>visible(m)&&/teacher name|create teacher|add teacher/i.test(txt(m)))}
function patchModal(){const m=modal();if(!m)return;const grid=m.querySelector('.formgrid');if(!grid)return;[...grid.querySelectorAll('.field')].forEach(f=>{if(/^classes?$/i.test(txt(f.querySelector('label'))))f.remove()});const fields=[...grid.querySelectorAll('.field')];const has=r=>fields.some(f=>r.test(txt(f.querySelector('label'))));if(!has(/^phone$/i)){const f=document.createElement('div');f.className='field';f.innerHTML='<label>Phone</label><input type="tel" autocomplete="tel" placeholder="Phone number">';grid.appendChild(f)}if(!has(/^email$/i)){const f=document.createElement('div');f.className='field';f.innerHTML='<label>Email</label><input type="email" autocomplete="email" placeholder="teacher@example.com">';grid.appendChild(f)}}
function rowId(r){return r.querySelector('[data-remove-teacher]')?.dataset.removeTeacher||r.querySelector('[data-teacher-id]')?.dataset.teacherId||''}
function patchRows(){const body=document.getElementById('ceTeacherRows');if(!body)return;body.querySelectorAll('tr').forEach(r=>{const id=rowId(r);if(!id)return;let b=r.querySelector('[data-unified-teacher-toggle]');const disabled=!!r.querySelector('.badge.cancel')||/\bdisabled\b/i.test(txt(r));if(!b){b=document.createElement('button');b.type='button';b.dataset.unifiedTeacherToggle='1';const rm=r.querySelector('[data-remove-teacher]');(rm?.parentElement||r).appendChild(b)}b.textContent=disabled?'Enable':'Disable';b.onclick=async e=>{e.preventDefault();e.stopImmediatePropagation();if(!(await admin()))return alert('Super Admin permission required.');try{const x=await fs(),f=fb();await x.updateDoc(x.doc(f.db,'teachers',id),{active:!disabled,updatedAt:x.serverTimestamp(),updatedBy:f.auth.currentUser.uid});window.credenceOpenTeachers?.()}catch(err){alert('Could not update teacher: '+(err.message||err))}}})}
function teacherPage(){try{window.credenceOpenTeachers?.();setTimeout(patchRows,150)}catch(e){}}
function homeTeacher(){const b=[...document.querySelectorAll('button')].find(x=>!x.closest('.mobilebar')&&/\+?\s*(add\s*)?teacher/i.test(txt(x)));if(b){b.click();setTimeout(patchModal,80)}else{patchModal()}}
document.addEventListener('click',e=>{const b=e.target.closest?.('button');if(!b)return;const t=txt(b);if(/^teachers$/i.test(t)&&b.closest('.mobilebar')){e.preventDefault();e.stopImmediatePropagation();teacherPage();return}if(/\+?\s*(add\s*)?teacher|create teacher/i.test(t)){setTimeout(patchModal,20)}},true);
window.credencePatchTeacherFinal=()=>{patchModal();patchRows()};
patchModal();patchRows();setInterval(()=>{patchModal();patchRows()},1200);
})();
