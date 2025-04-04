function injectScript(file) {
    const script = document.createElement("script");
    script.src = chrome.runtime.getURL(file);
    script.onload = function () {
        this.remove(); // Remove the script after execution
    };
    document.documentElement.appendChild(script);
}

// Inject `injected.js` into the actual page
injectScript("injected.js");

window.addEventListener("message", function (event) {
    if (event.source !== window || !event.data || event.data.type !== "DATA_LAYER_PUSH") {
        return;
    }

    chrome.storage.local.get({ logs: [] }, function (data) {
        const logs = data.logs;
        logs.push({ time: new Date().toISOString(), data: event.data.data });
        chrome.storage.local.set({ logs: logs.slice(-50) }); // Keep last 50 logs
    });
});
