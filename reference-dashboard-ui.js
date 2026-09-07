(function(){
'use strict';
const STYLE='credence-reference-dashboard-style-v1';
const HEADER='credenceReferenceHeader';
const DRAWER='credenceReferenceDrawer';
function t(el){return (el?.textContent||'').replace(/\s+/g,' ').trim()}
function addStyle(){
 if(document.getElementById(STYLE)) return;
 const s=document.createElement('style'); s.id=STYLE; s.textContent=`
@media(max-width:650px){
 body{background:#eef8f3!important;color:#143b2d!important;overflow-x:hidden!important}
 .main{padding:0 0 94px!important;margin:0!important;width:100%!important}
 #dashboard{padding:0 14px 20px!important}
 #dashboard .top{display:none!important}
 #${HEADER}{position:relative!important;margin:0 -14px 18px!important;height:160px!important;padding:58px 14px 18px!important;background:linear-gradient(135deg,#005c35 0%,#08783f 52%,#09934f 100%)!important;border-radius:0 0 20px 20px!important;box-shadow:0 8px 24px rgba(0,82,45,.20)!important;display:flex!important;align-items:flex-end!important;justify-content:space-between!important;color:#fff!important;z-index:40!important}
 #${HEADER} .ce-hamb{position:absolute!important;left:17px!important;top:74px!important;width:43px!important;height:43px!important;border:0!important;background:transparent!important;color:#fff!important;font-size:32px!important;line-height:1!important;padding:0!important}
 #${HEADER} .ce-brand{display:flex!important;align-items:center!important;gap:9px!important;margin-left:52px!important}
 #${HEADER} .ce-logo{width:52px!important;height:52px!important;border-radius:50%!important;object-fit:cover!important;background:#12a85c!important;border:1px solid rgba(255,255,255,.2)!important}
 #${HEADER} .ce-name{font:900 22px/1 Inter,system-ui,sans-serif!important;letter-spacing:.2px!important;color:#fff!important}
 #${HEADER} .ce-sub{font:800 10px/1.3 Inter,system-ui,sans-serif!important;letter-spacing:1px!important;color:#d8f4e3!important;margin-top:5px!important}
 #${HEADER} .ce-actions{display:flex!important;align-items:center!important;gap:9px!important;margin-bottom:3px!important}
 #${HEADER} .ce-notify{position:relative!important;width:42px!important;height:42px!important;border:0!important;background:transparent!important;color:#fff!important;font-size:25px!important;padding:0!important}
 #${HEADER} .ce-dot{position:absolute!important;right:4px!important;top:4px!important;width:9px!important;height:9px!important;border-radius:50%!important;background:#ef3340!important;border:2px solid #08783f!important}
 #${HEADER} .ce-admin{display:flex!important;align-items:center!important;gap:6px!important;color:#fff!important;font:800 13px/1 Inter,system-ui,sans-serif!important;white-space:nowrap!important}
 #${HEADER} .ce-avatar{width:42px!important;height:42px!important;border-radius:50%!important;border:2px solid #fff!important;background:#fff!important;color:#08783f!important;display:grid!important;place-items:center!important;font-size:22px!important}
 #${HEADER} .ce-chevron{font-size:15px!important}
 #dashboard .cards{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:18px 12px!important;margin:0!important}
 #dashboard .card{background:rgba(255,255,255,.97)!important;border:1px solid #dceae3!important;border-radius:22px!important;box-shadow:0 7px 24px rgba(13,74,48,.08)!important}
 #dashboard .metric{min-height:158px!important;padding:18px 18px 15px!important;display:flex!important;flex-direction:column!important;justify-content:flex-start!important}
 #dashboard .metric .ico{font-size:34px!important;line-height:1!important;margin-bottom:10px!important}
 #dashboard .metric b{font:700 31px/1.1 Georgia,serif!important;color:#0b4b36!important;margin:0 0 8px!important}
 #dashboard .metric small{font:600 15px/1.2 Inter,system-ui,sans-serif!important;color:#3f4d48!important}
 #dashboard .section{margin:30px 0 12px!important}
 #dashboard .section h2{font:800 25px/1.15 Georgia,serif!important;color:#0d3f2f!important;margin:0!important;letter-spacing:-.2px!important}
 #dashboard .section .btn.alt{border:2px solid #08783f!important;border-radius:17px!important;background:#fff!important;color:#08783f!important;padding:10px 18px!important;font:800 14px Inter,system-ui,sans-serif!important}
 #dashboard .row{padding:15px 0!important;border-bottom:1px solid #e1ebe6!important;gap:12px!important}
 #dashboard .row:last-child{border-bottom:0!important}
 #dashboard .row b{font:800 17px Georgia,serif!important;color:#123f31!important}
 #dashboard .row .muted{font:600 13px/1.35 Inter,system-ui,sans-serif!important;color:#687770!important}
 #dashboard .badge{background:#e3f6eb!important;color:#16834c!important;border-radius:99px!important;padding:8px 12px!important;font:800 11px Georgia,serif!important}
 #dashboard .section + .card{border-radius:22px!important;padding:14px 20px!important}
 #dashboard .section + .card .row{min-height:70px!important}
 #dashboard .section + .card .row > :first-child{font-size:28px!important}
 #dashboard .section + .card .row .grow{min-width:0!important}
 #dashboard .section + .card .row .grow b{font-size:17px!important}
 #dashboard .section + .card .row .grow .muted{font-size:13px!important}
 #dashboard .section + .card .row > :last-child{font:800 18px Georgia,serif!important;color:#0c4634!important;white-space:nowrap!important}
 .mobilebar{left:7px!important;right:7px!important;bottom:8px!important;height:70px!important;padding:5px 4px!important;display:flex!important;align-items:stretch!important;justify-content:space-around!important;background:#fff!important;border:2px solid #16b95a!important;border-radius:17px!important;box-shadow:0 8px 25px rgba(11,78,46,.15)!important;z-index:9500!important;overflow:hidden!important}
 .mobilebar button{flex:1 1 0!important;min-width:0!important;width:auto!important;height:58px!important;border:0!important;background:transparent!important;border-radius:12px!important;padding:3px 0!important;color:#23483a!important;font-family:Georgia,serif!important;font-size:10px!important;font-weight:800!important;line-height:1!important;white-space:nowrap!important;overflow:hidden!important}
 .mobilebar button.active{background:#08783f!important;color:#fff!important}
 .mobilebar button span{font-size:21px!important;line-height:23px!important}
 .mobilebar button small{font-size:9px!important;line-height:12px!important}
 .mobilebar button[data-ce-superadmin]{display:block!important}
 #${DRAWER}{position:fixed!important;left:0!important;top:0!important;bottom:0!important;width:min(285px,82vw)!important;background:#fff!important;z-index:10060!important;transform:translateX(-105%)!important;transition:transform .22s ease!important;box-shadow:8px 0 30px rgba(0,0,0,.18)!important;padding:22px 14px!important;overflow:auto!important}
 #${DRAWER}.open{transform:translateX(0)!important}
 #${DRAWER} .ce-close{width:42px!important;height:42px!important;border:0!important;background:#edf7f0!important;border-radius:12px!important;font-size:23px!important;color:#17352a!important}
 #${DRAWER} .ce-dtitle{font:900 20px Georgia,serif!important;color:#08783f!important;margin:18px 4px 10px!important}
 #${DRAWER} button{display:block!important;width:100%!important;border:0!important;background:#fff!important;text-align:left!important;border-radius:12px!important;padding:13px 12px!important;color:#52635b!important;font:800 14px Inter,system-ui,sans-serif!important}
 #${DRAWER} button:active{background:#e9f7ed!important;color:#08783f!important}
}
@media(min-width:651px){#${HEADER}{display:none!important}}
`;
 document.head.appendChild(s);
}
function buildHeader(){
 const d=document.getElementById('dashboard'); if(!d||!d.classList.contains('active')){document.getElementById(HEADER)?.remove();document.getElementById(DRAWER)?.remove();return}
 let h=document.getElementById(HEADER); if(!h){
  h=document.createElement('header');h.id=HEADER;
  const src=document.querySelector('.brand img')?.src||'';
  h.innerHTML='<button class="ce-hamb" type="button" aria-label="Open menu">☰</button><div class="ce-brand"><img class="ce-logo" src="'+src+'"><div><div class="ce-name">CREDENCE</div><div class="ce-sub">ADMIN PANEL</div></div></div><div class="ce-actions"><button class="ce-notify" type="button" aria-label="Notifications">♟<span class="ce-dot"></span></button><div class="ce-admin"><span class="ce-avatar">●</span><span>Admin</span><span class="ce-chevron">⌄</span></div></div>';
  d.prepend(h);
  h.querySelector('.ce-notify').textContent='🔔'; const dot=document.createElement('span');dot.className='ce-dot';h.querySelector('.ce-notify').appendChild(dot);
  h.querySelector('.ce-notify').onclick=()=>{typeof window.go==='function'?window.go('notifications'):null};
  h.querySelector('.ce-hamb').onclick=toggleDrawer;
 }
 buildDrawer();
}
function buildDrawer(){
 if(document.getElementById(DRAWER))return;
 const dr=document.createElement('aside');dr.id=DRAWER;dr.innerHTML='<button class="ce-close" type="button">✕</button><div class="ce-dtitle">CREDENCE Admin</div><div id="ceDrawerLinks"></div>';document.body.appendChild(dr);
 dr.querySelector('.ce-close').onclick=()=>dr.classList.remove('open');
 const links=[['🏠','Home','dashboard'],['👨‍🎓','Students',null],['👩‍🏫','Teachers',null],['📚','Classes',null],['📝','Tests',null],['📄','Notes',null],['💳','Fees',null],['⚙️','Customize',null],['🛡️','Super Admin',null]];
 const box=dr.querySelector('#ceDrawerLinks');links.forEach(([ic,label,id])=>{const b=document.createElement('button');b.innerHTML=ic+' &nbsp; '+label;b.onclick=()=>{dr.classList.remove('open');if(id&&typeof window.go==='function')window.go(id);else{const map={Students:'credenceOpenStudents',Teachers:'credenceOpenTeachers',Classes:'credenceOpenClasses',Tests:'credenceOpenTests',Notes:'credenceOpenNotes',Fees:'credenceOpenFees'};if(label==='Customize'&&typeof window.openCustomize==='function')window.openCustomize();else if(label==='Super Admin'&&typeof window.credenceOpenSuperAdmins==='function')window.credenceOpenSuperAdmins();else if(typeof window[map[label]]==='function')window[map[label]]()}};box.appendChild(b)});
}
function toggleDrawer(){document.getElementById(DRAWER)?.classList.toggle('open')}
function patch(){addStyle();buildHeader()}
function start(){patch();let n=0;const timer=setInterval(()=>{patch();if(++n>60)clearInterval(timer)},300);new MutationObserver(()=>patch()).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['class']})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
