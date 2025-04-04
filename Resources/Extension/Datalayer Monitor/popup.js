document.addEventListener("DOMContentLoaded", function () {
    const eventList = document.getElementById("event-list");
    const settingsBtn = document.getElementById("settings-btn");

    settingsBtn.addEventListener("click", function () {
        window.location.href = "settings.html";
    });

    // Clear event list on reload
    eventList.innerHTML = "";  

    chrome.storage.local.get("logs", function (data) {
        if (data.logs) {
            data.logs.reverse().forEach((log, index) => {
                const eventDiv = document.createElement("div");
                eventDiv.classList.add("event-item");
                eventDiv.innerHTML = `
                    <div class="event-header">
                        <span><b>${index + 1}</b> ${log.data[0].event}</span>
                        <button class="expand-btn">▼</button>
                    </div>
                    <div class="event-body" style="display: none;">
                        <pre>${JSON.stringify(log.data[0], null, 2)}</pre>
                    </div>
                `;
                eventList.appendChild(eventDiv);

                // Toggle expand/collapse
                const expandBtn = eventDiv.querySelector(".expand-btn");
                const eventBody = eventDiv.querySelector(".event-body");

                expandBtn.addEventListener("click", function () {
                    document.querySelectorAll(".event-body").forEach(body => {
                        if (body !== eventBody) {
                            body.style.display = "none";
                        }
                    });
                    eventBody.style.display = eventBody.style.display === "none" ? "block" : "none";
                });
            });
        }
    });
});
