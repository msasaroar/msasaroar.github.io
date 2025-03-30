var gtmCode = "GTM-WW333VDN";
console.log(gtmCode);

//===========================================================================
function openFile(fileName) {
    if (fileName) {
      window.location.href = fileName;
    } else {
      alert("Please select a file first.");
    }
  alert("Finction openFile");
  }
  
//===========================================================================
  function navigateToURL(recommendedEventName) {
    const baseURL = "https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtm#";
    const finalURL = baseURL + recommendedEventName;
    window.location.href = finalURL;
}

//===========================================================================
function loadScript() {
  const script = document.createElement('script');
  script.src = 'script.js';
  document.body.appendChild(script); // Append the script to the body
}

// Get today's date and time
function formatDate() {
  const today = new Date();
  return today.toLocaleDateString(); // Formats the date
}

function formatTime() {
  const today = new Date();
  return today.toLocaleTimeString(); // Formats the time
}