import { getDoc, doc } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js';
window.credenceFirebase = window.credenceFirebase || {};
window.credenceFirebase.getDoc = getDoc;
window.credenceFirebase.doc = doc;
await import('./credence-business-suite.js?v=20260908-business-4');
await import('./credence-business-suite-patch.js?v=20260908-business-4');
(function(){
 const install=()=>{
  const s=document.createElement('style');
  s.textContent='#credenceSuite{z-index:2147483000!important}#credenceSuite .cs-login{z-index:2147483001!important}.cs-loginform:before{content:"C";display:block;width:42px;height:42px;border-radius:13px;background:linear-gradient(135deg,#08783f,#18b765);color:#fff;text-align:center;line-height:42px;font-weight:900;font-size:21px;margin-bottom:13px;box-shadow:0 8px 20px #08783f24}';
  document.head.appendChild(s);
  const chooseAdmin=()=>{const b=document.querySelector('#credenceSuite .cs-role[data-role="admin"]');if(b)b.click()};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',chooseAdmin,{once:true});else chooseAdmin();
 };
 install();
})();
