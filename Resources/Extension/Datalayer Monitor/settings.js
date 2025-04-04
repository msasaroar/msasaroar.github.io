document.addEventListener("DOMContentLoaded", function () {
    const backBtn = document.getElementById("back-btn");
    const saveBtn = document.getElementById("save-btn");
    const jsonToggle = document.getElementById("json-mode-toggle");

    chrome.storage.sync.get("jsonMode", function (data) {
        jsonToggle.checked = data.jsonMode || false;
    });

    saveBtn.addEventListener("click", function () {
        chrome.storage.sync.set({ jsonMode: jsonToggle.checked }, function () {
            alert("Settings saved!");
        });
    });

    backBtn.addEventListener("click", function () {
        window.location.href = "popup.html";
    });
});
