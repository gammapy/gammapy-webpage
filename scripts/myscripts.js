
function TodayDate() {
  const dateObj = new Date();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
}

function initFooterScripts() {
  console.log("initFooterScripts called");
  const todayDateElement = document.getElementById("TodayDate");
  if (todayDateElement) {
    todayDateElement.textContent = TodayDate();
  } else {
    console.error("TodayDate element not found in footer");
  }
}

window.initFooterScripts = initFooterScripts; // Make it globally accessible
