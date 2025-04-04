// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "showMessage") {
        // Create a div to show the message on the page (in the corner)
        let messageDiv = document.createElement('div');
        messageDiv.style.position = 'fixed';
        messageDiv.style.bottom = '10px';
        messageDiv.style.left = '10px';
        messageDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        messageDiv.style.color = 'white';
        messageDiv.style.padding = '10px';
        messageDiv.style.fontSize = '16px';
        messageDiv.style.zIndex = '9999';
        messageDiv.textContent = message.message;

        document.body.appendChild(messageDiv);

        // Also log the message in the console
        console.log(message.message);

        // Optionally, remove the message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 10000);
    }
});
