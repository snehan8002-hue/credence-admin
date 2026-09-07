(function(){
'use strict';
const clean=s=>String(s||'').replace(/\s+/g,' ').trim();
function findHomeTeacherButton(){return [...document.querySelectorAll('button')].find(b=>!b.closest('.mobilebar') && /\+?\s*teacher/i.test(clean(b.textContent)));}
function fixTeacherForm(){
 [...document.querySelectorAll('label')].forEach(label=>{if(/^class$/i.test(clean(label.textContent))){const f=label.closest('.field')||label.parentElement;if(f)f.style.display='none';}});
 const visible=[...document.querySelectorAll('.field')].filter(f=>getComputedStyle(f).display!=='none');
 if(!visible.some(f=>/email/i.test(clean(f.querySelector('label')?.textContent))||f.querySelector('input[type="email"]'))){
  const grid=document.querySelector('.modal.show .formgrid')||document.querySelector('.modal .formgrid');
  if(grid){const f=document.createElement('div');f.className='field';f.innerHTML='<label>Email</label><input id="credenceTeacherEmailFix" type="email" placeholder="teacher@example.com">';grid.appendChild(f);}
 }
}
function wire(){
 document.querySelectorAll('.mobilebar button').forEach(b=>{
  if(!/^teachers$/i.test(clean(b.textContent)))return;
  b.onclick=function(e){e.preventDefault();e.stopImmediatePropagation();const home=findHomeTeacherButton();if(home){home.click();setTimeout(fixTeacherForm,100);setTimeout(fixTeacherForm,500);}else{alert('Teacher Management is not ready yet. Please try again.');}};
 });
 document.querySelectorAll('button').forEach(b=>{if(b.closest('.mobilebar')||b.dataset.teacherFormFixed)return;if(/\+?\s*teacher/i.test(clean(b.textContent))){b.dataset.teacherFormFixed='1';b.addEventListener('click',()=>{setTimeout(fixTeacherForm,100);setTimeout(fixTeacherForm,500);});}});
 fixTeacherForm();
}
wire();new MutationObserver(wire).observe(document.body,{childList:true,subtree:true});
})();
