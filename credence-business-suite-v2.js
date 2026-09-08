import { getDoc, doc } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js';
window.credenceFirebase = window.credenceFirebase || {};
window.credenceFirebase.getDoc = getDoc;
window.credenceFirebase.doc = doc;
await import('./credence-business-suite.js?v=20260908-business-5');
await import('./credence-business-suite-patch.js?v=20260908-business-5');

// CREDENCE login reliability bridge.
// The suite renders its login asynchronously, so select Super Admin after
// the actual role buttons exist rather than racing the first render.
(function(){
  const chooseAdmin = () => {
    const b = document.querySelector('#credenceSuite .cs-role[data-role="admin"]');
    if (!b) return false;
    if (!b.classList.contains('active')) b.click();
    try { localStorage.setItem('credenceRole','admin'); } catch(e) {}
    return true;
  };
  let tries = 0;
  const timer = setInterval(() => {
    tries++;
    if (chooseAdmin() || tries >= 40) clearInterval(timer);
  }, 100);
  chooseAdmin();
})();
