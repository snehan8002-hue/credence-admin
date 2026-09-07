(function(){
'use strict';
function clean(v){return String(v||'').replace(/\s+/g,' ').trim()}
function visible(el){if(!el)return false;const s=getComputedStyle(el);return s.display!=='none'&&s.visibility!=='hidden'&&el.getBoundingClientRect().width>0&&el.getBoundingClientRect().height>0}
function teacherModal(){
 const all=[...document.querySelectorAll('.modal')];
 return all.find(m=>visible(m)&&/teacher name|create teacher|add teacher/i.test(clean(m.textContent)))
   || all.find(m=>/teacher name|create teacher|add teacher/i.test(clean(m.textContent))&&m.style.display!=='none');
}
function fieldLabel(f){return clean(f.querySelector('label')?.textContent)}
function patch(){
 const m=teacherModal(); if(!m)return;
 const grid=m.querySelector('.formgrid'); if(!grid)return;
 // Remove the old Classes/Class field from the Home Add Teacher modal.
 [...grid.querySelectorAll('.field')].forEach(f=>{
   const l=fieldLabel(f);
   if(/^classes?$/i.test(l)){f.remove();}
 });
 const fields=()=>[...grid.querySelectorAll('.field')];
 const has=rx=>fields().find(f=>rx.test(fieldLabel(f)));
 if(!has(/^phone$/i)){
   const f=document.createElement('div'); f.className='field';
   f.innerHTML='<label>Phone</label><input type="tel" autocomplete="tel" placeholder="Phone number">';
   grid.appendChild(f);
 }
 if(!has(/^email$/i)){
   const f=document.createElement('div'); f.className='field';
   f.innerHTML='<label>Email</label><input type="email" autocomplete="email" placeholder="teacher@example.com">';
   grid.appendChild(f);
 }
 // Run again in case another script recreates the old Classes field.
 [...grid.querySelectorAll('.field')].forEach(f=>{
   if(/^classes?$/i.test(fieldLabel(f)))f.remove();
 });
}
patch();
new MutationObserver(patch).observe(document.body,{childList:true,subtree:true,characterData:true});
})();
