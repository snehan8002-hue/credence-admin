(function(){
  'use strict';
  const norm=v=>String(v||'').replace(/\s+/g,' ').trim().toLowerCase();
  function wire(){
    const bar=document.querySelector('.mobilebar');
    if(!bar) return;
    const wanted=[
      ['🏠','Home',()=>{const v=document.querySelector('.view');if(v){document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));v.classList.add('active')}}],
      ['👨‍🎓','Students',()=>window.credenceOpenStudents?.()],
      ['👩‍🏫','Teachers',()=>window.credenceOpenTeachers?.()],
      ['📚','Classes',()=>window.credenceOpenClasses?.()],
      ['📝','Tests',()=>window.credenceOpenTests?.()],
      ['📄','Notes',()=>window.credenceOpenNotes?.()],
      ['💳','Fees',()=>window.credenceOpenFees?.()],
      ['⚙️','Customize',()=>{const b=[...document.querySelectorAll('button')].find(x=>/^customize app$/i.test((x.textContent||'').trim()))||[...document.querySelectorAll('button')].find(x=>/^customize$/i.test((x.textContent||'').trim()));if(b)b.click()}]
    ];
    if(bar.dataset.ceBottomFinal==='1') return;
    bar.dataset.ceBottomFinal='1';
    bar.style.overflowX='auto';
    bar.style.justifyContent='flex-start';
    bar.innerHTML=wanted.map(x=>'<button type="button" data-ce-nav-final="'+x[1]+'" style="min-width:72px;flex:0 0 72px"><span>'+x[0]+'</span><br>'+x[1]+'</button>').join('');
    bar.querySelectorAll('[data-ce-nav-final]').forEach((b,i)=>{b.onclick=e=>{e.preventDefault();e.stopPropagation();wanted[i][2]()}});
  }
  wire();
  new MutationObserver(wire).observe(document.body,{childList:true,subtree:true});
})();
