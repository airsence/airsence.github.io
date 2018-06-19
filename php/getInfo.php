<?php

$json_data = file_get_contents('../json/info.json');
header('Content-Type: application/json'); 
echo $json_data;

?>