var runSpeechRecognition = () => {
  var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  console.log(recognition);
  recognition.onstart = () => {
    display("listening-icon", "b");
    display("startSreakingBtn", "n");
  };
  recognition.onspeechend = () => {
    display("listening-icon", "n");
    display("startSreakingBtn", "b");
  };
  recognition.onresult = (event) => {
    var transcript = event.results[0][0].transcript;
    // var confidence = event.results[0][0].confidence;
    log("transcript : " + transcript);
    transcript = transcript.toLowerCase();

    let cmd = "";
    if (transcript == "right") {
      $("#output-result-for-voice-control-panel").text("Right");
      cmd = "R";
    } else if (transcript == "left") {
      $("#output-result-for-voice-control-panel").text("Left");
      cmd = "L";
    } else if (transcript == "forward" || transcript == "for what") {
      $("#output-result-for-voice-control-panel").text("Forward");
      cmd = "F";
    } else if (transcript == "backward") {
      $("#output-result-for-voice-control-panel").text("Backward");
      cmd = "B";
    } else {
      $("#output-result-for-voice-control-panel").text("Stop");
      cmd = "S";
    }
    $.ajax({
      url: domain + "/value-write.php",
      method: "POST",
      data: {
        cmd: cmd,
      },
    }); //ajax
  };
  recognition.start();
};
