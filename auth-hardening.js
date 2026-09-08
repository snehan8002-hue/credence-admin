/* CREDENCE AUTH HARDENING — diagnostic + Firebase session fix */
(function(){
  'use strict';
  let busy = false;

  const wait = ms => new Promise(r => setTimeout(r, ms));
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

      /* Use session persistence on this admin console. */
      try{
        const mod = await withTimeout(
          import('https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js'),
          5000,
          'Firebase Auth module timed out.'
        );
        if(mod?.setPersistence && mod?.browserSessionPersistence){
          await withTimeout(
            mod.setPersistence(auth, mod.browserSessionPersistence),
            5000,
            'Firebase session setup timed out.'
          );
        }
      }catch(e){
        console.warn('Session persistence setup skipped:', e);
      }

      /*
       * Probe the actual Firebase password-verification endpoint first.
       * This does NOT replace Firebase Auth; it only prevents the UI from
       * waiting indefinitely and exposes backend quota/network errors.
       */
      const apiKey = auth?.app?.options?.apiKey;
      if(apiKey){
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 8000);
        try{
          const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+encodeURIComponent(apiKey),
            {
              method:'POST',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({email,password,returnSecureToken:true}),
              signal:controller.signal
            }
          );
          const data = await response.json().catch(() => ({}));
          if(!response.ok){
            const code = data?.error?.message || data?.error?.errors?.[0]?.message || 'AUTH_REQUEST_FAILED';
            const e = new Error(code);
            e.code = 'firebase/rest/'+String(code).toLowerCase();
            throw e;
          }
        }finally{
          clearTimeout(timer);
        }
      }

      /* Now establish the normal Firebase JS SDK session. */
      await withTimeout(
        fb.signInWithEmailAndPassword(auth, email, password),
        10000,
        'Firebase SDK sign-in timed out. Check the Firebase Auth service/network.'
      );

      setButton(btn, 'Login successful...', true);
      await wait(1500);

      /* If auth state did not open the app, make the reason visible. */
      if(auth.currentUser && document.getElementById('adminGate') && getComputedStyle(document.getElementById('adminGate')).display !== 'none'){
        if(auth.currentUser.uid === fb.ADMIN_UID){
          document.getElementById('adminGate').style.display = 'none';
          const shell = document.getElementById('appShell');
          if(shell) shell.style.display = 'block';
        }else{
          throw new Error('Firebase account is authenticated but is not the authorized CREDENCE Super Admin.');
        }
      }

    }catch(e){
      console.error('CREDENCE admin login error:', e);
      let message = e?.message || 'Admin login failed.';
      const raw = String(message).toUpperCase();

      if(raw.includes('QUOTA') || raw.includes('TOO_MANY_ATTEMPTS')){
        message = 'Firebase is temporarily limiting password verification. Please wait before trying again.';
      }else if(raw.includes('INVALID_PASSWORD') || raw.includes('INVALID_CREDENTIAL') || raw.includes('EMAIL_NOT_FOUND')){
        message = 'Invalid admin email or password.';
      }else if(raw.includes('OPERATION_NOT_ALLOWED')){
        message = 'Firebase Email/Password sign-in is disabled for this project.';
      }else if(e?.name === 'AbortError'){
        message = 'Firebase password verification timed out. Please check the network and try again.';
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
