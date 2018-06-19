<?php

$json_data = file_get_contents('../json/pollution_threshold.json');
header('Content-Type: application/json'); 
echo $json_data;

?>