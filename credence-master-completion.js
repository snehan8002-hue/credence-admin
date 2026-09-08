(()=>{
const F='https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js';
let fb;import(F).then(m=>fb=m).catch(console.error);
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const cfg={apiKey:'AIzaSyCka8C2otBgwXwT2Qtg5bZcPG3J_84Wgs8',authDomain:'credence-76953.firebaseapp.com',projectId:'credence-76953',storageBucket:'credence-76953.firebasestorage.app',messagingSenderId:'973979489973',appId:'1:973979489973:web:ac260b237071f7007050fc'};
const get=()=>window.__CB_STATE||window.S||{};
function addStyle(){let s=document.createElement('style');s.textContent='.cmc-image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.28}.cmc-slide-content{position:relative;z-index:1}.cmc-chip{font-size:10px;font-weight:900;padding:5px 8px;border-radius:99px;background:#e8f6ed;color:#08783f}.cmc-settings-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}@media(max-width:760px){.cmc-settings-grid{grid-template-columns:1fr}}';document.head.appendChild(s)}
function observe(){let last='';new MutationObserver(()=>{let nav=[...document.querySelectorAll('.cb-nav button,.cb-mobile-nav button')];if(!nav.length)return;let key=nav.map(x=>x.textContent.trim()).join('|');if(key===last)return;last=key;fixNav(nav)}).observe(document.body,{subtree:true,childList:true})}
function fixNav(nav){if(!get().user)return;let role=get().role;let want=role==='admin'?[['fees','₹','Fees'],['settings','⚙','Settings']]:role==='teacher'?[['settings','⚙','Settings']]:[['fees','₹','Fees'],['settings','⚙','Settings']];for(let [id,ic,n] of want){nav.filter(b=>b.textContent.trim()===n).forEach(b=>b.dataset.page=id);if(!nav.some(b=>b.textContent.trim()===n)){let host=nav.find(b=>b.parentElement.classList.contains('cb-mobile-nav'))?.parentElement||document.querySelector('.cb-mobile-nav');if(host){let b=document.createElement('button');b.dataset.page=id;b.innerHTML=`<i>${ic}</i>${n}`;b.onclick=()=>{let target=document.querySelector(`.cb-nav button[data-page="${id}"]`);if(target)target.click();else window.dispatchEvent(new CustomEvent('credence:navigate',{detail:id}))};host.appendChild(b)}}}}
function patchBanners(){let cards=[...document.querySelectorAll('.cb-hero-card,.hero,.banner')];cards.forEach(card=>{let txt=card.textContent; if(card.dataset.cmc==='1'||!txt)return;card.dataset.cmc='1'});}
function boot(){addStyle();observe();setInterval(patchBanners,1200)}
boot();
})();
