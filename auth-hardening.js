/* CREDENCE AUTH — fast, single Firebase sign-in path */
(function(){
  'use strict';
  let busy = false;

  const withTimeout = (promise, ms, message) => Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms))
  ]);

  function setButton(btn, text, disabled){
    if(!btn) return;
    btn.disabled = !!disabled;
    btn.innerHTML = disabled
      ? '<span>'+text+'</span>'
      : '<span>'+text+'</span><span>→</span>';
  }

  async function login(){
    if(busy) return;
    busy = true;

    const email = document.getElementById('adminEmailInput')?.value?.trim() || '';
    const password = document.getElementById('adminPasswordInput')?.value || '';
    const err = document.getElementById('loginError');
    const btn = document.getElementById('ceBizLoginButton') || document.querySelector('#adminGate .btn');

    if(err) err.textContent = '';
    if(!email || !password){
      if(err) err.textContent = 'Enter admin email and password.';
      busy = false;
      return;
    }

    setButton(btn, 'Signing in...', true);

    try{
      const fb = window.credenceFirebase;
      const auth = fb?.auth;
      if(!auth || typeof fb.signInWithEmailAndPassword !== 'function'){
        throw new Error('Firebase Authentication is still loading. Please try again.');
      }

      /* One authentication request only. Do not duplicate password verification. */
      await withTimeout(
        fb.signInWithEmailAndPassword(auth, email, password),
        15000,
        'Firebase login timed out. Please check your network and try again.'
      );

      setButton(btn, 'Login successful...', true);

      /* onAuthStateChanged performs the real admin authorization check. */
      await new Promise(resolve => setTimeout(resolve, 700));

    }catch(e){
      console.error('CREDENCE admin login error:', e);
      const raw = String(e?.code || e?.message || '').toUpperCase();
      let message = 'Admin login failed. Please try again.';

      if(raw.includes('QUOTA') || raw.includes('TOO_MANY_ATTEMPTS')){
        message = 'Firebase is temporarily limiting password verification. Please wait and try again later.';
      }else if(raw.includes('INVALID_PASSWORD') || raw.includes('INVALID_CREDENTIAL') || raw.includes('INVALID_LOGIN_CREDENTIALS') || raw.includes('EMAIL_NOT_FOUND')){
        message = 'Invalid admin email or password.';
      }else if(raw.includes('USER_DISABLED')){
        message = 'This Firebase admin account is disabled.';
      }else if(raw.includes('OPERATION_NOT_ALLOWED')){
        message = 'Firebase Email/Password sign-in is disabled for this project.';
      }else if(raw.includes('NETWORK_REQUEST_FAILED') || raw.includes('TIMEOUT')){
        message = 'Firebase could not be reached. Check your internet connection and try again.';
      }else if(e?.message){
        message = e.message;
      }

      if(err) err.textContent = message;
      setButton(btn, 'Login as Admin', false);
    }finally{
      busy = false;
    }
  }

  window.__credenceAuthHardeningLoaded = true;
  window.adminLogin = login;
})();
