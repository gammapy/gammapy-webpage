
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



theDate();

function dateHere() {
    var date = new Date();
    var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    var currentDate = date.getDate();
    var month = months[date.getMonth()];
    var year = date.getFullYear();

    var todaysDate = document.getElementById("dateHere").innerHTML = month + "/" + 
currentDate + "/" + year;
}
  
