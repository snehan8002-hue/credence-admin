(function(){
  const PRIMARY_UID='aBYdbFwbsTUbpmYtoNurxyu3Roj2';
  let p;
  const fs=()=>p||(p=import('https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js'));
  const fb=()=>window.credenceFirebase;
  const esc=v=>String(v??'').replace(/[&<>\"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[m]));
  const toast=m=>{let t=document.getElementById('ceHardStudentToast');if(!t){t=document.createElement('div');t.id='ceHardStudentToast';t.style='position:fixed;right:18px;bottom:82px;background:#17352a;color:#fff;padding:12px 15px;border-radius:10px;z-index:100001;font-weight:700;max-width:calc(100vw - 36px)';document.body.appendChild(t)}t.textContent=m;t.style.display='block';clearTimeout(t._t);t._t=setTimeout(()=>t.style.display='none',2600)};
  async function allowed(){const f=fb(),u=f?.auth?.currentUser;if(!f||!u)return false;if(u.uid===PRIMARY_UID)return true;try{const x=await fs(),s=await x.getDoc(x.doc(f.db,'superAdmins',u.uid));return s.exists()&&s.data().active===true}catch(e){return false}}
  function close(){document.getElementById('ceHardStudentModal')?.remove()}
  async function open(id){
    const f=fb(); if(!f)return toast('Firebase is still loading. Please try again.');
    if(!(await allowed()))return toast('Super Admin permission required.');
    try{
      const x=await fs(),snap=await x.getDoc(x.doc(f.db,'students',id));
      if(!snap.exists())return toast('Student not found.');
      const s=snap.data();
      close();
      const m=document.createElement('div');m.id='ceHardStudentModal';m.style='position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:100000;display:flex;align-items:center;justify-content:center;padding:16px;overflow:auto';
      m.innerHTML='<div style="background:#fff;width:min(620px,100%);max-height:92vh;overflow:auto;border-radius:18px;padding:20px;color:#17352a;box-shadow:0 20px 60px rgba(0,0,0,.25)"><div style="display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:16px"><div><h2 style="margin:0">Edit Student</h2><div style="color:#718078;font-size:12px;margin-top:4px">Update this student\'s details and account status.</div></div><button type="button" id="ceHardStudentClose" style="border:0;background:#edf5ef;border-radius:50%;width:36px;height:36px;font-size:20px;cursor:pointer">×</button></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:12px"><label style="font-size:12px;font-weight:800">Full name<input id="ceHardName" style="display:block;width:100%;box-sizing:border-box;margin-top:5px;padding:11px;border:1px solid #e1eae4;border-radius:10px" value="'+esc(s.name)+'"></label><label style="font-size:12px;font-weight:800">Roll number<input id="ceHardRoll" style="display:block;width:100%;box-sizing:border-box;margin-top:5px;padding:11px;border:1px solid #e1eae4;border-radius:10px" value="'+esc(s.rollNo)+'"></label><label style="font-size:12px;font-weight:800">Class<input id="ceHardClass" style="display:block;width:100%;box-sizing:border-box;margin-top:5px;padding:11px;border:1px solid #e1eae4;border-radius:10px" value="'+esc(s.className)+'"></label><label style="font-size:12px;font-weight:800">Phone<input id="ceHardPhone" type="tel" style="display:block;width:100%;box-sizing:border-box;margin-top:5px;padding:11px;border:1px solid #e1eae4;border-radius:10px" value="'+esc(s.phone)+'"></label><label style="font-size:12px;font-weight:800">Email<input id="ceHardEmail" type="email" style="display:block;width:100%;box-sizing:border-box;margin-top:5px;padding:11px;border:1px solid #e1eae4;border-radius:10px" value="'+esc(s.email)+'"></label><label style="font-size:12px;font-weight:800">Status<select id="ceHardActive" style="display:block;width:100%;box-sizing:border-box;margin-top:5px;padding:11px;border:1px solid #e1eae4;border-radius:10px;background:#fff"><option value="true" '+(s.active!==false?'selected':'')+'>Active</option><option value="false" '+(s.active===false?'selected':'')+'>Disabled</option></select></label></div><div id="ceHardMsg" style="color:#718078;font-size:12px;margin-top:12px"></div><div style="display:flex;gap:8px;justify-content:flex-end;margin-top:14px;flex-wrap:wrap"><button type="button" id="ceHardCancel" class="btn alt">Cancel</button><button type="button" id="ceHardSave" class="btn">Save Changes</button></div></div>';
      document.body.appendChild(m);
      document.getElementById('ceHardStudentClose').onclick=close;document.getElementById('ceHardCancel').onclick=close;
      document.getElementById('ceHardSave').onclick=async()=>{
        const msg=document.getElementById('ceHardMsg'),btn=document.getElementById('ceHardSave');
        const data={name:document.getElementById('ceHardName').value.trim(),rollNo:document.getElementById('ceHardRoll').value.trim(),className:document.getElementById('ceHardClass').value.trim(),phone:document.getElementById('ceHardPhone').value.trim(),email:document.getElementById('ceHardEmail').value.trim().toLowerCase(),active:document.getElementById('ceHardActive').value==='true'};
        if(!data.name||!data.rollNo||!data.className||!data.phone||!data.email){msg.textContent='Please fill all student fields.';return}
        if(!(await allowed())){msg.textContent='Not authorized.';return}
        btn.disabled=true;btn.textContent='Saving...';msg.textContent='';
        try{const y=await fs();await y.updateDoc(y.doc(f.db,'students',id),{...data,updatedAt:y.serverTimestamp()});toast('Student updated successfully.');close();setTimeout(()=>window.credenceOpenStudents?.(),150)}catch(e){msg.textContent=e.code?e.code+': '+e.message:e.message;btn.disabled=false;btn.textContent='Save Changes'}
      };
      m.onclick=e=>{if(e.target===m)close()};
    }catch(e){toast('Could not open student editor: '+(e.message||e))}
  }
  function intercept(e){const b=e.target?.closest?.('[data-edit-student]');if(!b)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();open(b.dataset.editStudent)}
  document.addEventListener('click',intercept,true);
  const style=document.createElement('style');style.textContent='@media(max-width:650px){#ceHardStudentModal>div>div:nth-child(2){grid-template-columns:1fr!important}}';document.head.appendChild(style);
})();
