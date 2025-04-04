let selectedTabId = null;

// Function to refresh the selected tab
function refreshSelectedTab() {
    if (!selectedTabId) return;

    // Define random interval between 5 and 20 minutes
    let minTime = 300000;  // 5 minutes in milliseconds (5 * 60 * 1000)
    let maxTime = 1200000; // 20 minutes in milliseconds (20 * 60 * 1000)
    let randomDelay = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;

    // Prepare the next refresh time message
    let nextRefreshTime = new Date(Date.now() + randomDelay);
    let message = `Next refresh will occur at: ${nextRefreshTime.toLocaleTimeString()} (in ${(randomDelay / 1000 / 60).toFixed(2)} minutes)`;

    // Send message to content script to display the message
    chrome.tabs.sendMessage(selectedTabId, { action: "showMessage", message: message });

    // Schedule the next refresh
    setTimeout(() => {
        chrome.tabs.reload(selectedTabId, {}, refreshSelectedTab);
    }, randomDelay);
}

// Listen for messages from popup or other scripts to set the tab ID
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "setTab") {
        selectedTabId = message.tabId;
        console.log(`Selected tab: ${selectedTabId}`);
        refreshSelectedTab();
    }
});