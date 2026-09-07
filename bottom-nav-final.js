(function(){
  'use strict';
  function wire(){
    const bar=document.querySelector('.mobilebar');
    if(!bar || bar.dataset.ceBottomFinal==='1') return;
    const items=[
      ['🏠','Home',()=>{const v=document.querySelector('.view');if(v){document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));v.classList.add('active')}}],
      ['👨‍🎓','Students',()=>window.credenceOpenStudents?.()],
      ['👩‍🏫','Teachers',()=>window.credenceOpenTeachers?.()],
      ['📚','Classes',()=>window.credenceOpenClasses?.()],
      ['📝','Tests',()=>window.credenceOpenTests?.()],
      ['📄','Notes',()=>window.credenceOpenNotes?.()],
      ['💳','Fees',()=>window.credenceOpenFees?.()],
      ['⚙️','Customize',()=>{const b=[...document.querySelectorAll('button')].find(x=>/^customize app$/i.test((x.textContent||'').trim()))||[...document.querySelectorAll('button')].find(x=>/^customize$/i.test((x.textContent||'').trim()));if(b)b.click()}]
    ];
    bar.dataset.ceBottomFinal='1';
    bar.style.overflow='hidden';
    bar.style.justifyContent='space-around';
    bar.innerHTML=items.map(x=>'<button type="button" data-ce-nav-final="'+x[1]+'"><span style="font-size:17px;line-height:18px">'+x[0]+'</span><br><small style="font-size:8px;white-space:nowrap">'+x[1]+'</small></button>').join('');
    bar.querySelectorAll('[data-ce-nav-final]').forEach((b,i)=>{b.onclick=e=>{e.preventDefault();e.stopPropagation();items[i][2]()}});
  }
  wire();
  new MutationObserver(wire).observe(document.body,{childList:true,subtree:true});
})();
