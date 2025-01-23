var ButtonTouch = (cmd) => {
  let chk2 = $("#checkbox-for-manual-control");
  if (chk2.prop("checked")) {
    if (cmd == "F") $("#result-for-manual-control").text("Forward");
    if (cmd == "B") $("#result-for-manual-control").text("Backward");
    if (cmd == "L") $("#result-for-manual-control").text("Left");
    if (cmd == "R") $("#result-for-manual-control").text("Right");
    if (cmd == "S") $("#result-for-manual-control").text("Stop");
    $.ajax({
      url: domain + "/value-write.php",
      method: "POST",
      data: {
        cmd: cmd,
      },
    }); //ajax
  } else if (cmd == "S") $("#result-for-manual-control").text("Stop");
};
