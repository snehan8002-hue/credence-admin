(function(){
'use strict';

const STYLE_ID='credence-dashboard-minimal-style';
const MENU_ID='credenceMoreMenu';
const BTN_ID='credenceMoreBtn';

function addStyles(){
  if(document.getElementById(STYLE_ID)) return;
  const s=document.createElement('style');
  s.id=STYLE_ID;
  s.textContent=`
    #${BTN_ID}{position:absolute;left:0;top:0;width:42px;height:42px;border:1px solid #e1eae4;border-radius:12px;background:#fff;color:#17352a;font-size:25px;line-height:1;display:grid;place-items:center;cursor:pointer;box-shadow:0 4px 14px rgba(10,70,40,.08);z-index:30}
    #${BTN_ID}:active{transform:scale(.97)}
    #${MENU_ID}{position:absolute;left:0;top:49px;width:190px;background:#fff;border:1px solid #e1eae4;border-radius:14px;box-shadow:0 12px 30px rgba(10,70,40,.14);padding:7px;z-index:120;display:none}
    #${MENU_ID}.show{display:block}
    #${MENU_ID} button{width:100%;border:0;background:#fff;text-align:left;border-radius:10px;padding:12px 11px;color:#17352a;font-weight:800;font-size:14px;cursor:pointer}
    #${MENU_ID} button:hover{background:#e9f7ed;color:#08783f}
    @media(max-width:650px){
      .main{padding-top:62px!important}
      .top{position:relative}
      #${BTN_ID}{left:0;top:-52px}
      #${MENU_ID}{left:0;top:-3px}
    }
  `;
  document.head.appendChild(s);
}

function text(el){return (el?.textContent||'').replace(/\s+/g,' ').trim()}

function hideQuickActions(){
  document.querySelectorAll('.section').forEach(sec=>{
    const h=sec.querySelector('h2');
    if(h && /^quick\s*actions$/i.test(text(h))) sec.style.display='none';
  });
  document.querySelectorAll('h1,h2,h3,h4,strong,b,div,span').forEach(el=>{
    if(/^quick\s*actions$/i.test(text(el))){
      const sec=el.closest('.section');
      if(sec) sec.style.display='none';
    }
  });
}

function removeAddClass(){
  document.querySelectorAll('button').forEach(b=>{
    if(/^\+?\s*add\s+class$/i.test(text(b)) || /add\s+class/i.test(text(b))){
      b.remove();
    }
  });
}

function hideDuplicateAdminButtons(){
  ['ceAdminBtn','ceQuickAdmin'].forEach(id=>document.getElementById(id)?.remove());
  document.querySelectorAll('button').forEach(b=>{
    const t=text(b);
    if(/^🛡️\s*super\s*admins?$/i.test(t)) b.remove();
  });
}

function openSuperAdmin(){
  const fn=window.credenceOpenSuperAdmins;
  if(typeof fn==='function') return fn();
  setTimeout(()=>{if(typeof window.credenceOpenSuperAdmins==='function') window.credenceOpenSuperAdmins()},250);
}

function buildMenu(){
  const top=document.querySelector('.top');
  if(!top || document.getElementById(BTN_ID)) return;
  top.style.position='relative';
  const wrap=document.createElement('div');
  wrap.id='credenceMoreWrap';
  wrap.style.position='absolute';
  wrap.style.left='0';
  wrap.style.top='0';
  wrap.style.zIndex='120';
  wrap.innerHTML=`<button id="${BTN_ID}" type="button" aria-label="More menu" aria-expanded="false">⋮</button><div id="${MENU_ID}" role="menu"><button type="button" id="credenceSuperAdminMenu" role="menuitem">🛡️&nbsp; Super Admin</button></div>`;
  top.insertBefore(wrap,top.firstChild);
  const btn=document.getElementById(BTN_ID),menu=document.getElementById(MENU_ID);
  btn.onclick=e=>{e.preventDefault();e.stopPropagation();const show=!menu.classList.contains('show');menu.classList.toggle('show',show);btn.setAttribute('aria-expanded',String(show));};
  document.getElementById('credenceSuperAdminMenu').onclick=e=>{e.preventDefault();e.stopPropagation();menu.classList.remove('show');btn.setAttribute('aria-expanded','false');openSuperAdmin()};
  document.addEventListener('click',e=>{if(!wrap.contains(e.target)){menu.classList.remove('show');btn.setAttribute('aria-expanded','false')}},{passive:true});
}

function patch(){
  addStyles();
  hideQuickActions();
  removeAddClass();
  hideDuplicateAdminButtons();
  buildMenu();
}

let timer=0;
function schedule(){clearTimeout(timer);timer=setTimeout(patch,40)}

patch();
new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true,characterData:true});
})();
