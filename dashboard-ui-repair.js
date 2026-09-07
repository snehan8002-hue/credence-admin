(function(){
'use strict';
const STYLE='credence-dashboard-ui-repair-style';
const MENU='credenceRepairMenu';
const BTN='credenceRepairMore';
const DASHBAR='credenceDashboardBottomBar';
function text(x){return (x?.textContent||'').replace(/\s+/g,' ').trim()}
function addStyle(){
 if(document.getElementById(STYLE))return;
 const s=document.createElement('style');s.id=STYLE;s.textContent=`
 #${BTN}{position:absolute!important;left:8px!important;top:8px!important;width:44px!important;height:44px!important;border:1px solid #dfe9e2!important;border-radius:12px!important;background:#fff!important;color:#17352a!important;font-size:28px!important;line-height:1!important;padding:0!important;display:grid!important;place-items:center!important;z-index:9998!important;box-shadow:0 5px 16px rgba(10,70,40,.12)!important}
 #${MENU}{position:absolute!important;left:8px!important;top:58px!important;width:210px!important;background:#fff!important;border:1px solid #dfe9e2!important;border-radius:14px!important;padding:7px!important;box-shadow:0 14px 34px rgba(10,70,40,.18)!important;z-index:9999!important;display:none!important}
 #${MENU}.show{display:block!important}
 #${MENU} button{display:block!important;width:100%!important;border:0!important;background:#fff!important;text-align:left!important;border-radius:10px!important;padding:14px 12px!important;color:#17352a!important;font-weight:800!important;font-size:14px!important}
 #${MENU} button:active{background:#e9f7ed!important}
 #credencePaymentBack{position:fixed!important;left:12px!important;top:78px!important;width:44px!important;height:44px!important;border:1px solid #dfe9e2!important;border-radius:12px!important;background:#fff!important;color:#17352a!important;font-size:25px!important;display:none!important;place-items:center!important;z-index:9997!important;box-shadow:0 5px 16px rgba(10,70,40,.12)!important}
 #${DASHBAR}{position:fixed!important;left:255px!important;right:0!important;bottom:0!important;min-height:66px!important;background:#fff!important;border-top:1px solid #e1eae4!important;box-shadow:0 -6px 22px rgba(10,70,40,.08)!important;display:none!important;align-items:stretch!important;justify-content:center!important;gap:2px!important;padding:7px 10px!important;z-index:9000!important}
 #${DASHBAR}.show{display:flex!important}
 #${DASHBAR} button{flex:1 1 90px!important;max-width:145px!important;border:0!important;background:#fff!important;color:#65756d!important;border-radius:12px!important;padding:7px 8px!important;font:700 11px/1.15 Inter,system-ui,sans-serif!important;cursor:pointer!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:3px!important}
 #${DASHBAR} button:hover,#${DASHBAR} button.active{background:#e9f7ed!important;color:#08783f!important}
 #${DASHBAR} .ico{font-size:19px!important;line-height:1!important}
 .main:has(#${DASHBAR}.show){padding-bottom:90px!important}
 @media(max-width:900px){#${DASHBAR}{left:210px!important}}

 /* REFERENCE-STYLE MOBILE DASHBOARD */
 @media(max-width:650px){
  body{background:#f3f7f4!important}
  #${BTN}{display:none!important}
  #${MENU}{display:none!important}
  .main{padding:0 0 88px!important;margin:0!important;width:100%!important}
  #dashboard{padding:0 14px 22px!important}
  #dashboard .top{position:relative!important;margin:0 -14px 18px!important;padding:16px 18px 14px 68px!important;min-height:78px!important;background:linear-gradient(135deg,#006b3c,#0b8d50)!important;color:#fff!important;border:0!important;border-radius:0 0 18px 18px!important;box-shadow:0 8px 22px rgba(0,85,45,.18)!important;display:flex!important;align-items:center!important}
  #dashboard .top h1,#dashboard .top p{display:none!important}
  #dashboard .top:before{content:'☰';position:absolute;left:18px;top:19px;width:38px;height:38px;display:grid;place-items:center;color:#fff;font-size:28px;font-weight:700;line-height:1;cursor:pointer}
  #dashboard .top:after{content:'🔔';position:absolute;right:76px;top:20px;font-size:25px;line-height:38px;width:38px;height:38px;text-align:center;filter:drop-shadow(0 1px 2px rgba(0,0,0,.15));cursor:pointer}
  #dashboard .top .admin{margin-left:auto!important;display:flex!important;align-items:center!important;gap:7px!important;color:#fff!important;font-weight:800!important;font-size:14px!important}
  #dashboard .top .admin .avatar{width:40px!important;height:40px!important;border:2px solid rgba(255,255,255,.9)!important;background:#fff!important;color:#08783f!important}
  #dashboard .top .admin:after{content:'⌄';font-size:17px;color:#fff;margin-left:0}
  #dashboard .cards{gap:10px!important;margin-top:0!important}
  #dashboard .card{border-radius:22px!important;border:1px solid #e1eae4!important;box-shadow:0 8px 25px rgba(10,70,40,.07)!important;padding:16px!important;background:#fff!important}
  #dashboard .metric .ico{font-size:30px!important}
  #dashboard .metric b{font-size:30px!important;margin-top:7px!important}
  #dashboard .metric small{font-size:13px!important}
  #dashboard .section{margin:24px 0 12px!important}
  #dashboard .section h2{font-size:24px!important;letter-spacing:-.2px!important}
  #dashboard .btn.alt{border-width:2px!important;border-radius:17px!important;padding:11px 16px!important}
  #dashboard .row{padding:15px 0!important}
  #dashboard .muted{font-size:13px!important}
  .mobilebar{left:10px!important;right:10px!important;bottom:10px!important;height:70px!important;padding:5px 4px!important;display:flex!important;align-items:stretch!important;background:rgba(255,255,255,.98)!important;border:2px solid #16b95a!important;border-radius:18px!important;box-shadow:0 10px 28px rgba(10,70,40,.16)!important;z-index:9500!important;overflow-x:auto!important;overflow-y:hidden!important}
  .mobilebar button{flex:0 0 12.5%!important;min-width:74px!important;border:0!important;background:transparent!important;border-radius:13px!important;padding:4px 2px!important;color:#52635b!important;font-family:Georgia,serif!important;font-size:10px!important;font-weight:700!important;line-height:1.05!important;white-space:nowrap!important}
  .mobilebar button.active{background:#08783f!important;color:#fff!important;font-weight:800!important}
  .mobilebar button span{font-size:22px!important;line-height:25px!important}
  .mobilebar button small{font-size:10px!important}
  .mobilebar[data-ce-dashboard-extra="1"] button[data-ce-superadmin]{display:block!important}
  #${DASHBAR}{display:none!important}
  .main:has(#${DASHBAR}.show){padding-bottom:78px!important}
 }
 `;document.head.appendChild(s)
}
function hideHomeExtras(){const d=document.getElementById('dashboard');if(!d)return;d.querySelectorAll('.section').forEach(sec=>{const h=sec.querySelector('h2');if(h&&/^quick\s*actions$/i.test(text(h)))sec.style.display='none';if(h&&/^today[’']s\s+live\s+classes$/i.test(text(h)))sec.querySelectorAll('button').forEach(b=>{if(/^\+?\s*add\s+class$/i.test(text(b)))b.style.display='none'})})}
function openCustomize(){const direct=[...document.querySelectorAll('button')].find(b=>!b.closest('.mobilebar')&&/^customize app$/i.test(text(b)));if(direct){direct.click();return true}const any=[...document.querySelectorAll('button')].find(b=>!b.closest('#'+MENU)&&/customize/i.test(text(b)));if(any){any.click();return true}const view=[...document.querySelectorAll('.view')].find(v=>/customize/i.test(text(v.querySelector('h1,h2,h3')||v)));if(view){document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));view.classList.add('active');return true}return false}
function openSuperAdmin(){if(typeof window.credenceOpenSuperAdmins==='function'){window.credenceOpenSuperAdmins();return true}return false}
function home(){const b=[...document.querySelectorAll('.mobilebar button,.nav button')].find(x=>/^home$/i.test(text(x)));if(b){b.click();return}document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));document.getElementById('dashboard')?.classList.add('active')}
function call(name){if(typeof window[name]==='function'){window[name]();return true}return false}
function dashboardItems(){return [['🏠','Home',home],['👨‍🎓','Students',()=>call('credenceOpenStudents')],['👩‍🏫','Teachers',()=>call('credenceOpenTeachers')],['📚','Classes',()=>call('credenceOpenClasses')],['📝','Tests',()=>call('credenceOpenTests')],['📄','Notes',()=>call('credenceOpenNotes')],['💳','Fees',()=>call('credenceOpenFees')],['⚙️','Customize',openCustomize],['🛡️','Super Admin',openSuperAdmin]]}
function buildDashboardBottom(){const d=document.getElementById('dashboard');if(!d)return;let bar=document.getElementById(DASHBAR);if(!bar){bar=document.createElement('nav');bar.id=DASHBAR;bar.setAttribute('aria-label','Dashboard navigation');document.body.appendChild(bar)}const active=d.classList.contains('active');bar.classList.toggle('show',active);if(!bar.dataset.built){bar.dataset.built='1';bar.innerHTML=dashboardItems().map((x,i)=>'<button type="button" data-dash-bottom="'+x[1]+'" aria-label="'+x[1]+'"><span class="ico">'+x[0]+'</span><span>'+x[1]+'</span></button>').join('');bar.querySelectorAll('[data-dash-bottom]').forEach((b,i)=>b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();try{dashboardItems()[i][2]()}catch(err){console.error('Dashboard navigation error:',err)}}))}}
function addMobileSuperAdmin(){
 const d=document.getElementById('dashboard');const bar=document.querySelector('.mobilebar');
 if(!d||!bar)return;
 const isHome=d.classList.contains('active');
 if(!isHome){bar.removeAttribute('data-ce-dashboard-extra');bar.querySelector('[data-ce-superadmin]')?.remove();return}
 bar.setAttribute('data-ce-dashboard-extra','1');
 let b=bar.querySelector('[data-ce-superadmin]');
 if(!b){b=document.createElement('button');b.type='button';b.setAttribute('data-ce-superadmin','1');b.innerHTML='<span style="font-size:22px;line-height:25px">🛡️</span><br><small style="font-size:10px">Super Admin</small>';b.onclick=function(e){e.preventDefault();e.stopPropagation();openSuperAdmin()};bar.appendChild(b)}
}
function buildMenu(){const d=document.getElementById('dashboard'),top=d?.querySelector('.top');if(!top)return;top.style.position='relative';let b=document.getElementById(BTN),m=document.getElementById(MENU);if(!b){b=document.createElement('button');b.id=BTN;b.type='button';b.setAttribute('aria-label','More');b.textContent='⋮';top.insertBefore(b,top.firstChild)}if(!m){m=document.createElement('div');m.id=MENU;m.setAttribute('role','menu');m.innerHTML='<button type="button" id="credenceRepairCustomize">⚙️  Customize</button><button type="button" id="credenceRepairAdmin">🛡️  Super Admin</button>';top.insertBefore(m,b.nextSibling)}if(!b.dataset.bound){b.dataset.bound='1';b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();m.classList.toggle('show');b.setAttribute('aria-expanded',String(m.classList.contains('show')))},true)}const c=document.getElementById('credenceRepairCustomize'),a=document.getElementById('credenceRepairAdmin');if(c&&!c.dataset.bound){c.dataset.bound='1';c.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();m.classList.remove('show');openCustomize()},true)}if(a&&!a.dataset.bound){a.dataset.bound='1';a.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();m.classList.remove('show');openSuperAdmin()},true)}}
function wireCustomize(){document.querySelectorAll('.mobilebar button').forEach(b=>{if(b.dataset.repairCustomize||b.hasAttribute('data-ce-superadmin'))return;if(!/customize/i.test(text(b)))return;b.dataset.repairCustomize='1';b.addEventListener('click',function(e){e.preventDefault();e.stopImmediatePropagation();openCustomize()},true)})}
function paymentView(){return [...document.querySelectorAll('.view')].find(v=>v.classList.contains('active')&&/payments?/i.test(text(v.querySelector('h1,h2,h3')||v)))}
function wirePaymentBack(){const v=paymentView();let b=document.getElementById('credencePaymentBack');if(!b){b=document.createElement('button');b.id='credencePaymentBack';b.type='button';b.setAttribute('aria-label','Back to Home');b.textContent='‹';document.body.appendChild(b);b.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();home()})}b.style.display=v?'grid':'none'}
function installFinalAuth(){if(window.__credenceFinalAuthInstalled)return true;const fb=window.credenceFirebase;if(!fb||!fb.auth||!fb.signInWithEmailAndPassword)return false;window.__credenceFinalAuthInstalled=true;window.adminLogin=async function(){const emailEl=document.getElementById('adminEmailInput'),passEl=document.getElementById('adminPasswordInput'),err=document.getElementById('loginError'),btn=document.querySelector('#adminGate .btn');const email=(emailEl?.value||'').trim(),password=passEl?.value||'';if(!email||!password){if(err)err.textContent='Enter admin email and password.';return}if(btn){btn.disabled=true;btn.textContent='Signing in...'}if(err)err.textContent='';try{const cred=await Promise.race([fb.signInWithEmailAndPassword(fb.auth,email,password),new Promise((_,reject)=>setTimeout(()=>reject(Object.assign(new Error('Firebase login timed out after 15 seconds.'),{code:'auth/timeout'})),15000))]);const user=cred.user;if(!user||user.uid!==fb.ADMIN_UID){if(err)err.textContent='Signed in, but this account is not the configured CREDENCE admin. UID: '+(user?.uid||'unknown');try{await fb.signOut(fb.auth)}catch(_e){}if(btn){btn.disabled=false;btn.textContent='Login as Admin'}return}if(err)err.textContent='';const gate=document.getElementById('adminGate'),shell=document.getElementById('appShell'),who=document.getElementById('adminEmail');if(gate)gate.style.display='none';if(shell)shell.style.display='block';if(who)who.textContent=user.email||'Firebase Admin';if(btn){btn.disabled=false;btn.textContent='Login as Admin'}}catch(e){console.error('CREDENCE final admin login error:',e);let message=e?.message||'Firebase login failed.';if(e?.code==='auth/timeout')message='Firebase login timed out after 15 seconds. Check the network and Firebase Auth configuration.';if(e?.code==='auth/unauthorized-domain')message='Firebase blocked this website domain. Add the current GitHub Pages domain to Firebase Authentication → Settings → Authorized domains.';if(e?.code==='auth/invalid-credential')message='Invalid email or password. Firebase rejected the credentials.';if(e?.code==='auth/user-not-found')message='No Firebase Authentication user exists for this email.';if(e?.code==='auth/wrong-password')message='The Firebase password is incorrect.';if(e?.code==='auth/invalid-email')message='The admin email address is invalid.';if(e?.code==='auth/network-request-failed')message='Firebase could not reach the network. Check the connection and try again.';if(err)err.textContent=(e?.code?e.code+': ':'')+message;if(btn){btn.disabled=false;btn.textContent='Login as Admin'}}};return true}
function patch(){addStyle();hideHomeExtras();buildMenu();wireCustomize();wirePaymentBack();buildDashboardBottom();addMobileSuperAdmin()}
function start(){patch();let n=0;const t=setInterval(()=>{patch();installFinalAuth();if(++n>40)clearInterval(t)},400);installFinalAuth();new MutationObserver(()=>{patch()}).observe(document.body,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
