(function(){
'use strict';
const PRIMARY='aBYdbFwbsTUbpmYtoNurxyu3Roj2';
let fsP;
const fs=()=>fsP||(fsP=import('https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js'));
const F=()=>window.credenceFirebase;
const txt=e=>String(e?.textContent||'').replace(/\s+/g,' ').trim();
const vis=e=>{if(!e)return false;const s=getComputedStyle(e);return s.display!=='none'&&s.visibility!=='hidden'&&e.getBoundingClientRect().width>0};
async function superOK(){const f=F(),u=f?.auth?.currentUser;if(!f||!u)return false;if(u.uid===PRIMARY)return true;try{const x=await fs(),s=await x.getDoc(x.doc(f.db,'superAdmins',u.uid));return s.exists()&&s.data().active===true}catch(e){return false}}
function homeModal(){return [...document.querySelectorAll('.modal')].find(m=>vis(m)&&/create teacher|teacher name|add teacher/i.test(txt(m)))}
function labelField(mod,rx){return [...mod.querySelectorAll('.field')].find(f=>rx.test(txt(f.querySelector('label'))))}
function makeField(label,type,placeholder){const f=document.createElement('div');f.className='field';f.innerHTML='<label>'+label+'</label><input type="'+type+'" placeholder="'+placeholder+'">';return f}
function patchHome(){const m=homeModal();if(!m)return;
 [...m.querySelectorAll('.field')].forEach(f=>{if(/^classes?$/i.test(txt(f.querySelector('label'))))f.remove()});
 let grid=m.querySelector('.formgrid');
 if(!grid){const first=m.querySelector('input')?.closest('div');const box=m.querySelector('.modalbox')||m;const btn=[...box.querySelectorAll('button')].find(b=>/create teacher|add teacher/i.test(txt(b)));grid=first?.parentElement||box;if(btn&&grid!==box){grid=btn.parentElement||box}}
 if(!grid)return;
 if(!labelField(m,/^phone$/i))grid.insertBefore(makeField('Phone','tel','Phone number'),[...grid.children].find(x=>x.querySelector?.('button'))||null);
 if(!labelField(m,/^email$/i))grid.insertBefore(makeField('Email','email','teacher@example.com'),[...grid.children].find(x=>x.querySelector?.('button'))||null);
 [...m.querySelectorAll('.field')].forEach(f=>{if(/^classes?$/i.test(txt(f.querySelector('label'))))f.remove()});
 const btn=[...m.querySelectorAll('button')].find(b=>/create teacher|add teacher/i.test(txt(b)));
 if(btn&&!btn.dataset.finalTeacherSave){btn.dataset.finalTeacherSave='1';const b=btn.cloneNode(true);btn.replaceWith(b);b.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();saveHome(m,b)},true)}
}
function getInput(m,rx){const f=labelField(m,rx);return f?.querySelector('input,textarea,select')||null}
async function saveHome(m,b){const name=(getInput(m,/teacher name|^name$/i)?.value||'').trim();const subject=(getInput(m,/^subject$/i)?.value||'').trim();const phone=(getInput(m,/^phone$/i)?.value||'').trim();const email=(getInput(m,/^email$/i)?.value||'').trim().toLowerCase();if(!name||!subject||!phone||!email)return alert('Please fill Teacher Name, Subject, Phone and Email.');if(!(await superOK()))return alert('Super Admin permission required.');try{const x=await fs(),f=F();await x.addDoc(x.collection(f.db,'teachers'),{name,subject,phone,email,active:true,createdAt:x.serverTimestamp(),updatedAt:x.serverTimestamp(),createdBy:f.auth.currentUser.uid});alert('Teacher added successfully.');[name,subject,phone,email].forEach(()=>{});[getInput(m,/teacher name|^name$/i),getInput(m,/^subject$/i),getInput(m,/^phone$/i),getInput(m,/^email$/i)].forEach(i=>{if(i)i.value=''});m.classList.remove('show');m.style.display='none';window.credenceOpenTeachers?.()}catch(e){alert('Could not add teacher: '+(e.code||'')+' '+(e.message||e))}}
async function teacherDocs(){const x=await fs(),f=F(),s=await x.getDocs(x.collection(f.db,'teachers'));const a=[];s.forEach(d=>a.push({id:d.id,...d.data()}));return a}
async function patchTeacherManagement(){const root=document.getElementById('ceTeacherView');if(!root)return;let docs;try{docs=await teacherDocs()}catch(e){return}
 const removes=[...root.querySelectorAll('button')].filter(b=>/^remove$/i.test(txt(b)));
 for(const rm of removes){if(rm.dataset.finalStatus)return;let container=rm.parentElement;const card=rm.closest('tr')||rm.closest('.row')||rm.closest('.card')||container;const text=txt(card);let t=docs.find(d=>d.email&&text.toLowerCase().includes(String(d.email).toLowerCase()))||docs.find(d=>d.name&&text.toLowerCase().includes(String(d.name).toLowerCase()));if(!t)continue;const status=document.createElement('button');status.type='button';status.className='btn '+(t.active===false?'alt':'danger');status.textContent=t.active===false?'Enable':'Disable';status.dataset.finalStatus='1';status.style.marginLeft='6px';status.onclick=async e=>{e.preventDefault();e.stopPropagation();if(!(await superOK()))return alert('Super Admin permission required.');try{const x=await fs(),f=F();await x.updateDoc(x.doc(f.db,'teachers',t.id),{active:t.active===false,updatedAt:x.serverTimestamp(),updatedBy:f.auth.currentUser.uid});window.credenceOpenTeachers?.()}catch(err){alert('Could not update teacher: '+(err.message||err))}};container.appendChild(status);rm.dataset.finalStatus='1'}
}
function run(){patchHome();patchTeacherManagement()}
run();new MutationObserver(run).observe(document.body,{childList:true,subtree:true,characterData:true});
})();
