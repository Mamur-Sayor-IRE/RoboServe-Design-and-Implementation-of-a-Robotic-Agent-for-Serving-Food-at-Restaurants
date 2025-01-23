var tableSelectionBtn = (cmd) => {
  let chk1 = $("#checkbox-for-table-selection-control");
  if (!chk1.prop("checked")) cmd = 0;
  log("cmd : " + cmd);
  $.ajax({
    url: domain + "/value-write.php",
    method: "POST",
    data: {
      cmd: cmd,
    },
    success: () => {
      if (cmd != 0) {
        setTimeout(() => {
          tableSelectionBtn(0);
          $("#result-for-table-selection-control").text(".....");
        }, 10000);

        if (cmd == 1) $("#result-for-table-selection-control").text("Table 1");
        else if (cmd == 2)
          $("#result-for-table-selection-control").text("Table 2");
        else if (cmd == 3)
          $("#result-for-table-selection-control").text("Table 3");
        else if (cmd == 4)
          $("#result-for-table-selection-control").text("Table 4");

        $.ajax({
          url: domain + "/chatQuery.php",
          method: "GET",
          data: { cmd: "chatInsert", msg: `Go to table no ${cmd}.`, who: "me" },
          success: (res) => {
            if (res != "success") log(res);
          }, //success
        }); //ajax
      }
    },
  }); //ajax

  if (cmd == 0) $("#result-for-table-selection-control").text(".....");
};
