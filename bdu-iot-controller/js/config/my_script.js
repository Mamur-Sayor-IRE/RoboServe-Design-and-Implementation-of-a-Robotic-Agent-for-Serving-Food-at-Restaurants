var in_opts_a = (opt_div) => {
  $("#" + opt_div).css("display", "block");
};

var in_opts_d = (opt_div) => {
  setTimeout(() => {
    $("#" + opt_div).css("display", "none");
  }, 250);
};

var in_opt_select = (input_field, value) => {
  $("#" + input_field).val(value);
};
// --------------------------------------------------
var InputboxesCanceliconOpacity = (inputId, iconId, event) => {
  if (event == "blur") {
    setTimeout(() => {
      if (
        $("#" + inputId)
          .val()
          .trim()
      )
        display(iconId, "b");
      else display(iconId, "n");
    }, 500);
  } else if (event == "click") {
    $("#" + inputId).val("");
    display(iconId, "n");
  }
};
// --------------------------------------------------
var DatetimeInputboxesCanceliconOpacity = (inputId, iconId, event) => {
  if (event == "focus") {
    let input = $("#" + inputId);
    input.get(0).type = "datetime-local";
    display(iconId, "n");
  } else if (event == "blur") {
    setTimeout(() => {
      let input = $("#" + inputId);
      if (input.val().trim()) {
        display(iconId, "b");
      } else {
        input.get(0).type = "text";
        display(iconId, "n");
      }
    }, 500);
  } else if (event == "click") {
    display(iconId, "n");
    let input = $("#" + inputId);
    input.val("");
    input.get(0).type = "text";
  }
};
// --------------------------------------------------
var in_reset = (array) => {
  array.forEach((id) => {
    $("#" + id).val("");
  });
};
// --------------------------------------------------
var textarea_height_auto_fit = (textarea_id, top_bottom_padding) => {
  let a = document.getElementById(textarea_id);
  a.style.height = 0;
  a.style.height = a.scrollHeight - top_bottom_padding + "px";
};
// --------------------------------------------------
/*
    Usage :
    -- <textarea oninput="textarea_auto_height(this)">...</textarea>
    -- row attribute not allowed.
    -- height must be set in css.
    */
var textarea_auto_height = (element) => {
  element.style.height = "5px";
  element.style.height = element.scrollHeight + "px";
};

// --------------------------------------------------
var IndexOf = (string, subString, nth_index) => {
  let idx = string.split(subString, nth_index).join(subString).length;
  if (idx == string.length) return -1;
  else return idx;
};
// --------------------------------------------------

var Json_SearchColumn = (obj, column, searchVal) => {
  let results = [];
  for (let i = 0; i < obj.length; i++) {
    if (obj[i][column].toLowerCase().search(searchVal.toLowerCase()) != -1) {
      results.push(obj[i]);
    }
  }
  return results;
};
// --------------------------------------------------

var JsonSearchTotalResult = (obj, column, searchVal) => {
  let total = 0;
  for (let i = 0; i < obj.length; i++) {
    // if (obj[i][column].toLowerCase().search(searchVal.toLowerCase()) != -1) {
    // For exact match
    if (obj[i][column].search(searchVal) != -1) {
      total++;
    }
  }
  return total;
};

// --------------------------------------------------
var display = (id, cmd) => {
  if (cmd == "n") $(`#${id}`).css("display", "none");
  else if (cmd == "b") $(`#${id}`).css("display", "block");
  else if (cmd == "f") $(`#${id}`).css("display", "flex");
  else if (cmd == "vh") $(`#${id}`).css("visibility", "hidden");
  else if (cmd == "vv") $(`#${id}`).css("visibility", "visible");
};
// --------------------------------------------------

/**
 * var to= sort HTML DIV
 * Structure must be define into <ul><li data-sort=""></li></ul>
 * var call= example : SortHtmlDiv("#Container_id .block[data-sort]", "#Container_id");
 */
var comparator = (a, b) => {
  if (a.dataset.sort < b.dataset.sort) return -1;
  if (a.dataset.sort > b.dataset.sort) return 1;
  return 0;
};

