(function(){
'use strict';
const STYLE='credence-reference-mobile-final-style';
function text(x){return (x?.textContent||'').replace(/\s+/g,' ').trim()}
function home(){const b=[...document.querySelectorAll('.mobilebar button')].find(x=>/^home$/i.test(text(x)));if(b)b.click();else{document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));document.getElementById('dashboard')?.classList.add('active')}}
function openSuperAdmin(){if(typeof window.credenceOpenSuperAdmins==='function')window.credenceOpenSuperAdmins()}
function addSuperAdmin(){const d=document.getElementById('dashboard'),bar=document.querySelector('.mobilebar');if(!d||!bar||!d.classList.contains('active'))return;let b=bar.querySelector('[data-ce-final-superadmin]');if(!b){b=document.createElement('button');b.type='button';b.setAttribute('data-ce-final-superadmin','1');b.innerHTML='<span class="ceFinalIcon">🛡️</span><small>Super Admin</small>';b.onclick=e=>{e.preventDefault();e.stopPropagation();openSuperAdmin()};bar.appendChild(b)}}
function addHeader(){const d=document.getElementById('dashboard'),top=d?.querySelector('.top');if(!top)return;let h=top.querySelector('.ceFinalHeader');if(!h){h=document.createElement('div');h.className='ceFinalHeader';h.innerHTML='<button class="ceFinalMenu" type="button" aria-label="Menu">☰</button><div class="ceFinalBrand"><div class="ceFinalLogo">🌿</div><div><b>CREDENCE</b><small>ADMIN PANEL</small></div></div><button class="ceFinalNotify" type="button" aria-label="Notifications">🔔</button><div class="ceFinalAdmin"><span class="ceFinalAvatar">●</span><span>Admin</span><span>⌄</span></div>';top.appendChild(h)}}
function install(){if(!document.getElementById(STYLE)){const s=document.createElement('style');s.id=STYLE;s.textContent=`
@media(max-width:650px){
html,body{width:100%!important;max-width:100%!important;overflow-x:hidden!important}
body{background:#f3f7f4!important}
.main{margin:0!important;width:100%!important;max-width:100%!important;padding:0 0 92px!important;overflow-x:hidden!important}
#dashboard{width:100%!important;max-width:100%!important;box-sizing:border-box!important;padding:0 14px 22px!important;overflow:hidden!important}
#dashboard .top{position:relative!important;width:calc(100% + 28px)!important;height:88px!important;min-height:88px!important;margin:0 -14px 16px!important;padding:0!important;background:linear-gradient(135deg,#005d35,#078b4c)!important;border:0!important;border-radius:0 0 18px 18px!important;overflow:hidden!important;box-shadow:0 7px 18px rgba(0,85,45,.18)!important}
#dashboard .top>h1,#dashboard .top>p,#dashboard .top>.admin{display:none!important}
.ceFinalHeader{position:absolute!important;inset:0!important;display:flex!important;align-items:center!important;padding:0 12px 0 14px!important;color:#fff!important;font-family:Inter,system-ui,sans-serif!important}
.ceFinalMenu{position:relative!important;flex:0 0 42px!important;width:42px!important;height:42px!important;border:0!important;background:transparent!important;color:#fff!important;font-size:29px!important;padding:0!important;line-height:1!important}
.ceFinalBrand{display:flex!important;align-items:center!important;gap:7px!important;min-width:0!important;margin-left:7px!important}
.ceFinalLogo{width:43px!important;height:43px!important;border-radius:11px!important;background:#0b9b55!important;display:grid!important;place-items:center!important;font-size:24px!important;box-shadow:inset 0 0 0 1px rgba(255,255,255,.2)!important}
.ceFinalBrand b{display:block!important;font-size:18px!important;line-height:19px!important;letter-spacing:.2px!important;color:#fff!important}
.ceFinalBrand small{display:block!important;font-size:8px!important;line-height:10px!important;letter-spacing:1px!important;font-weight:800!important;color:#d9f5e5!important}
.ceFinalNotify{margin-left:auto!important;width:36px!important;height:42px!important;border:0!important;background:transparent!important;color:#fff!important;font-size:23px!important;padding:0!important}
.ceFinalAdmin{display:flex!important;align-items:center!important;gap:5px!important;margin-left:7px!important;color:#fff!important;font-size:13px!important;font-weight:800!important;white-space:nowrap!important}
.ceFinalAvatar{width:34px!important;height:34px!important;border-radius:50%!important;background:#fff!important;color:#08783f!important;display:grid!important;place-items:center!important;font-size:15px!important}
#dashboard .cards{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important;width:100%!important}
#dashboard .card{min-width:0!important;border-radius:20px!important;padding:15px!important;border:1px solid #e1eae4!important;background:#fff!important;box-shadow:0 7px 20px rgba(10,70,40,.07)!important}
#dashboard .metric b{font-size:29px!important;line-height:1.05!important}
#dashboard .metric small{font-size:12px!important}
#dashboard .section{margin:22px 0 10px!important}
#dashboard .section h2{font-size:24px!important;line-height:1.1!important}
.mobilebar{position:fixed!important;left:8px!important;right:8px!important;bottom:8px!important;width:auto!important;height:78px!important;min-height:78px!important;box-sizing:border-box!important;display:grid!important;grid-template-columns:repeat(9,minmax(0,1fr))!important;grid-auto-flow:column!important;align-items:stretch!important;gap:0!important;padding:5px!important;background:rgba(255,255,255,.98)!important;border:3px solid #18b85b!important;border-radius:19px!important;box-shadow:0 8px 25px rgba(10,70,40,.18)!important;z-index:10000!important;overflow:hidden!important;overscroll-behavior:none!important}
.mobilebar button,.mobilebar button[data-ce-final-superadmin]{display:flex!important;min-width:0!important;width:100%!important;max-width:none!important;flex:1 1 0!important;box-sizing:border-box!important;border:0!important;background:transparent!important;border-radius:12px!important;padding:3px 0!important;margin:0!important;color:#41544c!important;font-family:Georgia,serif!important;font-size:7px!important;font-weight:700!important;line-height:1!important;white-space:normal!important;overflow:hidden!important;align-items:center!important;justify-content:center!important;flex-direction:column!important;gap:2px!important}
.mobilebar button span,.mobilebar button .ceFinalIcon{font-size:19px!important;line-height:21px!important;display:block!important}
.mobilebar button small{display:block!important;font-size:7px!important;line-height:8px!important;white-space:normal!important}
.mobilebar button.active{background:#08783f!important;color:#fff!important;font-weight:800!important}
.mobilebar button[data-ce-final-superadmin]{display:flex!important}
}
@media(min-width:651px){.ceFinalHeader{display:none!important}}
`;document.head.appendChild(s)}addHeader();addSuperAdmin()}
function patch(){install();addHeader();addSuperAdmin()}
patch();let n=0;const timer=setInterval(()=>{patch();if(++n>50)clearInterval(timer)},300);new MutationObserver(()=>patch()).observe(document.body,{childList:true,subtree:true});
})();