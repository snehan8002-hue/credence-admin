/* CREDENCE AUTH — single user-initiated Firebase sign-in path */
(function(){
  'use strict';
  let busy = false;
  const GESTURE_WINDOW = 2500;

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

  function markUserGesture(){
    window.__credenceLoginGestureAt = Date.now();
  }

  function hasRecentUserGesture(){
    return Number.isFinite(window.__credenceLoginGestureAt) &&
      Date.now() - window.__credenceLoginGestureAt < GESTURE_WINDOW;
  }

  async function login(){
    /* Never authenticate merely because a script/autofill invoked the handler. */
    if(!hasRecentUserGesture()) return;
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

      const result = await withTimeout(
        fb.signInWithEmailAndPassword(auth, email, password),
        15000,
        'Firebase login timed out. Please check your network and try again.'
      );

      const user = result?.user;
      if(!user) throw new Error('Firebase did not return an authenticated user.');

      let authorized = user.uid === fb.ADMIN_UID;
      if(!authorized){
        if(typeof fb.getDoc !== 'function') throw new Error('Admin authorization service is not ready. Please try again.');
        const snap = await withTimeout(
          fb.getDoc(fb.doc(fb.db, 'superAdmins', user.uid)),
          8000,
          'Admin authorization check timed out.'
        );
        authorized = snap.exists() && snap.data()?.active === true;
      }

      if(!authorized){
        await fb.signOut(fb.auth);
        throw new Error('This Firebase account is not an authorized CREDENCE admin.');
      }

      setButton(btn, 'Login successful', true);

      const gate = document.getElementById('adminGate');
      const shell = document.getElementById('appShell');
      const who = document.getElementById('adminEmail');
      if(who) who.textContent = user.email || 'Firebase Admin';
      if(gate) gate.style.display = 'none';
      if(shell) shell.style.display = 'block';

      window.__credenceLoginGestureAt = 0;

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

  /* Private stable entry point: legacy inline code cannot replace this name. */
  window.__credenceSecureLogin = login;
  window.__credenceMarkLoginGesture = markUserGesture;
  window.__credenceAuthHardeningLoaded = true;
  window.adminLogin = login;
})();