var SortHtmlDiv = (id, container_id) => {
  var subjects = document.querySelectorAll(id + "[data-sort]");
  var subjectsArray = Array.from(subjects);
  let sorted = subjectsArray.sort(comparator);
  sorted.forEach((e) => document.querySelector(container_id).appendChild(e));
};

// --------------------------------------------------
var ShowPassword = (CheckboxID, InputId) => {
  let Checkbox = $("#" + CheckboxID);
  let InputPassword = $("#" + InputId);
  if (Checkbox.prop("checked")) InputPassword.get(0).type = "text";
  else InputPassword.get(0).type = "password";
};
// --------------------------------------------------
var GetSelectedText = () => {
  if (window.getSelection) {
    txt = window.getSelection();
  } else if (window.document.getSelection) {
    txt = window.document.getSelection();
  } else if (window.document.selection) {
    txt = window.document.selection.createRange().text;
  }
  let HandleFormat = "-" + txt;
  $SelectedText = HandleFormat.substring(1);
  $SelectedTextStartIndex = txt.anchorOffset;
  $SelectedTextEndIndex = txt.focusOffset;
};
// onmouseup="GetSelectedText()"
// --------------------------------------------------
// Remove text format when it will paste into contenteditable type div.
/*
var ContentEditableDiv = document.querySelector("[contenteditable]");
ContentEditableDiv.addEventListener("paste", (e) => {
  e.preventDefault();
  var text = e.clipboardData.getData("text/plain");
  document.execCommand("insertText", false, text);
});
*/
// --------------------------------------------------
var SetTextFormat = (cmd) => {
  if (cmd == "createLink") document.execCommand(cmd, false, $SelectedText);
  else document.execCommand(cmd, false, null);
};
// --------------------------------------------------

var labelFixOfTextareaFocus = (labelId, top, fontSize) => {
  $("#" + labelId).css({
    top: top + "px",
    "font-size": fontSize + "px",
  });
};
// ----
var labelFixOfTextareaBlur = (
  inputId,
  labelId,
  top1,
  fontSize1,
  top2,
  fontSize2
) => {
  if (
    $("#" + inputId)
      .text()
      .trim()
  )
    $("#" + labelId).css({
      top: top1 + "px",
      "font-size": fontSize1 + "px",
    });
  else
    $("#" + labelId).css({
      top: top2 + "px",
      "font-size": fontSize2 + "px",
    });
};
/*
Function call example
labelFixOfTextarea("labelOfInstructionInputOfCreateClassFormModal",10,16);
labelFixOfTextarea(this.id,"labelOfInstructionInputOfCreateClassFormModal",10,16,20,18);
*/
// --------------------------------------------------

var PrintDT = (datetime, format) => {
  let t = datetime.split(/[- :]/);
  let d = new Date(t[0], t[1], t[2], t[3], t[4], t[5]);
  let months2 = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let Day = days[d.getDay()];

  let D = d.getDate();
  let M = d.getMonth() - 1;
  let Y = d.getFullYear();
  let h = d.getHours();
  let m = d.getMinutes();
  if (m < 10) m = `0${m}`;
  let s = d.getSeconds();
  let ampm = "AM";
  if (h > 12) {
    h = h - 12;
    ampm = "PM";
  }
  if (format == "f1")
    return `${h}:${m} ${ampm}, ${D} ${months2[M]} ${Y}`; // 8:01 PM, 14 Jan 2023
  else if (format == "f2")
    return `${h}:${m} ${ampm}, ${D}/${M}/${Y.toString().substring(2)}`;
  // 8:01 PM, 14/01/23
  else if (format == "f3")
    return `${Day}, ${months2[M]} ${D}`; // 8:01 PM, 14/01/23
  else if (format == "f4") return `${h}:${m} ${ampm}, ${D} ${months2[M]}`; // 8:01 PM, 14 Jan
};

// --------------------------------------------------
var scrollToBottom = (id) => {
  let element = document.getElementById(id);
  element.scrollTop = element.scrollHeight;
};
// --------------------------------------------------
