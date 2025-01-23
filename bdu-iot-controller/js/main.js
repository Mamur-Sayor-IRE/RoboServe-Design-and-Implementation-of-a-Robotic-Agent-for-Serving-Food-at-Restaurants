var log = console.log;
// ⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤
if (!mobileCheck()) $("body").css("zoom", "0.7");
// ⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤
var iterative = () => {
  let checkBoxId = [
    "checkbox-for-gesture-control",
    "checkbox-for-manual-control",
    "checkbox-for-table-selection-control",
  ];
  checkBoxId.forEach((id) => {
    if ($("#" + id).prop("checked")) $("#" + id).prop("checked", false);
  });
};
// ⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤
var htmlInclude = () => {
  let Panel = [
    "firstPanel",
    "secondPanel",
    "gestureControl",
    "buttonControl",
    "voiceControl",
    "tableSelection",
    "chatWithRobot",
    "viewOrder",
  ];

  Panel.forEach((fileName) => {
    $.ajax({
      url: `./html/${fileName}.html`,
      success: (res) => {
        $("#rootFrame").append(res);
      },
      error: () => {
        log("File not found");
      },
    }); //ajax
  });
};
// ⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤
var panelSwitch = (id) => {
  $("#rootFrame .visible").removeClass("visible");
  $("#" + id).addClass("visible");
};
// ⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤
setInterval(() => {
  $.ajax({
    url: "cmd.php",
    method: "POST",
    data: { cmd: "readViewOrder" },
    success: (res) => {
      $("#viewOrderContainer").html(res);
    }, //success
  }); //ajax
}, 3000);
// ⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤⏤
