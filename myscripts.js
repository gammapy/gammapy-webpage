
function TodayDate(){
  let dateObj = new Date();
  let month = String(dateObj.getMonth() + 1).padStart(2, '0');
  let day = String(dateObj.getDate()).padStart(2, '0');
  let year = dateObj.getFullYear();
  let output = day + '/' + month + '/' + year;

  // Insert date and time into HTML
  return output

}
document.getElementById("TodayDate").innerHTML = TodayDate();
  
