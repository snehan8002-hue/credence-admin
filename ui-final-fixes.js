(function(){
  'use strict';

  const norm = v => String(v || '').replace(/\s+/g,' ').trim().toLowerCase();

  function findButton(label){
    return [...document.querySelectorAll('button')].find(b => norm(b.textContent) === norm(label));
  }

  function openCustomize(){
    const candidates = [
      findButton('Customize App'),
      findButton('Customize')
    ].filter(Boolean);

    const target = candidates[0];
    if(target){
      target.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));
      return true;
    }

    const customizeView = [...document.querySelectorAll('.view')].find(v => {
      const text = norm(v.querySelector('h1,h2,h3')?.textContent || v.textContent);
      return text.includes('customize');
    });
    if(customizeView){
      document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
      customizeView.classList.add('active');
      return true;
    }
    return false;
  }

  function wire(){
    document.querySelectorAll('.mobilebar button').forEach(btn=>{
      if(btn.dataset.ceUiFinal === '1') return;
      const text = norm(btn.textContent);
      if(text.includes('customize')){
        btn.dataset.ceUiFinal = '1';
        btn.type = 'button';
        btn.style.cursor = 'pointer';
        btn.onclick = function(e){
          e.preventDefault();
          e.stopPropagation();
          if(!openCustomize()) console.warn('CREDENCE: Customize target not found yet.');
        };
      }
    });
  }

  wire();
  new MutationObserver(wire).observe(document.body,{childList:true,subtree:true});
})();
