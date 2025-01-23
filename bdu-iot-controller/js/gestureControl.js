window.addEventListener("deviceorientation", function (e) {
  let chk1 = $("#checkbox-for-gesture-control");
  if (chk1.prop("checked")) {
    let x = Math.round(e.beta);
    let y = Math.round(e.gamma);
    let z = Math.round(e.alpha);
    let cmd = "";
    if (y > 30) {
      $("#result-for-gesture-control").text("Right");
      cmd = "R";
    } else if (y < -40) {
      $("#result-for-gesture-control").text("Left");
      cmd = "L";
    } else if (x < -10) {
      $("#result-for-gesture-control").text("Forward");
      cmd = "F";
    } else if (x > 40) {
      $("#result-for-gesture-control").text("Backward");
      cmd = "B";
    } else {
      $("#result-for-gesture-control").text("Stop");
      cmd = "S";
    }
    $.ajax({
      url: domain + "/value-write.php",
      method: "POST",
      data: {
        cmd: cmd,
      },
    }); //ajax
  } //if | checkedbox checked
  else {
    $("#result-for-gesture-control").text("Stop");
    cmd = "S";
  }
});
