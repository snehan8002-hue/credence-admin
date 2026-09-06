(function(){
const PRIMARY_UID='aBYdbFwbsTUbpmYtoNurxyu3Roj2';
function patch(){
 const list=document.getElementById('ceList');
 if(!list)return;
 list.querySelectorAll('button').forEach(function(b){
  const text=(b.textContent||'').trim();
  if(text!=='Disable'&&text!=='Enable')return;
  const row=b.closest('.row')||b.parentElement;
  const disabled=!!(row&&((row.textContent||'').toLowerCase().indexOf('disabled')>=0));
  if(disabled)b.textContent='Enable';
 });
}
patch();
new MutationObserver(patch).observe(document.body,{childList:true,subtree:true,characterData:true});
setInterval(patch,1000);
})();
