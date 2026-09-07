(function(){
'use strict';
/* CREDENCE stability guard: coalesce legacy DOM observers so opening a modal
   cannot trigger a mutation-observer feedback loop that locks the UI. */
const NativeMutationObserver=window.MutationObserver;
if(NativeMutationObserver && !window.__credenceStableMutationObserver){
  const StableMutationObserver=function(callback){
    let timer=0, cooling=false, latest=[];
    const run=()=>{
      timer=0;
      if(cooling)return;
      cooling=true;
      try{callback(latest,stable)}catch(e){setTimeout(()=>{throw e},0)}
      latest=[];
      setTimeout(()=>{cooling=false},120);
    };
    const wrapped=function(records,observer){
      if(records&&records.length)latest=records;
      if(!cooling&&!timer)timer=setTimeout(run,25);
    };
    const stable=new NativeMutationObserver(wrapped);
    return stable;
  };
  StableMutationObserver.prototype=NativeMutationObserver.prototype;
  window.MutationObserver=StableMutationObserver;
  window.__credenceStableMutationObserver=true;
}

/* Keep the final Teachers button bound to the real Teacher Management module,
   not the older local implementation from bottom-nav-final.js. */
function wireTeachers(){
  document.querySelectorAll('.mobilebar button').forEach(b=>{
    const t=(b.textContent||'').replace(/\s+/g,' ').trim();
    if(!/^👩?‍?🏫?\s*Teachers$/i.test(t) && !/teachers$/i.test(t))return;
    if(!window.credenceOpenTeachers)return;
    if(b.dataset.ceTeacherStable==='1')return;
    b.dataset.ceTeacherStable='1';
    b.onclick=function(e){e.preventDefault();e.stopPropagation();window.credenceOpenTeachers()};
  });
}
wireTeachers();
setInterval(wireTeachers,700);
})();
