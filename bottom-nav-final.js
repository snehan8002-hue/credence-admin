(function(){
  'use strict';
  const delay=ms=>new Promise(r=>setTimeout(r,ms));
  async function callWhenReady(name){
    for(let i=0;i<20;i++){
      if(typeof window[name]==='function'){ try{return await window[name]()}catch(e){console.error('CREDENCE '+name,e);return} }
      await delay(150);
    }
  }
  function clickCustomize(){
    const buttons=[...document.querySelectorAll('button')].filter(b=>!b.closest('.mobilebar'));
    const target=buttons.find(b=>/^customize app$/i.test((b.textContent||'').replace(/\s+/g,' ').trim())) || buttons.find(b=>/^customize$/i.test((b.textContent||'').replace(/\s+/g,' ').trim()));
    if(target){target.click();return true}
    const v=[...document.querySelectorAll('.view')].find(x=>/customize/i.test(x.querySelector('h1,h2,h3')?.textContent||''));
    if(v){document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));v.classList.add('active');return true}
    return false;
  }
  function render(bar){
    const items=[
      ['🏠','Home',()=>{const v=document.querySelector('.view');if(v){document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));v.classList.add('active')}}],
      ['👨‍🎓','Students',()=>callWhenReady('credenceOpenStudents')],
      ['👩‍🏫','Teachers',()=>callWhenReady('credenceOpenTeachers')],
      ['📚','Classes',()=>callWhenReady('credenceOpenClasses')],
      ['📝','Tests',()=>callWhenReady('credenceOpenTests')],
      ['📄','Notes',()=>callWhenReady('credenceOpenNotes')],
      ['💳','Fees',()=>callWhenReady('credenceOpenFees')],
      ['⚙️','Customize',()=>{if(!clickCustomize())setTimeout(clickCustomize,400)}]
    ];
    bar.dataset.ceBottomFinal='1';
    bar.dataset.ceBottomOwner='final';
    bar.style.overflow='hidden';
    bar.style.justifyContent='space-around';
    bar.innerHTML=items.map(x=>'<button type="button" data-ce-nav-final="'+x[1]+'"><span style="font-size:17px;line-height:18px">'+x[0]+'</span><br><small style="font-size:8px;white-space:nowrap">'+x[1]+'</small></button>').join('');
    bar.querySelectorAll('[data-ce-nav-final]').forEach((b,i)=>b.onclick=e=>{e.preventDefault();e.stopPropagation();items[i][2]()});
  }
  function ensure(){const bar=document.querySelector('.mobilebar');if(!bar)return;if(bar.dataset.ceBottomOwner!=='final'||!bar.querySelector('[data-ce-nav-final="Teachers"]')||!bar.querySelector('[data-ce-nav-final="Customize"]'))render(bar)}
  ensure();
  new MutationObserver(ensure).observe(document.body,{childList:true,subtree:true});
})();
