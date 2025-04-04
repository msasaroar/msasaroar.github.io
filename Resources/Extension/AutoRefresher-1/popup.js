document.addEventListener("DOMContentLoaded", function () {
    let tabSelect = document.getElementById("tabSelect");
    let startRefreshBtn = document.getElementById("startRefresh");

    // ব্রাউজারের সব ওপেন ট্যাব লোড করুন
    chrome.tabs.query({}, function (tabs) {
        tabs.forEach(tab => {
            let option = document.createElement("option");
            option.value = tab.id;
            option.textContent = tab.title;
            tabSelect.appendChild(option);
        });
    });

    startRefreshBtn.addEventListener("click", function () {
        let selectedTabId = parseInt(tabSelect.value);
        chrome.runtime.sendMessage({ action: "setTab", tabId: selectedTabId });
    });
});
