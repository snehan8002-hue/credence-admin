(function(){
  const wait=()=>new Promise(resolve=>{const t=setInterval(()=>{if(window.credenceOpenStudents){clearInterval(t);resolve(true)}},50);setTimeout(()=>{clearInterval(t);resolve(false)},12000)});
  wait().then(ok=>{
    if(!ok)return;
    const nav=()=>document.querySelectorAll('.mobilebar button').forEach(b=>{
      const text=(b.textContent||'').replace(/\s+/g,' ').trim();
      if(/^👨‍🎓\s*Students$/i.test(text)||/^Students$/i.test(text)){
        b.onclick=e=>{e.preventDefault();e.stopPropagation();window.credenceOpenStudents()};
      }
    });
    nav();
    new MutationObserver(nav).observe(document.body,{childList:true,subtree:true});
  });
})();
