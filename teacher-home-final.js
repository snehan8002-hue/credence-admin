(function(){
'use strict';
function clean(v){return String(v||'').replace(/\s+/g,' ').trim()}
function teacherModal(){return [...document.querySelectorAll('.modal.show,.modal[style*="display"]')].find(m=>/teacher name|create teacher|add teacher/i.test(clean(m.textContent)))}
function fieldLabel(f){return clean(f.querySelector('label')?.textContent)}
function patch(){
 const m=teacherModal(); if(!m)return;
 const grid=m.querySelector('.formgrid'); if(!grid)return;
 // Remove/hide every old Classes/Class field from the Home teacher form.
 [...grid.querySelectorAll('.field')].forEach(f=>{
   const l=fieldLabel(f);
   if(/^classes?$/i.test(l)||/class(es)?\s*$/i.test(l)){
     f.remove();
   }
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
 // Make the labels/fields clearly match the required teacher data.
 fields().forEach(f=>{if(/^classes?$/i.test(fieldLabel(f)))f.remove()});
}
patch();
new MutationObserver(patch).observe(document.body,{childList:true,subtree:true,characterData:true});
})();
