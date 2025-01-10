//===========================================================================
function openFile(fileName) {
    if (fileName) {
      window.location.href = fileName;
    } else {
      alert("Please select a file first.");
    }
  }
  
//===========================================================================
  function navigateToURL(recommendedEventName) {
    const baseURL = "https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtm#";
    const finalURL = baseURL + recommendedEventName;
    window.location.href = finalURL;
}




