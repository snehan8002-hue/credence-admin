/* CREDENCE — BUSINESS CLASS INTERIOR V2
   Visual-only layer. Does not replace any feature handlers or data mechanisms. */
(function(){
'use strict';
const STYLE='credence-business-class-v2';
const NAV='.mobilebar';
function install(){
  if(document.getElementById(STYLE))return;
  const s=document.createElement('style');s.id=STYLE;
  s.textContent=`
  @media(max-width:650px){
    html,body{overflow-x:hidden!important}
    #appShell{width:100%!important;overflow-x:hidden!important}
    #appShell .main{padding:0 0 118px!important;margin:0!important;width:100%!important;max-width:100%!important}
    #dashboard{width:100%!important;max-width:100%!important;padding:0 16px 130px!important;box-sizing:border-box!important;background:linear-gradient(180deg,#f7faf8 0%,#f0f6f3 100%)!important;overflow:visible!important}

    /* Clean business-class dashboard heading: generous safe spacing, no text touching edges. */
    #dashboard .top{display:flex!important;align-items:flex-start!important;justify-content:space-between!important;position:relative!important;width:100%!important;height:auto!important;min-height:106px!important;margin:0 0 18px!important;padding:24px 2px 16px!important;box-sizing:border-box!important;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;overflow:visible!important;color:#17352a!important}
    #dashboard .top:before,#dashboard .top:after{display:none!important;content:none!important}
    #dashboard .top>.ceFinalHeader{display:none!important}
    #dashboard .top>h1{display:block!important;margin:0!important;padding:0!important;font-family:Georgia,'Times New Roman',serif!important;font-size:30px!important;line-height:1.05!important;letter-spacing:-.7px!important;color:#17352a!important}
    #dashboard .top>p{display:block!important;margin:7px 0 0!important;padding:0!important;max-width:190px!important;font-family:Georgia,'Times New Roman',serif!important;font-size:16px!important;line-height:1.25!important;color:#718078!important}
    #dashboard .top>.admin{display:flex!important;align-items:center!important;gap:9px!important;margin:0!important;padding:0!important;color:#17352a!important;font-family:Inter,system-ui,sans-serif!important;font-size:14px!important;font-weight:800!important;text-align:right!important;white-space:nowrap!important}
    #dashboard .top>.admin .avatar{width:46px!important;height:46px!important;flex:0 0 46px!important;border-radius:50%!important;background:#dff4e5!important;border:0!important;color:#08783f!important;display:grid!important;place-items:center!important}
    #dashboard .top>.admin:after{content:'⌄'!important;color:#718078!important;font-size:16px!important;margin-left:-3px!important}

    /* Metric cards */
    #dashboard .cards{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important;width:100%!important;margin:0!important}
    #dashboard .cards .card{min-width:0!important;width:100%!important;min-height:142px!important;padding:18px!important;border:1px solid #e1eae4!important;border-radius:22px!important;background:#fff!important;box-shadow:0 8px 24px rgba(10,70,40,.07)!important}
    #dashboard .metric .ico{font-size:29px!important;line-height:32px!important}
    #dashboard .metric b{font-family:Georgia,'Times New Roman',serif!important;font-size:30px!important;line-height:1!important;margin-top:10px!important;color:#17352a!important}
    #dashboard .metric small{display:block!important;margin-top:5px!important;font-family:Georgia,'Times New Roman',serif!important;font-size:14px!important;line-height:1.2!important;color:#718078!important}

    /* Section headings */
    #dashboard .section{display:flex!important;align-items:center!important;justify-content:space-between!important;margin:25px 0 12px!important;padding:0!important}
    #dashboard .section h2{margin:0!important;padding:0!important;font-family:Georgia,'Times New Roman',serif!important;font-size:27px!important;line-height:1.08!important;letter-spacing:-.4px!important;color:#17352a!important}
    #dashboard .section .btn{border-radius:13px!important;padding:9px 12px!important}
    #dashboard .grid2{width:100%!important;min-width:0!important}
    #dashboard .grid2>.card{border-radius:22px!important;border:1px solid #e1eae4!important;background:#fff!important;box-shadow:0 8px 24px rgba(10,70,40,.07)!important}
    #dashboard .row{padding:17px 0!important;border-bottom:1px solid #e1eae4!important}

    /* One fixed nine-item navigation, never horizontally scrollable. */
    ${NAV}{display:grid!important;position:fixed!important;left:12px!important;right:12px!important;bottom:max(8px,env(safe-area-inset-bottom))!important;width:auto!important;height:78px!important;min-height:78px!important;max-height:78px!important;grid-template-columns:repeat(9,minmax(0,1fr))!important;grid-auto-flow:column!important;gap:0!important;padding:5px!important;margin:0!important;box-sizing:border-box!important;background:rgba(255,255,255,.98)!important;border:3px solid #18b85b!important;border-radius:22px!important;box-shadow:0 10px 30px rgba(10,70,40,.18)!important;overflow:hidden!important;z-index:2147483000!important;touch-action:manipulation!important}
    ${NAV} button{display:flex!important;min-width:0!important;width:100%!important;height:100%!important;max-width:none!important;flex:1 1 0!important;margin:0!important;padding:2px 1px!important;border:0!important;border-radius:13px!important;background:transparent!important;color:#41544c!important;font-family:Georgia,'Times New Roman',serif!important;font-size:0!important;line-height:1!important;font-weight:700!important;white-space:normal!important;overflow:hidden!important;align-items:center!important;justify-content:center!important;flex-direction:column!important;gap:2px!important;text-align:center!important}
    ${NAV} button span{display:block!important;font-size:19px!important;line-height:20px!important;height:20px!important;max-width:100%!important;overflow:hidden!important}
    ${NAV} button small{display:block!important;font-size:8px!important;line-height:9px!important;height:auto!important;max-width:100%!important;overflow:hidden!important;white-space:normal!important;text-overflow:clip!important}
    ${NAV} button.active{background:#08783f!important;color:#fff!important}
  }
  `;
  document.head.appendChild(s);
}
function dedupeAdmin(){
  document.querySelectorAll(NAV).forEach(bar=>{
    const admins=[...bar.querySelectorAll('button')].filter(b=>/super\s*admin/i.test((b.textContent||'').replace(/\s+/g,' ')));
    if(admins.length>1)admins.slice(1).forEach(b=>b.remove());
  });
}
function patch(){install();dedupeAdmin()}
patch();
new MutationObserver(patch).observe(document.body,{childList:true,subtree:true});
})();
