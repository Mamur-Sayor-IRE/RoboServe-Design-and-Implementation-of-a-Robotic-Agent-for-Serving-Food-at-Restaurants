var btnConnectNowOfXamppConfigurationPanel = () => {
  let inp = $("#ipAddressInputOfXamppConfigurationPanel").val().trim();
  if (!inp) alert("No ip address found");
  {
    display("btnConnectNowOfXamppConfigurationPanel", "n");
    display("btnConnectNowLoadingOfXamppConfigurationPanel", "f");
    $.ajax({
      url: `https://${inp}/bdu-iot-controller/xampp-configuration.php`,
      success: (res) => {
        if (res == "success") {
          domain = `https://${inp}/bdu-iot-controller`;
          update_url("controller-mode");
        } else alert("Connection failed");
        display("btnConnectNowOfXamppConfigurationPanel", "b");
        display("btnConnectNowLoadingOfXamppConfigurationPanel", "n");
      }, //success
      error: () => {
        alert("Connection failed");
        display("btnConnectNowOfXamppConfigurationPanel", "b");
        display("btnConnectNowLoadingOfXamppConfigurationPanel", "n");
      },
    }); //ajax
  }
};
