if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/service_worker.js',{scope:"/"}).then(reg=>{
    console.log('service_workeris register in external file');
  })
 .catch(error=>{
   console.log('service worker is failed in external file');
 });
  }
  
