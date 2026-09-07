(function(){
  'use strict';
  function text(b){return (b?.textContent||'').replace(/\s+/g,' ').trim().toLowerCase()}
  function findOutside(label){return [...document.querySelectorAll('button')].find(b=>!b.closest('.mobilebar')&&text(b)===label)}
  function teachers(){
    if(typeof window.credenceOpenTeachers==='function'){window.credenceOpenTeachers();return}
    const b=findOutside('teachers'); if(b)b.click();
  }
  function customize(){
    const b=findOutside('customize app')||findOutside('customize');
    if(b){b.click();return}
    if(typeof window.openCustomize==='function'){window.openCustomize();return}
    const v=[...document.querySelectorAll('.view')].find(x=>/customize/i.test(x.querySelector('h1,h2,h3')?.textContent||''));
    if(v){document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));v.classList.add('active')}
  }
  function run(name,fn){try{fn()}catch(e){console.error('CREDENCE '+name+' navigation error',e)}}
  function render(bar){
    const items=[
      ['🏠','Home',()=>{const v=document.querySelector('.view');if(v){document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));v.classList.add('active')}}],
      ['👨‍🎓','Students',()=>window.credenceOpenStudents?.()],
      ['👩‍🏫','Teachers',teachers],
      ['📚','Classes',()=>window.credenceOpenClasses?.()],
      ['📝','Tests',()=>window.credenceOpenTests?.()],
      ['📄','Notes',()=>window.credenceOpenNotes?.()],
      ['💳','Fees',()=>window.credenceOpenFees?.()],
      ['⚙️','Customize',customize]
    ];
    bar.dataset.ceBottomFinal='1';bar.dataset.ceBottomOwner='final';
    bar.style.overflow='hidden';bar.style.justifyContent='space-around';
    bar.innerHTML=items.map(x=>'<button type="button" data-ce-nav-final="'+x[1]+'"><span style="font-size:17px;line-height:18px">'+x[0]+'</span><br><small style="font-size:8px;white-space:nowrap">'+x[1]+'</small></button>').join('');
    bar.querySelectorAll('[data-ce-nav-final]').forEach((b,i)=>b.onclick=e=>{e.preventDefault();e.stopPropagation();run(items[i][1],items[i][2])});
  }
  function ensure(){const bar=document.querySelector('.mobilebar');if(!bar)return;if(bar.dataset.ceBottomOwner!=='final'||!bar.querySelector('[data-ce-nav-final="Teachers"]')||!bar.querySelector('[data-ce-nav-final="Customize"]'))render(bar)}
  ensure();new MutationObserver(ensure).observe(document.body,{childList:true,subtree:true});
})();
