/* CREDENCE FINAL EXPERIENCE LOADER */
(function(){
  'use strict';
  const load=()=>{
    if(window.__credenceSuiteLoader)return;
    window.__credenceSuiteLoader=true;
    const s=document.createElement('script');
    s.type='module';
    s.src='credence-business-suite-v2.js?v=20260908-business-5';
    s.onload=()=>window.__credenceSuiteLoaded=true;
    s.onerror=()=>console.error('CREDENCE business suite failed to load');
    document.head.appendChild(s);
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',load,{once:true});else load();
})();
