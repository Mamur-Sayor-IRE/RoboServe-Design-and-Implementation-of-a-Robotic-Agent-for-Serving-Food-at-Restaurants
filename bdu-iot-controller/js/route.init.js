/*
-- update_url(path)
-- route(event)
-- handleLocation()
*/

// ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊

var update_url = (path) => {
  let new_url = `${domain}/${path}`;
  $("#a-href").attr("href", new_url);
  setTimeout(() => $("#a-href").click(), 50);
};

// ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊

var route = (event) => {
  event = event || window.event;
  event.preventDefault();

  let PresentUrl = window.location.href;
  let ClickedUrl = event.target.href;
  if (PresentUrl != ClickedUrl) window.history.pushState({}, "", ClickedUrl); // Prevent duplicate url push

  // handleLocation();
  GoToLocation();
};

// ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊

// handleLocation();

// ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊

var GoToLocation = () => {
  iterative();
  let Url = window.location.href;
  let ActualPath = Url.substring(IndexOf(Url, "/", 4) + 1);

  let search = (str) => {
    if (ActualPath.search(str) != -1) return true;
    else false;
  };

  if (ActualPath.indexOf("?") == -1) {
    if (search("xampp-configuration")) panelSwitch("firstPanel");
    else if (search("controller-mode")) panelSwitch("secondPanel");
    else if (search("gesture-control")) panelSwitch("gestureControlPanel");
    else if (search("button-control")) panelSwitch("buttonControlPanel");
    else if (search("voice-control")) panelSwitch("voiceControlPanel");
    else if (search("table-selection")) panelSwitch("tableSelectionPanel");
    else if (search("chat-with-robot")) panelSwitch("chatWithRobotPanel");
    else if (search("view-order")) panelSwitch("viewOrderPanel");
  }
};

// ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊

// Browser back btn event
// window.onpopstate = handleLocation;
window.onpopstate = GoToLocation;
// window.route = route;
