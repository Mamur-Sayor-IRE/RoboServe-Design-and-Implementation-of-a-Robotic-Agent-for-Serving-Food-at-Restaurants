<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gyroscope controlled robot</title>
    <link rel="stylesheet" href="./scss/main.css?<?= time() ?>">
</head>

<body onload="htmlInclude()">
    <a href="" id="a-href" onclick="route(event)" style="position: absolute;opacity: 0; pointer-events: none;"></a>
    <svg id="topRefreshIcon" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
        <path
            d="M479.283-154.022q-135.392 0-230.685-95.293-95.294-95.294-95.294-230.626t95.294-230.804q95.293-95.473 230.685-95.473 86.434 0 151.724 35.032 65.291 35.032 113.058 96.36v-131.392h62.87v262.848H543.848V-606h167.043q-38.239-59.043-96.282-95.446-58.044-36.402-135.326-36.402-108.104 0-182.976 74.86t-74.872 182.946q0 108.085 74.874 182.988 74.874 74.902 182.98 74.902 81.798 0 150.2-46.902Q697.891-315.957 725.13-393h70.37q-29.239 107.391-116.974 173.185-87.735 65.793-199.243 65.793Z" />
    </svg>
    <div id="rootFrame"></div>
    <!-- .rootFrame -->



    <div class="Window" style="display: none;">
        <nav>
            <img src="./res/img/other_img/bdu_logo.png" alt="bdu logo">
            <p onclick="window.location.reload()">IOT Controller</p>
        </nav>
        <div class="box box1">
            <div class="h1">
                Gesture Control
                <label class="switch">
                    <input type="checkbox" id="checkbox-for-gesture-control">
                    <span class="slider round"></span>
                </label>
            </div>
            <div class="result"><span class="txt1">Status : </span><span class="txt2"
                    id="result-for-gesture-control">Stop</span></div>
        </div>
        <!-- .box -->
        <div class="box box2">
            <div class="h1">
                Manual Control
                <label class="switch">
                    <input type="checkbox" id="checkbox-for-manual-control">
                    <span class="slider round"></span>
                </label>
            </div>
            <div class="result"><span class="txt1">Status : </span><span class="txt2"
                    id="result-for-manual-control">Stop</span></div>
            <div class="directions">
                <p class="stop" ontouchstart='ButtonTouch("S")' ontouchend='ButtonTouch("S")'>STOP</p>
                <svg class="up" ontouchstart='ButtonTouch("F")' ontouchend='ButtonTouch("S")'
                    xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48">
                    <path
                        d="M320 936V626H120l360-450 360 450H640v310H320Zm60-60h200V566h133L480 270 247 566h133v310Zm100-310Z" />
                </svg>
                <svg class="down" ontouchstart='ButtonTouch("B")' ontouchend='ButtonTouch("S")'
                    xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48">
                    <path
                        d="M320 936V626H120l360-450 360 450H640v310H320Zm60-60h200V566h133L480 270 247 566h133v310Zm100-310Z" />
                </svg>
                <svg class="right" ontouchstart='ButtonTouch("R")' ontouchend='ButtonTouch("S")'
                    xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48">
                    <path
                        d="M320 936V626H120l360-450 360 450H640v310H320Zm60-60h200V566h133L480 270 247 566h133v310Zm100-310Z" />
                </svg>
                <svg class="left" ontouchstart='ButtonTouch("L")' ontouchend='ButtonTouch("S")'
                    xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48">
                    <path
                        d="M320 936V626H120l360-450 360 450H640v310H320Zm60-60h200V566h133L480 270 247 566h133v310Zm100-310Z" />
                </svg>
            </div>
        </div>
        <!-- .box -->
        <ul class="note">
            <li>IOT 4306: Modeling and Simulation of Robotics Systems Lab</li>
            <li>Group 3 (1801042, 1901029, 1901030, 1901044, 1901050)</li>
        </ul>
    </div>

    <script src="./js/config/cookie.js?<?= time() ?>"></script>
    <script src="./js/config/crypto_js_v3.1.2.js?<?= time() ?>"></script>
    <script src="./js/config/data-encode-decode.js?<?= time() ?>"></script>
    <script src="./js/config/jquery_v3.6.4.js?<?= time() ?>"></script>
    <script src="./js/config/mobile_check.js?<?= time() ?>"></script>
    <script src="./js/config/my_script.js?<?= time() ?>"></script>
    <script src="./js/config/variable.js?<?= time() ?>"></script>
    <!-- ---------- -->
    <script src="./js/main.js?<?= time() ?>"></script>
    <script src="./js/firstPanel.js?<?= time() ?>"></script>
    <script src="./js/buttonControl.js?<?= time() ?>"></script>
    <script src="./js/gestureControl.js?<?= time() ?>"></script>
    <script src="./js/voiceControl.js?<?= time() ?>"></script>
    <script src="./js/tableSelection.js?<?= time() ?>"></script>
    <script src="./js/chaWithRobot.js?<?= time() ?>"></script>
    <!-- ---------- -->
    <script src="./js/route.init.js?<?= time() ?>"></script>
    <script>
    setTimeout(() => {
        GoToLocation();
    }, 100);
    domain = "http://localhost/bdu-iot-controller";
    domain = "https://192.168.167.22/bdu-iot-controller";
    // domain = "https://172.17.112.166/bdu-iot-controller";
    </script>
</body>

</html>