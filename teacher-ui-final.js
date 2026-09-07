(function(){
'use strict';
const PRIMARY_UID='aBYdbFwbsTUbpmYtoNurxyu3Roj2';
const clean=s=>String(s||'').replace(/\s+/g,' ').trim();
let fsPromise;const fs=()=>fsPromise||(fsPromise=import('https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js'));
const fb=()=>window.credenceFirebase;
async function isSuper(){const f=fb(),u=f?.auth?.currentUser;if(!f||!u)return false;if(u.uid===PRIMARY_UID)return true;try{const x=await fs(),s=await x.getDoc(x.doc(f.db,'superAdmins',u.uid));return s.exists()&&s.data().active===true}catch(e){return false}}
function visible(e){if(!e)return false;const s=getComputedStyle(e);return s.display!=='none'&&s.visibility!=='hidden'}
function teacherModal(){return [...document.querySelectorAll('.modal')].find(m=>visible(m)&&/teacher name|create teacher|add teacher/i.test(clean(m.textContent)))}
function patchHome(){const m=teacherModal();if(!m)return;const grid=m.querySelector('.formgrid');if(!grid)return;[...grid.querySelectorAll('.field')].forEach(f=>{if(/^classes?$/i.test(clean(f.querySelector('label')?.textContent)))f.remove()});const fields=()=>[...grid.querySelectorAll('.field')];if(!fields().some(f=>/^phone$/i.test(clean(f.querySelector('label')?.textContent)))){const f=document.createElement('div');f.className='field';f.innerHTML='<label>Phone</label><input type="tel" autocomplete="tel" placeholder="Phone number">';grid.appendChild(f)}if(!fields().some(f=>/^email$/i.test(clean(f.querySelector('label')?.textContent)))){const f=document.createElement('div');f.className='field';f.innerHTML='<label>Email</label><input type="email" autocomplete="email" placeholder="teacher@example.com">';grid.appendChild(f)}}
async function toggle(id,next){if(!(await isSuper()))return;try{const x=await fs(),f=fb();await x.updateDoc(x.doc(f.db,'teachers',id),{active:!!next,updatedAt:x.serverTimestamp(),updatedBy:f.auth.currentUser.uid});window.credenceOpenTeachers?.()}catch(e){alert('Could not update teacher: '+e.message)}}
function patchRows(){const body=document.getElementById('ceTeacherRows');if(!body)return;body.querySelectorAll('tr').forEach(r=>{const rm=r.querySelector('[data-remove-teacher]');if(!rm)return;const id=rm.dataset.removeTeacher;let b=r.querySelector('[data-final-teacher-toggle]');const disabled=!!r.querySelector('.badge.cancel');if(!b){b=document.createElement('button');b.type='button';b.dataset.finalTeacherToggle='1';rm.parentElement.insertBefore(b,rm)}b.textContent=disabled?'Enable':'Disable';b.className='btn '+(disabled?'alt':'danger');b.onclick=e=>{e.preventDefault();e.stopPropagation();toggle(id,disabled)}})}
function wireBottom(){document.querySelectorAll('.mobilebar button').forEach(b=>{if(!/^teachers$/i.test(clean(b.textContent)))return;if(b.dataset.finalTeacherWire)return;b.dataset.finalTeacherWire='1';b.onclick=e=>{e.preventDefault();e.stopImmediatePropagation();window.credenceOpenTeachers?.()}})}
function run(){wireBottom();patchHome();patchRows()}
run();document.addEventListener('click',e=>{const b=e.target.closest?.('button');if(b&&/teacher/i.test(clean(b.textContent)))setTimeout(run,40)},true);setInterval(run,800);
})();
