/* CREDENCE AUTH HARDENING
   Firebase admin login is implemented directly in index.html.
   Do not override window.adminLogin here: older versions wrapped it a
   second time and could hide Firebase's real error or interfere with login.
*/
(function(){
  'use strict';
  window.__credenceAuthHardeningLoaded = true;
})();
