(function () {
    if (!window.dataLayer) {
      console.warn("dataLayer not found.");
      return;
    }
  
    console.log("DataLayer found, monitoring pushes...");
  
    const originalPush = window.dataLayer.push;
    window.dataLayer.push = function (...args) {
      originalPush.apply(window.dataLayer, args);
      console.log("New dataLayer push detected:", args);
  
      window.postMessage({ type: "DATA_LAYER_PUSH", data: args }, "*");
    };
  })();
  