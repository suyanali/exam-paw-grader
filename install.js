(()=>{
  let deferredPrompt=null;
  const isStandalone=()=>window.matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
  function ensureButton(){
    if(isStandalone()||document.getElementById('pwaInstallBtn'))return;
    const btn=document.createElement('button');
    btn.id='pwaInstallBtn';btn.className='primary';btn.hidden=true;btn.textContent='安裝 App';
    btn.style.cssText='margin-left:8px;padding:7px 12px';
    const top=document.querySelector('.top');
    if(top){const save=document.getElementById('saveState');top.insertBefore(btn,save||null)}
    else{btn.style.cssText='position:fixed;right:12px;bottom:12px;z-index:9999;padding:12px 18px';document.body.appendChild(btn)}
    btn.addEventListener('click',async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;btn.hidden=true});
  }
  ensureButton();
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ensureButton);
  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;ensureButton();const btn=document.getElementById('pwaInstallBtn');if(btn&&!isStandalone())btn.hidden=false});
  window.addEventListener('appinstalled',()=>{deferredPrompt=null;const btn=document.getElementById('pwaInstallBtn');if(btn)btn.hidden=true});
})();
