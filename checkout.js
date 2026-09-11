(() => {
const URL='https://tasoycsbzceohgjxizdp.supabase.co';
const KEY='sb_publishable_ZLU-d0ZI-XT_IgabzmigkA_5vohKjLl';
const ENDPOINT=`${URL}/functions/v1/credence-checkout`;
const token=()=>{try{return JSON.parse(localStorage.getItem('credence_session')||'null')?.access_token||''}catch{return ''}};
const esc=v=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
async function checkout(courseId){
 const t=token();
 if(!t){window.showAuth?.(false);return {ok:false}};
 const btn=document.querySelector(`[data-buy="${CSS.escape(courseId)}"]`); if(btn){btn.disabled=true;btn.textContent='Checking…'}
 try{
  const r=await fetch(ENDPOINT,{method:'POST',headers:{apikey:KEY,Authorization:`Bearer ${t}`,'Content-Type':'application/json'},body:JSON.stringify({course_id:courseId})});
  const d=await r.json();
  if(!r.ok)throw Error(d.error||'Checkout failed');
  if(d.status==='already_enrolled'||d.status==='enrolled'){
   window.closeCourse?.();
   window.CREDENCE_LEARNING?.load();
   document.getElementById('dashboard')?.classList.remove('hidden');
   document.getElementById('myLearningGrid')?.scrollIntoView({behavior:'smooth',block:'start'});
   window.showToast?.('You are enrolled. Start learning! 🎓');
   return {ok:true};
  }
  if(d.status==='payment_required'){
   window.showToast?.(`Payment gateway setup is required for this ₹${Number(d.amount_inr||0).toLocaleString('en-IN')} course.`);
   const n=document.getElementById('checkoutNotice');if(n){n.innerHTML=`<b>Payment required</b><br>₹${Number(d.amount_inr||0).toLocaleString('en-IN')} · Secure online payment will be enabled once the CREDENCE payment gateway credentials are configured.`;n.classList.remove('hidden')}
  }
 }catch(e){window.showToast?.(e.message||'Checkout failed. Please try again.');}
 finally{if(btn){btn.disabled=false;btn.textContent='Buy / Enroll'}}
}
window.CREDENCE_CHECKOUT={checkout};
})();