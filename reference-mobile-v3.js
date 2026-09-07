(function(){
'use strict';
const STYLE='credence-reference-mobile-v4-style';
function text(x){return (x?.textContent||'').replace(/\s+/g,' ').trim()}
function openSuperAdmin(){if(typeof window.credenceOpenSuperAdmins==='function')window.credenceOpenSuperAdmins()}
function addSuperAdmin(){const d=document.getElementById('dashboard'),bar=document.querySelector('.mobilebar');if(!d||!bar||!d.classList.contains('active'))return;let b=bar.querySelector('[data-ce-final-superadmin]');if(!b){b=document.createElement('button');b.type='button';b.setAttribute('data-ce-final-superadmin','1');b.innerHTML='<span class="ceFinalIcon">🛡️</span><small>Super Admin</small>';b.onclick=e=>{e.preventDefault();e.stopPropagation();openSuperAdmin()};bar.appendChild(b)}}
function addHeader(){const d=document.getElementById('dashboard'),top=d?.querySelector('.top');if(!top)return;let h=top.querySelector('.ceFinalHeader');if(!h){h=document.createElement('div');h.className='ceFinalHeader';h.innerHTML='<button class="ceFinalMenu" type="button" aria-label="Menu">☰</button><div class="ceFinalBrand"><div class="ceFinalLogo">🌿</div><div><b>CREDENCE</b><small>ADMIN PANEL</small></div></div><button class="ceFinalNotify" type="button" aria-label="Notifications">🔔</button><div class="ceFinalAdmin"><span class="ceFinalAvatar">●</span><span>Admin</span><span>⌄</span></div>';top.appendChild(h)}}
function install(){if(!document.getElementById(STYLE)){const s=document.createElement('style');s.id=STYLE;s.textContent=`
@media(max-width:650px){
html,body{width:100%!important;max-width:100%!important;overflow-x:hidden!important}
body{background:#f3f7f4!important}
.main{margin:0!important;width:100%!important;max-width:100%!important;padding:0 0 108px!important;overflow-x:hidden!important}
#dashboard{width:100%!important;max-width:100%!important;box-sizing:border-box!important;padding:0 14px 26px!important;overflow:hidden!important}
#dashboard .top{position:relative!important;width:calc(100% + 28px)!important;height:78px!important;min-height:78px!important;margin:0 -14px 15px!important;padding:0!important;background:linear-gradient(135deg,#005d35,#078b4c)!important;border:0!important;border-radius:0 0 16px 16px!important;overflow:hidden!important;box-shadow:0 6px 16px rgba(0,85,45,.16)!important}
#dashboard .top>h1,#dashboard .top>p,#dashboard .top>.admin{display:none!important}
.ceFinalHeader{position:absolute!important;inset:0!important;display:flex!important;align-items:center!important;padding:0 12px!important;color:#fff!important;font-family:Inter,system-ui,sans-serif!important}
.ceFinalMenu{flex:0 0 38px!important;width:38px!important;height:40px!important;border:0!important;background:transparent!important;color:#fff!important;font-size:27px!important;padding:0!important;line-height:1!important}
.ceFinalBrand{display:flex!important;align-items:center!important;gap:7px!important;min-width:0!important;margin-left:5px!important}
.ceFinalLogo{width:40px!important;height:40px!important;border-radius:10px!important;background:#0b9b55!important;display:grid!important;place-items:center!important;font-size:22px!important;box-shadow:inset 0 0 0 1px rgba(255,255,255,.2)!important}
.ceFinalBrand b{display:block!important;font-size:17px!important;line-height:18px!important;letter-spacing:.2px!important;color:#fff!important}
.ceFinalBrand small{display:block!important;font-size:7px!important;line-height:9px!important;letter-spacing:1px!important;font-weight:800!important;color:#d9f5e5!important}
.ceFinalNotify{margin-left:auto!important;width:34px!important;height:40px!important;border:0!important;background:transparent!important;color:#fff!important;font-size:21px!important;padding:0!important}
.ceFinalAdmin{display:flex!important;align-items:center!important;gap:4px!important;margin-left:5px!important;color:#fff!important;font-size:12px!important;font-weight:800!important;white-space:nowrap!important}
.ceFinalAvatar{width:31px!important;height:31px!important;border-radius:50%!important;background:#fff!important;color:#08783f!important;display:grid!important;place-items:center!important;font-size:13px!important}
#dashboard .cards{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important;width:100%!important;margin:0!important}
#dashboard .card{min-width:0!important;border-radius:18px!important;padding:14px!important;border:1px solid #e1eae4!important;background:#fff!important;box-shadow:0 6px 18px rgba(10,70,40,.07)!important}
#dashboard .metric .ico{font-size:22px!important;line-height:24px!important}
#dashboard .metric b{font-size:27px!important;line-height:1.05!important;margin-top:7px!important}
#dashboard .metric small{font-size:11px!important;line-height:14px!important}
#dashboard .section{margin:20px 0 9px!important}
#dashboard .section h2{font-size:23px!important;line-height:1.08!important;margin:0!important}
.mobilebar{position:fixed!important;left:8px!important;right:8px!important;bottom:8px!important;width:auto!important;height:76px!important;min-height:76px!important;max-height:76px!important;box-sizing:border-box!important;display:grid!important;grid-template-columns:repeat(9,minmax(0,1fr))!important;grid-auto-flow:column!important;align-items:stretch!important;gap:0!important;padding:4px!important;background:rgba(255,255,255,.99)!important;border:3px solid #18b85b!important;border-radius:20px!important;box-shadow:0 8px 25px rgba(10,70,40,.18)!important;z-index:2147483000!important;overflow:hidden!important;overscroll-behavior:none!important;touch-action:none!important}
.mobilebar button,.mobilebar button[data-ce-final-superadmin]{display:flex!important;min-width:0!important;width:100%!important;max-width:none!important;height:100%!important;flex:1 1 0!important;box-sizing:border-box!important;border:0!important;background:transparent!important;border-radius:12px!important;padding:2px 1px!important;margin:0!important;color:#41544c!important;font-family:Inter,system-ui,sans-serif!important;font-size:0!important;font-weight:700!important;line-height:1!important;white-space:normal!important;overflow:hidden!important;align-items:center!important;justify-content:center!important;flex-direction:column!important;gap:2px!important;text-align:center!important}
.mobilebar button span,.mobilebar button .ceFinalIcon{font-size:18px!important;line-height:20px!important;height:20px!important;display:block!important;flex:0 0 20px!important}
.mobilebar button small{display:block!important;font-size:7px!important;line-height:8px!important;height:auto!important;max-width:100%!important;white-space:normal!important;overflow:hidden!important;text-overflow:clip!important}
.mobilebar button.active{background:#08783f!important;color:#fff!important;font-weight:800!important}
.mobilebar button[data-ce-final-superadmin]{display:flex!important}
}
@media(min-width:651px){.ceFinalHeader{display:none!important}}
`;document.head.appendChild(s)}addHeader();addSuperAdmin()}
function patch(){install();addHeader();addSuperAdmin()}
patch();let n=0;const timer=setInterval(()=>{patch();if(++n>80)clearInterval(timer)},300);new MutationObserver(()=>patch()).observe(document.body,{childList:true,subtree:true});
})();