
//    <script src="601-2-JavaScript.js"></script>
//    <button onclick="navigateToURL()">Show Google Reference</button>

function navigateToURL(recommendedEventName) {
    const baseURL = "https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtm#";
    const finalURL = baseURL + recommendedEventName;
    window.location.href = finalURL;
}




