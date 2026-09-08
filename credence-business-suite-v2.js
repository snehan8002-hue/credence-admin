import { getDoc, doc } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js';
window.credenceFirebase = window.credenceFirebase || {};
window.credenceFirebase.getDoc = getDoc;
window.credenceFirebase.doc = doc;
await import('./credence-business-suite.js?v=20260908-business-1');
