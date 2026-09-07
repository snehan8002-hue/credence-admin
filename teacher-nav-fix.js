(function(){
'use strict';
const PRIMARY_UID='aBYdbFwbsTUbpmYtoNurxyu3Roj2';
const clean=s=>String(s||'').replace(/\s+/g,' ').trim();
let fsPromise;
const fs=()=>fsPromise||(fsPromise=import('https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js'));
const fb=()=>window.credenceFirebase;
const toast=m=>{let t=document.getElementById('teacherFixToast');if(!t){t=document.createElement('div');t.id='teacherFixToast';t.style='position:fixed;right:18px;bottom:82px;background:#17352a;color:#fff;padding:12px 15px;border-radius:10px;z-index:99999;font-weight:700';document.body.appendChild(t)}t.textContent=m;t.style.display='block';clearTimeout(t._x);t._x=setTimeout(()=>t.style.display='none',2800)};
async function isSuper(){const f=fb(),u=f?.auth?.currentUser;if(!f||!u)return false;if(u.uid===PRIMARY_UID)return true;try{const x=await fs(),s=await x.getDoc(x.doc(f.db,'superAdmins',u.uid));return s.exists()&&s.data().active===true}catch(e){return false}}
function findTeacherModal(){return [...document.querySelectorAll('.modal.show')].find(m=>/add teacher/i.test(clean(m.textContent))||/teacher name/i.test(clean(m.textContent)))}
function fieldByLabel(modal,rx){return [...modal.querySelectorAll('.field')].find(f=>rx.test(clean(f.querySelector('label')?.textContent)))}
function inputFor(modal,rx){return fieldByLabel(modal,rx)?.querySelector('input,textarea,select')||null}
function ensureTeacherForm(){
 const modal=findTeacherModal();if(!modal)return;
 [...modal.querySelectorAll('.field')].forEach(f=>{if(/^classes?$/i.test(clean(f.querySelector('label')?.textContent))){f.style.display='none';f.dataset.teacherHidden='1'}});
 const grid=modal.querySelector('.formgrid');if(!grid)return;
 let phone=fieldByLabel(modal,/^phone$/i);
 if(!phone){phone=document.createElement('div');phone.className='field';phone.innerHTML='<label>Phone</label><input type="tel" id="teacherFixPhone" placeholder="Phone number">';grid.appendChild(phone)}
 let email=fieldByLabel(modal,/^email$/i);
 if(!email){email=document.createElement('div');email.className='field';email.innerHTML='<label>Email</label><input type="email" id="teacherFixEmail" placeholder="teacher@example.com">';grid.appendChild(email)}
 const save=[...modal.querySelectorAll('button')].find(b=>/create teacher|add teacher/i.test(clean(b.textContent)));
 if(save&&!save.dataset.teacherSaveFixed){
  const fresh=save.cloneNode(true);save.replaceWith(fresh);fresh.dataset.teacherSaveFixed='1';fresh.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();saveHomeTeacher(modal,fresh)},true);fresh.onclick=e=>{e.preventDefault();e.stopImmediatePropagation();saveHomeTeacher(modal,fresh)};
 }
}
function getTeacherValues(modal){
 const inputs=[...modal.querySelectorAll('.field')].filter(f=>getComputedStyle(f).display!=='none').map(f=>({label:clean(f.querySelector('label')?.textContent),input:f.querySelector('input,textarea,select')})).filter(x=>x.input);
 const by=(rx)=>inputs.find(x=>rx.test(x.label))?.input;
 return {name:by(/teacher name|full name|name/i),subject:by(/^subject$/i),phone:by(/^phone$/i),email:by(/^email$/i)};
}
async function saveHomeTeacher(modal,btn){
 const v=getTeacherValues(modal),name=v.name?.value.trim()||'',subject=v.subject?.value.trim()||'',phone=v.phone?.value.trim()||'',email=v.email?.value.trim().toLowerCase()||'';
 let msg=[...modal.querySelectorAll('.muted,[id*=msg],[id*=error]')].find(x=>/could not|error|teacher/i.test(clean(x.textContent)))||null;
 if(!msg){msg=document.createElement('div');msg.className='muted';btn.parentElement?.appendChild(msg)}
 if(!name||!subject||!phone||!email){msg.textContent='Please fill Teacher Name, Subject, Phone and Email.';return}
 if(!(await isSuper())){msg.textContent='Super Admin permission required.';return}
 btn.disabled=true;msg.textContent='Adding teacher...';
 try{const x=await fs(),f=fb();await x.addDoc(x.collection(f.db,'teachers'),{name,subject,phone,email,active:true,createdAt:x.serverTimestamp(),updatedAt:x.serverTimestamp(),createdBy:f.auth.currentUser.uid});msg.textContent='Teacher added successfully.';[v.name,v.subject,v.phone,v.email].forEach(i=>{if(i)i.value=''});setTimeout(()=>{try{modal.classList.remove('show')}catch(e){} window.credenceOpenTeachers?.()},500)}catch(e){msg.textContent=e.code?e.code+': '+e.message:e.message}finally{btn.disabled=false}
}
async function toggleTeacher(id,next){if(!(await isSuper()))return toast('Super Admin permission required.');try{const x=await fs(),f=fb();await x.updateDoc(x.doc(f.db,'teachers',id),{active:!!next,updatedAt:x.serverTimestamp(),updatedBy:f.auth.currentUser.uid});toast(next?'Teacher enabled.':'Teacher disabled.');window.credenceOpenTeachers?.()}catch(e){toast('Could not update teacher: '+(e.message||e))}}
function patchTeacherRows(){const body=document.getElementById('ceTeacherRows');if(!body)return;body.querySelectorAll('tr').forEach(r=>{const rm=r.querySelector('[data-remove-teacher]');if(!rm)return;const id=rm.dataset.removeTeacher;if(!id)return;let b=r.querySelector('[data-teacher-status-action]');const disabled=!!r.querySelector('.badge.cancel');if(!b){b=document.createElement('button');b.type='button';b.dataset.teacherStatusAction='1';b.className='btn '+(disabled?'alt':'danger');rm.parentElement.insertBefore(b,rm);}
b.textContent=disabled?'Enable':'Disable';b.className='btn '+(disabled?'alt':'danger');b.onclick=e=>{e.preventDefault();e.stopPropagation();toggleTeacher(id,disabled)};
});}
function findHomeTeacherButton(){return [...document.querySelectorAll('button')].find(b=>!b.closest('.mobilebar')&&/\+?\s*teacher/i.test(clean(b.textContent)))}
function wireBottomTeachers(){document.querySelectorAll('.mobilebar button').forEach(b=>{if(!/^teachers$/i.test(clean(b.textContent)))return;if(b.dataset.teacherBottomFixed)return;b.dataset.teacherBottomFixed='1';b.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();const home=findHomeTeacherButton();if(home){home.click();setTimeout(ensureTeacherForm,80);setTimeout(ensureTeacherForm,400)}else{window.credenceOpenTeachers?.()}},true)})}
function wire(){wireBottomTeachers();ensureTeacherForm();patchTeacherRows()}
wire();new MutationObserver(wire).observe(document.body,{childList:true,subtree:true,characterData:true});
})();
