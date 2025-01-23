#include <WiFi.h>
#include <HTTPClient.h>

// const char wifiSsid[] = "hotspotBittaSamsungA70";
// const char wifiPassword[] = "Bitta@2000";
const char wifiSsid[] = "hotspotBittaRealme8";
const char wifiPassword[] = "Bitta123";
const String ipAddress = "192.168.167.22";
const char* host = "192.168.167.22";

String url = "http://" + ipAddress + "/bdu-iot-controller/xyz-values.txt";

HTTPClient http;
int isWifiConnected = 0;
WiFiClient client;
int httpPort = 80;

int in1 = 16;  // forward
int in2 = 17;  // backward
int in3 = 18;  // forward
int in4 = 19;  // backward
int enA = 21;
int enB = 22;

int leftIrPin = 13;
int rightIrPin = 14;
int middleIrPin = 15;
int frontIrPin = 26;
int rightIr = 0;
int leftIr = 0;
int trayIrPin = 27;

int pwmChannelEnA = 0;
int frequenceEnA = 1000;
int resolutionEnA = 8;
int pwmChannelEnB = 0;
int frequenceEnB = 1000;
int resolutionEnB = 8;

int mode = 1;  // 1.Wait for cmd, 2.Go to table, 3.Back to kitchen
int tableCheckPoint = 0;
int tableNo = 0;


void setup() {
  Serial.begin(115200);
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  pinMode(in3, OUTPUT);
  pinMode(in4, OUTPUT);
  pinMode(leftIrPin, INPUT);
  pinMode(rightIrPin, INPUT);
  pinMode(middleIrPin, INPUT);
  pinMode(frontIrPin, INPUT);
  pinMode(trayIrPin, INPUT);

  ledcSetup(pwmChannelEnA, frequenceEnA, resolutionEnA);
  ledcAttachPin(enA, pwmChannelEnA);
  ledcWrite(pwmChannelEnA, 175);
  ledcSetup(pwmChannelEnB, frequenceEnB, resolutionEnB);
  ledcAttachPin(enB, pwmChannelEnB);
  ledcWrite(pwmChannelEnB, 175);

  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, LOW);

  WiFi.begin(wifiSsid, wifiPassword);
  Serial.println("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  http.begin(url);
  int httpCode = http.GET();
  if (httpCode > 0 && httpCode == HTTP_CODE_OK) isWifiConnected = 1;
}

void loop() {
  if (isWifiConnected) {
    if (mode == 1) {
      http.begin(url);
      int httpCode = http.GET();
      String cmd = http.getString();
      (cmd == "1") ? tableNo = 1 : (cmd == "2") ? tableNo = 2
                                 : (cmd == "3") ? tableNo = 3
                                 : (cmd == "4") ? tableNo = 4
                                                : tableNo = 0;
      (tableNo == 1 || tableNo == 2) ? tableCheckPoint = 1 : tableCheckPoint = 2;
      (tableNo == 0) ? mode = 1 : mode = 2;
      Serial.printf("cmd : %s, table no : %d\n", cmd, tableNo);
      delay(1000);
    }  // if --> mode==1

    // ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊

    else if (mode == 2) {
      // updateFoodOrderReceiveStatus(1);
      sendChat(String("Command received, table no ") + tableNo + ("."));
      turnBackward();
      goForward();
      while (!(!readRightIr() && !readLeftIr())) goForward();
      miniStop();
      if (tableNo == 3 || tableNo == 4) {
        forward();
        delay(300);
        while (!(!readRightIr() && !readLeftIr())) goForward();
        miniStop();
      }
      if (tableNo == 1 || tableNo == 3) turnRight();
      else turnLeft();
      goForward();
      while (!(!readRightIr() && !readLeftIr())) goForward();
      stop();
      sendChat(String("Reached properly, at table no ") + tableNo + ("."));
      delay(3000);
      sendChat("Please, received my food.");
      while(readTrayIr());
      delay(1000);
      mode = 3;
    }  // if --> mode==2

    // ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊

    if (mode == 3) {
      // updateFoodOrderReceiveStatus(2);
      sendChat("Now, I am backing to kitchen.");
      turnBackward();
      goForward();
      while (!(!readRightIr() && !readLeftIr())) goForward();
      miniStop();
      if (tableNo == 1 || tableNo == 3) turnLeft();
      else turnRight();
      goForward();
      while (!(!readRightIr() && !readLeftIr())) goForward();
      miniStop();
      if (tableNo == 3 || tableNo == 4) {
        forward();
        delay(200);
        goForward();
        while (!(!readRightIr() && !readLeftIr())) goForward();
        stop();
        reset();
      } else {
        stop();
        reset();
      }
    }  // if --> mode==3
  }    // if --> (isWifiConnected)
}  //loop

// ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊

int readRightIr() {
  return !(digitalRead(rightIrPin));
}

int readLeftIr() {
  return !(digitalRead(leftIrPin));
}

int readMiddleIr() {
  return !(digitalRead(middleIrPin));
}
int readFrontIr() {
  return !(digitalRead(frontIrPin));
}
int readTrayIr() {
  return !(digitalRead(trayIrPin));
}

void reset() {
  mode = 1;
  tableCheckPoint = 0;
  tableNo = 0;
  sendChat("Successfully back to kitchen.");
}

void forward() {
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);
  digitalWrite(in3, HIGH);
  digitalWrite(in4, LOW);
}

void backward() {
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);
}

void right() {
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  digitalWrite(in3, HIGH);
  digitalWrite(in4, LOW);
}

void left() {
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);
}

void stop() {
  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, LOW);
}

void goForward() {
  if (readFrontIr()) {
    stop();
    sendChat("Please, move form my path.");
  } else {
    (readLeftIr() && !readRightIr())   ? right()
    : (!readLeftIr() && readRightIr()) ? left()
                                       : forward();
  }
}

void turnRight() {
  while (readMiddleIr()) goForward();
  right();
  while (readRightIr()) right();
}

void turnLeft() {
  while (readMiddleIr()) goForward();
  left();
  while (readLeftIr()) left();
}

void turnBackward() {
  right();
  delay(1000);
  while (readRightIr()) right();
}

void miniStop() {
  stop();
  delay(300);
}

void sendChat(String msg) {
  while (!client.connect(host, httpPort));
  msg.replace(" ", "%20");
  client.print(String("GET http://") + host + ("/bdu-iot-controller/chatQuery.php?cmd=chatInsert&&msg=") + msg + ("&&who=robot") + " HTTP/1.1\r\n" + "Host: " + host + "\r\n" + "Connection: close\r\n\r\n");
  delay(500);
}

// void updateFoodOrderReceiveStatus(int val) {
//   while (!client.connect(host, httpPort));
//   client.print(String("GET http://") + host + ("/bdu-iot-controller/cmd.php?cmd=updateFoodOrderReceiveStatus&&val=") + val + ("&&tableNo=tableNo") + " HTTP/1.1\r\n" + "Host: " + host + "\r\n" + "Connection: close\r\n\r\n");
//   delay(500);
// }