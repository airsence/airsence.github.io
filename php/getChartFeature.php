<?php

$json_data = file_get_contents('../json/chart_feature.json');
header('Content-Type: application/json'); 
echo $json_data;

?>