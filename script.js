function calculateAttendance() {
  var totalClasses = Number(document.getElementById("totalClasses").value);
  var attendedClasses = Number(document.getElementById("attendedClasses").value);
  var targetPercent = Number(document.getElementById("targetPercent").value);
  var result = document.getElementById("result");

  if (totalClasses <= 0 || attendedClasses < 0 || targetPercent <= 0) {
    result.innerHTML = "Please enter proper values.";
    return;
  }

  if (attendedClasses > totalClasses) {
    result.innerHTML = "Attended classes cannot be more than total classes.";
    return;
  }

  if (targetPercent > 100) {
    result.innerHTML = "Required percentage cannot be more than 100.";
    return;
  }

  var attendance = (attendedClasses / totalClasses) * 100;

  if (targetPercent == 100 && attendance < 100) {
    result.innerHTML = "You cannot reach 100% because some classes are already missed.";
    return;
  }

  var message = "Your current attendance is " + attendance.toFixed(2) + "%.<br>";

  if (attendance >= targetPercent) {
    var canMiss = 0;
    var newAttendance = attendance;

    while (newAttendance >= targetPercent) {
      canMiss = canMiss + 1;
      newAttendance = (attendedClasses / (totalClasses + canMiss)) * 100;
    }

    canMiss = canMiss - 1;
    message = message + "You are safe for now.<br>";
    message = message + "You can miss " + canMiss + " more class(es).";
  } else {
    var needToAttend = 0;
    var improvedAttendance = attendance;

    while (improvedAttendance < targetPercent) {
      needToAttend = needToAttend + 1;
      improvedAttendance = ((attendedClasses + needToAttend) / (totalClasses + needToAttend)) * 100;
    }

    message = message + "Your attendance is low.<br>";
    message = message + "You need to attend " + needToAttend + " more class(es).";
  }

  result.innerHTML = message;
}

function clearForm() {
  document.getElementById("totalClasses").value = "";
  document.getElementById("attendedClasses").value = "";
  document.getElementById("targetPercent").value = "75";
  document.getElementById("result").innerHTML = "Your result will show here.";
}
