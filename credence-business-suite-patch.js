import { collection, getDocs, addDoc, updateDoc, doc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js';
(function(){
'use strict';
const F=()=>window.credenceFirebase||{}; const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function toast(m){window.__csToast?window.__csToast(m):alert(m)}
async function rows(type){const fb=F();const snap=await getDocs(collection(fb.db,type));return snap.docs.map(d=>({id:d.id,...d.data()}))}
function modal(title,fields,onSave){let old=$('#csWorkModal');old?.remove();const box=document.createElement('div');box.id='csWorkModal';box.className='cs-modal';box.innerHTML=`<div class="cs-modalbox"><div class="cs-modalhead"><h3>${title}</h3><button class="cs-x" id="csClose">×</button></div><div class="cs-formgrid">${fields.map(f=>`<div class="${f.full?'full':''}"><label>${f.label}</label>${f.type==='textarea'?`<textarea id="${f.id}" placeholder="${f.ph||''}"></textarea>`:`<input id="${f.id}" type="${f.type||'text'}" placeholder="${f.ph||''}" value="${esc(f.value||'')}">`}</div>`).join('')}</div><div class="cs-modalactions"><button class="cs-btn alt" id="csCancel">Cancel</button><button class="cs-btn" id="csSave">Save & publish</button></div></div>`;document.body.appendChild(box);$('#csClose').onclick=()=>box.remove();$('#csCancel').onclick=()=>box.remove();$('#csSave').onclick=async()=>{const data={};fields.forEach(f=>data[f.key||f.id]=$('#'+f.id)?.value?.trim()||'');await onSave(data);box.remove()}}
async function write(type,data){const fb=F();await addDoc(collection(fb.db,type),{...data,createdAt:serverTimestamp(),updatedAt:serverTimestamp(),createdBy:fb.auth?.currentUser?.uid||''});toast('Published successfully.')}
window.__csCreate=async id=>{
 if(id==='notes')return modal('Create study note',[{id:'title',label:'Title'},{id:'subject',label:'Subject'},{id:'className',label:'Class'},{id:'content',label:'Note content',type:'textarea',full:true}],d=>write('notes',{title:d.title,subject:d.subject,className:d.className,content:d.content,visibility:'Published'}));
 if(id==='video')return modal('Publish lesson video',[{id:'title',label:'Video title'},{id:'subject',label:'Subject'},{id:'url',label:'Video URL'},{id:'duration',label:'Duration'}],d=>write('videos',{title:d.title,subject:d.subject,url:d.url,duration:d.duration,status:'Published'}));
 if(id==='announce')return modal('Send announcement',[{id:'title',label:'Announcement title'},{id:'target',label:'Audience'},{id:'message',label:'Message',type:'textarea',full:true}],d=>write('notifications',{title:d.title,target:d.target,message:d.message,status:'Published'}));
 if(id==='class')return modal('Schedule live class',[{id:'subject',label:'Subject'},{id:'className',label:'Class'},{id:'teacher',label:'Teacher name'},{id:'startAt',label:'Start time',type:'datetime-local'},{id:'meet',label:'Live class link'}],d=>write('classes',{subject:d.subject,className:d.className,teacher:d.teacher,startAt:d.startAt,meet:d.meet,status:'Scheduled'}));
 toast('Workspace action ready.');
};
window.__csAction=async id=>{if(id==='video'||id==='announce'||id==='class'){return window.__csCreate(id)}if(['notes','tests','classes','fees','people','customize'].includes(id)){window.currentView=id;document.querySelectorAll('[data-nav]').forEach(b=>b.classList.toggle('active',b.dataset.nav===id));if(typeof window.__csUpdatePage==='function')window.__csUpdatePage();else location.hash=id}else toast('Workspace action ready.')};
window.__csSaveCustomize=()=>{const color=$('#cPrimary')?.value||'#08783f',name=$('#cAcademy')?.value||'CREDENCE',sub=$('#cSubtitle')?.value||'CREDENCE management control center';localStorage.setItem('credenceCustomize',JSON.stringify({color,name,sub}));document.documentElement.style.setProperty('--credence-primary',color);toast('Customization saved. It will remain on this device.');};
window.__csToast=toast;
})();
