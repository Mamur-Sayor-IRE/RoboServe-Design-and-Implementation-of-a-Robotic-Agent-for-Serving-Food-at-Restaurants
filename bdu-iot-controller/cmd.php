<?php

/**
 * readViewOrder
 */

$servername = "localhost";
$username = "root";
$password = "";
$database = "waiter-robot";

$db = new mysqli($servername, $username, $password, $database);
if ($db->connect_error) die("Connection failed: " . $db->connect_error);
$db->set_charset("utf8mb4"); // charset

isset($_GET["cmd"]) ? $cmd = $_GET["cmd"] : $cmd = $_POST["cmd"];

switch ($cmd) {
    case "readViewOrder":
        $delivery = 0;
        $s1 = $db->execute_query("SELECT * FROM `tablesit`");
        if ($s1->num_rows > 0) {
            foreach ($s1 as $s1) {
                $ts_id = $s1["ts_id"];
                $tableNo = $s1["tableNo"];
                $sitNo = $s1["sitNo"];
                $ts_time = $s1["ts_time"];
                $delivery = $s1["delivery"];
                $invoice = $s1["invoice"];
?>
<div class="block">
    <div class="h1">Invoice no : <?= $invoice ?></div>
    <table>
        <tr>
            <th>Table no</th>
            <th>:</th>
            <td><?= $tableNo ?></td>
        </tr>
        <tr>
            <th>Sit no</th>
            <th>:</th>
            <td><?= $sitNo ?></td>
        </tr>
    </table>
    <br>
    <table>
        <thead>
            <th>Food name</th>
            <th>Quantity</th>
        </thead>
        <tbody>
            <?php
                            $s2 = $db->execute_query("SELECT * FROM `foodlist` WHERE ts_id=? ORDER BY fl_name ASC", [$ts_id]);
                            if ($s2->num_rows > 0) {
                                foreach ($s2 as $s2) {
                                    $fl_name = $s2["fl_name"];
                                    $fl_qty = $s2["fl_qty"];
                                    $fl_id = $s2["fl_id"];
                            ?>
            <tr>
                <td><?= $fl_name ?></td>
                <td><?= $fl_qty ?></td>
            </tr>
            <?php
                                }
                            }
                            ?>
        </tbody>
    </table>
    <br>
    <button class="btn" style="background: <?php
                                                            if ($delivery == 0) echo "#dc3545";
                                                            else if ($delivery == 1) echo "#007bff.";
                                                            else echo "#28a745;" ?>">Status :
        <?php if ($delivery == 0) echo "Not ready to serve";
                        else if ($delivery == 1) echo "Food is served to robot.";
                        else echo "Food received successfully"; ?></button>
</div>
<!-- .block -->
<?php
            }
        }
        break;

        // ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊
    case "updateFoodOrderReceiveStatus":
        $val = $_GET["val"];
        $tableNo = $_GET["tableNo"];
        if (isset($val)) $db->execute_query("UPDATE `tablesit` SET `delivery`=? WHERE tableNo=?", [$val, $tableNo]);
        break;
        // ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊ ❊
}