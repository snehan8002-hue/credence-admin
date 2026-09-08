/* CREDENCE AUTH HARDENING
   Keep Firebase Authentication as the source of truth.
   This wrapper prevents a stuck browser persistence/session from leaving the
   login button permanently on "Signing in..." and gives a clear error.
*/
(function(){
  'use strict';

  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  let busy = false;

  async function login(){
    if(busy) return;
    busy = true;

    const emailEl = document.getElementById('adminEmailInput');
    const passwordEl = document.getElementById('adminPasswordInput');
    const err = document.getElementById('loginError');
    const btn = document.getElementById('ceBizLoginButton') || document.querySelector('#adminGate .btn');
    const email = emailEl?.value?.trim() || '';
    const password = passwordEl?.value || '';

    if(err) err.textContent = '';
    if(!email || !password){
      if(err) err.textContent = 'Enter admin email and password.';
      busy = false;
      return;
    }

    if(btn){
      btn.disabled = true;
      btn.innerHTML = '<span>Signing in...</span>';
    }

    try{
      const fb = window.credenceFirebase;
      const auth = fb?.auth;
      if(!auth || typeof fb.signInWithEmailAndPassword !== 'function'){
        throw new Error('Firebase Authentication is still loading. Please try again.');
      }

      // Use session persistence for this admin console. It avoids relying on
      // IndexedDB/local persistence on mobile browsers and does not change
      // Firebase credentials or authorization rules.
      try{
        const mod = await import('https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js');
        if(mod?.setPersistence && mod?.browserSessionPersistence){
          await Promise.race([
            mod.setPersistence(auth, mod.browserSessionPersistence),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Firebase session storage timed out.')), 5000))
          ]);
        }
      }catch(persistError){
        console.warn('CREDENCE auth persistence setup skipped:', persistError);
      }

      const loginPromise = fb.signInWithEmailAndPassword(auth, email, password);
      await Promise.race([
        loginPromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('Firebase sign-in timed out. Please try again in a moment.')), 12000))
      ]);

      if(btn) btn.innerHTML = '<span>Login successful...</span>';

      // Give onAuthStateChanged a moment to run the existing CREDENCE
      // authorization check. That logic remains in index.html.
      await wait(1200);

    }catch(e){
      console.error('CREDENCE admin login error:', e);
      let message = e?.code ? e.code + ': ' + (e.message || 'Login failed.') : (e?.message || 'Admin login failed.');

      if(e?.code === 'auth/invalid-credential' || e?.code === 'auth/wrong-password' || e?.code === 'auth/user-not-found'){
        message = 'Invalid admin email or password.';
      }else if(e?.code === 'auth/too-many-requests' || e?.code === 'auth/quota-exceeded'){
        message = 'Firebase is temporarily limiting sign-in attempts. Please wait before trying again.';
      }

      if(err) err.textContent = message;
      if(btn){
        btn.disabled = false;
        btn.innerHTML = '<span>Login as Admin</span><span>→</span>';
      }
    }finally{
      busy = false;
    }
  }

  // auth-hardening.js is loaded after the Firebase module in index.html.
  // Install immediately; the login UI calls window.adminLogin at click time.
  window.__credenceAuthHardeningLoaded = true;
  window.adminLogin = login;
})();
