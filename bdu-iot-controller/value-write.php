<?php
$myfile = fopen("xyz-values.txt", "w") or die("Unable to open file!");
$cmd = $_POST["cmd"];
fwrite($myfile, $cmd);
fclose($myfile);
