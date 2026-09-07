(function(){
'use strict';

const STYLE_ID='credence-dashboard-minimal-style-v2';
const BTN_ID='credenceMoreBtn';
const MENU_ID='credenceMoreMenu';
const WRAP_ID='credenceMoreWrap';

function addStyles(){
  if(document.getElementById(STYLE_ID)) return;
  const s=document.createElement('style');
  s.id=STYLE_ID;
  s.textContent=`
    #${WRAP_ID}{position:absolute!important;left:0!important;top:0!important;z-index:500!important}
    #${BTN_ID}{width:42px!important;height:42px!important;border:1px solid #e1eae4!important;border-radius:12px!important;background:#fff!important;color:#17352a!important;font-size:25px!important;line-height:1!important;display:grid!important;place-items:center!important;cursor:pointer!important;box-shadow:0 4px 14px rgba(10,70,40,.08)!important;z-index:501!important;padding:0!important}
    #${BTN_ID}:active{transform:scale(.97)}
    #${MENU_ID}{position:absolute!important;left:0!important;top:49px!important;width:190px!important;background:#fff!important;border:1px solid #e1eae4!important;border-radius:14px!important;box-shadow:0 12px 30px rgba(10,70,40,.14)!important;padding:7px!important;z-index:502!important;display:none!important}
    #${MENU_ID}.show{display:block!important}
    #${MENU_ID} button{width:100%!important;border:0!important;background:#fff!important;text-align:left!important;border-radius:10px!important;padding:12px 11px!important;color:#17352a!important;font-weight:800!important;font-size:14px!important;cursor:pointer!important}
    #${MENU_ID} button:hover{background:#e9f7ed!important;color:#08783f!important}
    @media(max-width:650px){
      .main{padding-top:62px!important}
      #${WRAP_ID}{left:0!important;top:-52px!important}
      #${MENU_ID}{left:0!important;top:49px!important}
    }
    #dashboard .credence-hidden-quick-actions{display:none!important}
    #dashboard .credence-hidden-add-class{display:none!important}
  `;
  document.head.appendChild(s);
}

function cleanDashboard(){
  const dashboard=document.getElementById('dashboard');
  if(!dashboard) return;

  dashboard.querySelectorAll('.section').forEach(sec=>{
    const h=sec.querySelector('h2');
    const title=(h?.textContent||'').replace(/\s+/g,' ').trim();
    if(/^quick\s*actions$/i.test(title)){
      sec.classList.add('credence-hidden-quick-actions');
    }
    if(/^today[’']s\s+live\s+classes$/i.test(title)){
      sec.querySelectorAll('button').forEach(btn=>{
        const t=(btn.textContent||'').replace(/\s+/g,' ').trim();
        if(/^\+?\s*add\s+class$/i.test(t)) btn.classList.add('credence-hidden-add-class');
      });
    }
  });
}

function removeOldAdminButtons(){
  ['ceAdminBtn','ceQuickAdmin'].forEach(id=>document.getElementById(id)?.remove());
  document.querySelectorAll('button').forEach(btn=>{
    const t=(btn.textContent||'').replace(/\s+/g,' ').trim();
    if(/^🛡️\s*super\s*admins?$/i.test(t)) btn.remove();
  });
}

function openSuperAdmin(){
  if(typeof window.credenceOpenSuperAdmins==='function'){
    window.credenceOpenSuperAdmins();
    return;
  }
  setTimeout(()=>{
    if(typeof window.credenceOpenSuperAdmins==='function') window.credenceOpenSuperAdmins();
  },300);
}

function buildMenu(){
  const top=document.querySelector('#dashboard .top');
  if(!top) return;
  top.style.position='relative';

  let wrap=document.getElementById(WRAP_ID);
  if(!wrap){
    wrap=document.createElement('div');
    wrap.id=WRAP_ID;
    wrap.innerHTML='<button id="'+BTN_ID+'" type="button" aria-label="More menu" aria-expanded="false">⋮</button><div id="'+MENU_ID+'" role="menu"><button type="button" id="credenceSuperAdminMenu" role="menuitem">🛡️&nbsp; Super Admin</button></div>';
    top.insertBefore(wrap,top.firstChild);
  }else if(wrap.parentElement!==top){
    top.insertBefore(wrap,top.firstChild);
  }

  const btn=document.getElementById(BTN_ID);
  const menu=document.getElementById(MENU_ID);
  const admin=document.getElementById('credenceSuperAdminMenu');
  if(!btn||!menu||!admin) return;

  if(!btn.dataset.bound){
    btn.dataset.bound='1';
    btn.addEventListener('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      const show=!menu.classList.contains('show');
      menu.classList.toggle('show',show);
      btn.setAttribute('aria-expanded',String(show));
    });
  }
  if(!admin.dataset.bound){
    admin.dataset.bound='1';
    admin.addEventListener('click',function(e){
      e.preventDefault();
      e.stopPropagation();
      menu.classList.remove('show');
      btn.setAttribute('aria-expanded','false');
      openSuperAdmin();
    });
  }
  if(!document.body.dataset.credenceMenuOutsideBound){
    document.body.dataset.credenceMenuOutsideBound='1';
    document.addEventListener('click',function(e){
      const w=document.getElementById(WRAP_ID);
      const b=document.getElementById(BTN_ID);
      const m=document.getElementById(MENU_ID);
      if(w && !w.contains(e.target) && m){
        m.classList.remove('show');
        b?.setAttribute('aria-expanded','false');
      }
    });
  }
}

function patch(){
  addStyles();
  cleanDashboard();
  removeOldAdminButtons();
  buildMenu();
}

function start(){
  patch();
  let n=0;
  const timer=setInterval(()=>{
    patch();
    if(++n>=20) clearInterval(timer);
  },500);
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
else start();
})();
