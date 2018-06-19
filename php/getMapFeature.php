<?php
$json_data = file_get_contents('../json/map_feature.json');
header('Content-Type: application/json'); 
echo $json_data;
?>