<?php

$json_data = file_get_contents('../json/sensor_concentration_average.json');
header('Content-Type: application/json'); 
echo $json_data;

?>