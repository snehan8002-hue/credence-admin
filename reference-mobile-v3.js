(function(){
'use strict';
const STYLE_ID='credence-reference-mobile-v3-style';
function install(){
 if(!document.getElementById(STYLE_ID)){
  const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
@media(max-width:650px){
 html,body{width:100%;max-width:100%;overflow-x:hidden!important;background:#f3f7f4!important}
 .main{margin:0!important;width:100%!important;max-width:100%!important;padding:0 0 112px!important;overflow-x:hidden!important}
 #dashboard{width:100%!important;max-width:100%!important;padding:0 14px 24px!important;overflow:hidden!important}
 #dashboard .top{position:relative!important;display:flex!important;align-items:center!important;width:auto!important;height:88px!important;min-height:88px!important;margin:0 -14px 18px!important;padding:0!important;background:linear-gradient(135deg,#005f35,#07864a)!important;border:0!important;border-radius:0 0 18px 18px!important;box-shadow:0 7px 20px rgba(0,85,45,.18)!important;overflow:hidden!important}
 #dashboard .top>*:not(.ceRefHeader){display:none!important}
 .ceRefHeader{position:absolute!important;inset:0!important;display:flex!important;align-items:center!important;padding:0 14px 0 62px!important;color:#fff!important}
 .ceRefMenu{position:absolute!important;left:17px!important;top:25px!important;width:34px!important;height:34px!important;display:grid!important;place-items:center!important;font-size:28px!important;line-height:1!important;color:#fff!important;font-family:Arial,sans-serif!important;font-weight:700!important;z-index:4!important}
 .ceRefBrand{display:flex!important;align-items:center!important;gap:7px!important;min-width:0!important}
 .ceRefBrand img{width:46px!important;height:46px!important;object-fit:cover!important;border-radius:11px!important;flex:none!important}
 .ceRefBrandText{display:flex!important;flex-direction:column!important;line-height:1!important;white-space:nowrap!important}
 .ceRefName{font:900 19px/20px Inter,system-ui,sans-serif!important;letter-spacing:.2px!important;color:#fff!important}
 .ceRefSub{font:800 8px/10px Inter,system-ui,sans-serif!important;letter-spacing:1px!important;color:#d7f6e4!important}
 .ceRefNotify{position:absolute!important;right:78px!important;top:25px!important;width:36px!important;height:36px!important;display:grid!important;place-items:center!important;font-size:24px!important;line-height:1!important;color:#fff!important;z-index:4!important}
 .ceRefNotify:after{content:''!important;position:absolute!important;right:2px!important;top:1px!important;width:8px!important;height:8px!important;border-radius:50%!important;background:#ff334d!important;border:2px solid #07864a!important}
 .ceRefAdmin{position:absolute!important;right:12px!important;top:19px!important;height:50px!important;display:flex!important;align-items:center!important;gap:5px!important;color:#fff!important;z-index:4!important;white-space:nowrap!important}
 .ceRefAdminAvatar{width:42px!important;height:42px!important;border-radius:50%!important;background:#fff!important;border:2px solid #fff!important;display:grid!important;place-items:center!important;font-size:23px!important;color:#08783f!important}
 .ceRefAdminText{font:800 13px/16px Georgia,serif!important;color:#fff!important}
 .ceRefAdminArrow{font-size:14px!important;color:#fff!important}
 #dashboard .cards{width:100%!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important;margin:0!important}
 #dashboard .cards>.card{min-width:0!important;width:100%!important;border-radius:22px!important;padding:16px!important;background:#fff!important;border:1px solid #e0e9e3!important;box-shadow:0 7px 22px rgba(10,70,40,.07)!important}
 #dashboard .metric .ico{font-size:29px!important;line-height:32px!important}
 #dashboard .metric b{font-size:29px!important;line-height:34px!important;margin-top:5px!important}
 #dashboard .metric small{font-size:13px!important;line-height:17px!important}
 #dashboard .section{margin:24px 0 12px!important}
 #dashboard .section h2{font-size:24px!important;line-height:29px!important;margin:0!important}
 #dashboard .card{border-radius:22px!important}
 #dashboard .row{min-width:0!important;padding:15px 0!important}
 #dashboard .row .grow{min-width:0!important}
 #dashboard .row .grow b{font-size:18px!important}
 #dashboard .muted{font-size:13px!important}
 /* EXACT reference bottom box: all 9 items visible at once, no horizontal sliding */
 .mobilebar{position:fixed!important;left:8px!important;right:8px!important;bottom:10px!important;width:auto!important;height:88px!important;display:grid!important;grid-template-columns:repeat(9,minmax(0,1fr))!important;grid-template-rows:1fr!important;gap:0!important;padding:4px 3px!important;box-sizing:border-box!important;overflow:hidden!important;overflow-x:hidden!important;align-items:stretch!important;background:#fff!important;border:2px solid #20bd62!important;border-radius:18px!important;box-shadow:0 8px 24px rgba(10,70,40,.17)!important;z-index:9500!important}
 .mobilebar button{display:flex!important;width:100%!important;min-width:0!important;max-width:none!important;height:100%!important;flex:none!important;box-sizing:border-box!important;margin:0!important;padding:2px 0!important;border:0!important;border-radius:12px!important;background:transparent!important;color:#4f6159!important;overflow:hidden!important;white-space:normal!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:1px!important;text-align:center!important;font-family:Georgia,serif!important;font-size:8px!important;font-weight:700!important;line-height:9px!important}
 .mobilebar button span{display:block!important;font-size:19px!important;line-height:22px!important;height:23px!important;max-width:100%!important;overflow:hidden!important;flex:none!important}
 .mobilebar button small{display:block!important;max-width:100%!important;font-size:8px!important;line-height:9px!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}
 .mobilebar button.active{background:#08783f!important;color:#fff!important}
 .mobilebar button[data-ce-superadmin] small{font-size:6.5px!important;letter-spacing:-.15px!important}
 #credenceDashboardBottomBar{display:none!important}
}
`;
  document.head.appendChild(s);
 }
 const d=document.getElementById('dashboard');const top=d?.querySelector('.top');if(!top)return;
 let h=top.querySelector('.ceRefHeader');
 if(!h){
  h=document.createElement('div');h.className='ceRefHeader';
  h.innerHTML='<div class="ceRefMenu">☰</div><div class="ceRefBrand"><img alt="CREDENCE"><div class="ceRefBrandText"><div class="ceRefName">CREDENCE</div><div class="ceRefSub">ADMIN PANEL</div></div></div><div class="ceRefNotify">🔔</div><div class="ceRefAdmin"><div class="ceRefAdminAvatar">👤</div><div class="ceRefAdminText">Admin</div><div class="ceRefAdminArrow">⌄</div></div>';
  top.appendChild(h);
 }
 const src=document.querySelector('.brand img')?.getAttribute('src');if(src)h.querySelector('img').src=src;
 const menu=h.querySelector('.ceRefMenu');if(menu&&!menu.dataset.bound){menu.dataset.bound='1';menu.onclick=function(e){e.preventDefault();e.stopPropagation();const b=document.querySelector('#'+CSS.escape('credenceRepairMore'));if(b)b.click();else document.querySelector('.side')?.classList.toggle('ceMobileOpen')}}
 const notify=h.querySelector('.ceRefNotify');if(notify&&!notify.dataset.bound){notify.dataset.bound='1';notify.onclick=function(e){e.preventDefault();e.stopPropagation();const b=[...document.querySelectorAll('button')].find(x=>/notification/i.test(x.textContent||''));if(b)b.click();}};
}
function start(){install();let n=0;const t=setInterval(()=>{install();if(++n>50)clearInterval(t)},300);new MutationObserver(()=>install()).observe(document.body,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();