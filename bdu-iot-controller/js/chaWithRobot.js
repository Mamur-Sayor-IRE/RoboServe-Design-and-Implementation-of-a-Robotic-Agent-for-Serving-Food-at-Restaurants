var loadOnceAllChatData = false;
var lastChatId = 0;

(() => {
  if (!loadOnceAllChatData) {
    loadOnceAllChatData = true;
    setTimeout(() => {
      $.ajax({
        url: domain + "/chatQuery.php",
        method: "POST",
        data: { cmd: "readAllChatData" },
        success: (res) => {
          if (res) {
            let HtmlData = "";
            let data = JSON.parse(res);
            for (let i = 0; i < data.length; i++) {
              let msg = data[i]["msg"];
              let who = data[i]["who"];
              let dateTime = data[i]["dateTime"];
              let id = data[i]["id"];
              lastChatId = id;
              dateTime = PrintDT(dateTime, "f4");
              if (who == "me") {
                HtmlData += `
                    <div class="block">
                    <img src="./res/img/other_img/user.jpg" alt="image">
                    <div class="msg">
                          <p class="txt1 left">Me • ${dateTime}</p>
                          <pre class="txt2" style="background: #007bff">${msg}</pre>
                          </div>
                  </div>
          `;
              } else {
                HtmlData += `
          <div class="block">
                      <div class="msg">
                          <p class="txt1 right">Waiter robot • ${dateTime}</p>
                          <pre class="txt2" style="background: #fd7e14">${msg}</pre>
                      </div>
                      <img src="./res/img/other_img/user.jpg" alt="image">
                  </div>
          `;
              }
            } // for
            $("#allMessageContainerOfChatWithRobotPanel").html(HtmlData);
          }
        }, //success
      }); //ajax

      setInterval(() => {
        // log("Read last chat msg...");
        $.ajax({
          url: domain + "/chatQuery.php",
          method: "POST",
          data: { cmd: "getLastChatMsg" },
          success: (res) => {
            if (res) {
              let HtmlData = "";
              let data = JSON.parse(res);
              let msg = data[0]["msg"];
              let who = data[0]["who"];
              let dateTime = data[0]["dateTime"];
              dateTime = PrintDT(dateTime, "f4");
              let id = data[0]["id"];
              if (lastChatId != id) {
                lastChatId = id;
                if (who == "me") {
                  HtmlData += `
                        <div class="block">
                        <img src="./res/img/other_img/user.jpg" alt="image">
                        <div class="msg">
                              <p class="txt1 left">Me • ${dateTime}</p>
                              <pre class="txt2" style="background: #007bff">${msg}</pre>
                              </div>
                      </div>
              `;
                } else {
                  HtmlData += `
              <div class="block">
                          <div class="msg">
                              <p class="txt1 right">Waiter robot • ${dateTime}</p>
                              <pre class="txt2" style="background: #fd7e14">${msg}</pre>
                          </div>
                          <img src="./res/img/other_img/user.jpg" alt="image">
                      </div>
              `;
                }
                $("#allMessageContainerOfChatWithRobotPanel").append(HtmlData);
                if (who != "me") textToSpeech(msg);
              } //if(lastChatId != id)
            } //res
          }, //success
        }); //ajax
      }, 500);

      setInterval(() => {
        scrollToBottom("allMessageContainerOfChatWithRobotPanel");
      }, 500);
    }, 500);
  }
})();

// ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊

var tableSelectionBtn2 = (cmd) => {
  let chk1 = $("#checkbox-for-table-selection-control");
  chk1.prop("checked", true);
  setTimeout(() => {
    tableSelectionBtn(cmd);
  }, 500);
};

// ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊

var voiceChatSend = () => {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  console.log(recognition);
  recognition.onstart = () => {
    display("listeningIcon2", "b");
    display("startSreakingBtn2", "n");
  };
  recognition.onspeechend = () => {
    display("listeningIcon2", "n");
    display("startSreakingBtn2", "b");
  };
  recognition.onresult = (event) => {
    var transcript = event.results[0][0].transcript;
    log("transcript : " + transcript);
    t = transcript.toLowerCase();

    let cmd = "";
    if (
      t == "go to table No 21" ||
      t == "go to table No 1" ||
      t == "go to table Number 1" ||
      t == "go to table long one" ||
      t == "go to table no 1"
    ) {
      cmd = "1";
    } else if (
      t == "go to table no 2" ||
      t == "go to table naam to" ||
      t == "go to travel long to" ||
      t == "go to te belong to" ||
      t == "go to table noun to" ||
      t == "go to table long 2" ||
      t == "go to table long to"
    ) {
      cmd = "2";
    } else if (
      t == "go to table no 3" ||
      t == "go to table number 3" ||
      t == "go to table 93" ||
      t == "go to travel long 3" ||
      t == "go to table long 3" ||
      t == "go to terminal 3" ||
      t == ""
    ) {
      cmd = "3";
    } else if (
      t == "go to table no 4" ||
      t == "go to table known for" ||
      t == "go to table now for" ||
      t == "go to temple known for" ||
      t == "go to table 94" ||
      t == "go to travel long for" ||
      t == "go to table long 4"
    ) {
      cmd = "4";
    } else {
      alert("cmd : " + cmd + ", t=" + t);
      cmd = "0";
    }
    $.ajax({
      url: domain + "/value-write.php",
      method: "POST",
      data: {
        cmd: cmd,
      },
      success: () => {
        setTimeout(() => {
          $.ajax({
            url: domain + "/value-write.php",
            method: "POST",
            data: {
              cmd: 0,
            },
          }); //ajax
        }, 10000);
      },
    }); //ajax

    if (cmd != 0) {
      $.ajax({
        url: domain + "/chatQuery.php",
        method: "GET",
        data: { cmd: "chatInsert", msg: `Go to table no ${cmd}.`, who: "me" },
        success: (res) => {
          if (res != "success") log(res);
        }, //success
      }); //ajax
    }
  };
  recognition.start();
};

// ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊
var isSpeaking = true;
var textToSpeech = (msg) => {
  let synth = window.speechSynthesis;
  let text = msg;

  if (!synth.speaking && text) {
    let utternace = new SpeechSynthesisUtterance(text);
    synth.speak(utternace);
  }

  if (text.length > 50) {
    if (synth.speaking && isSpeaking) {
      //   button.innerText = "Pause";
      synth.resume();
      isSpeaking = false;
    } else {
      //   button.innerText = "Resume";
      synth.pause();
      isSpeaking = true;
    }
  } else {
    isSpeaking = false;
    // button.innerText = "Speaking";
  }

  setInterval(() => {
    if (!synth.speaking && !isSpeaking) {
      isSpeaking = true;
      //   button.innerText = "Convert to Speech";
    }
  });
};
// ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊
