(function(){
'use strict';
const clean=s=>String(s||'').replace(/\s+/g,' ').trim();
function findHomeTeacherButton(){
  return [...document.querySelectorAll('button')].find(b=>!b.closest('.mobilebar') && /\+?\s*teacher/i.test(clean(b.textContent)));
}
function fixTeacherForm(){
  // The existing Home > + Teacher form is the source of truth.
  // Remove the Class field and make sure Email is present, without replacing the working form.
  const labels=[...document.querySelectorAll('label')];
  labels.forEach(label=>{
    if(/^class$/i.test(clean(label.textContent))){
      const field=label.closest('.field') || label.parentElement;
      if(field) field.style.display='none';
    }
  });
  const visibleFields=[...document.querySelectorAll('.field')].filter(f=>getComputedStyle(f).display!=='none');
  const hasEmail=visibleFields.some(f=>/email/i.test(clean(f.querySelector('label')?.textContent)) || f.querySelector('input[type="email"]'));
  if(!hasEmail){
    const grid=document.querySelector('.modal.show .formgrid') || document.querySelector('.modal .formgrid');
    if(grid){
      const field=document.createElement('div');
      field.className='field';
      field.innerHTML='<label>Email</label><input id="credenceTeacherEmailFix" type="email" placeholder="teacher@example.com">';
      grid.appendChild(field);
    }
  }
}
function wire(){
  document.querySelectorAll('.mobilebar button').forEach(b=>{
    if(!/^teachers$/i.test(clean(b.textContent)) || b.dataset.teacherNavFixed)return;
    b.dataset.teacherNavFixed='1';
    b.onclick=function(e){
      e.preventDefault();e.stopImmediatePropagation();
      const home=findHomeTeacherButton();
      if(home){home.click();setTimeout(fixTeacherForm,100);setTimeout(fixTeacherForm,500)}
      else { alert('Teacher Management is not ready yet. Please try again.'); }
    };
  });
  document.querySelectorAll('button').forEach(b=>{
    if(b.closest('.mobilebar')||b.dataset.teacherFormFixed)return;
    if(/\+?\s*teacher/i.test(clean(b.textContent))){
      b.dataset.teacherFormFixed='1';
      b.addEventListener('click',()=>{setTimeout(fixTeacherForm,100);setTimeout(fixTeacherForm,500)});
    }
  });
  fixTeacherForm();
}
wire();
new MutationObserver(wire).observe(document.body,{childList:true,subtree:true});
})();
