(function(){
const patch=()=>{
 const list=document.getElementById('ceList');
 if(list) list.querySelectorAll('button[data-admin]').forEach(b=>{const r=b.closest('.row');const d=/disabled/i.test(r?.textContent||'');b.textContent=d?'Enable':'Disable';b.classList.toggle('danger',!d)});
 const body=document.getElementById('ceStudentRows');
 if(body) body.querySelectorAll('button[data-toggle-student]').forEach(b=>{const r=b.closest('tr');const d=/disabled/i.test(r?.textContent||'');b.textContent=d?'Enable':'Disable';b.classList.toggle('danger',!d)});
 document.querySelectorAll('button').forEach(b=>{if((b.textContent||'').replace(/\s+/g,' ').trim().toLowerCase()==='customize'&&!b.dataset.ceCustomize){b.dataset.ceCustomize='1';b.onclick=()=>{const q=[...document.querySelectorAll('button')].find(x=>/customize app/i.test((x.textContent||'').trim()));if(q)q.click()}}});
};
patch();new MutationObserver(patch).observe(document.body,{childList:true,subtree:true,characterData:true});setInterval(patch,700);
})();
