<?php
$servername = "localhost";
$username = "root";
$password = "";
$database = "waiter-robot";

$db = new mysqli($servername, $username, $password, $database);
if ($db->connect_error) die("Connection failed: " . $db->connect_error);
$db->set_charset("utf8mb4"); // charset

/**
 * chatInsert
 */

isset($_GET["cmd"]) ? $cmd = $_GET["cmd"] : $cmd = $_POST["cmd"];

switch ($cmd) {
    case "chatInsert":
        $msg = $_GET["msg"];
        $who = $_GET["who"];
        $i1 = $db->execute_query("INSERT INTO `chat`(`msg`, `who`) VALUES (?,?)", [$msg, $who]);
        if ($i1) echo "success";
        break;

        // ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊

    case "readAllChatData":
        $s1 = $db->execute_query("SELECT * FROM `chat`");
        if ($s1->num_rows > 0) {
            foreach ($s1 as $s1) {
                $arr[] = $s1;
            }
            echo json_encode($arr);
        } else echo 0;
        break;

        // ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊

    case "getLastChatMsg":
        $s1 = $db->execute_query("SELECT * FROM `chat` WHERE id=(SELECT MAX(id) FROM chat)");
        if ($s1->num_rows > 0) {
            foreach ($s1 as $s1) {
                $arr[] = $s1;
            }
            echo json_encode($arr);
        } else echo 0;
        break;

        // ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊
}
