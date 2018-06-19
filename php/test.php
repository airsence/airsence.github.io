<?php


ini_set('display_errors', 1); 
error_reporting('E_ALL'); 

define("SERVER","localhost:9100");
define("USER","root");
define("PASSWORD","Airsence");
define("DB","airsence");
$password = "Airsence";
$database_name = "airsence";

function add_pollutant($new_data,$symbol,$level){
    switch($symbol){
        case "CO": 
        $new_data->co = (float)$level;
        break;
        case "NO":
        $new_data->no = (float)$level;
        break;
        case "NO2":
        $new_data->no2 = (float)$level;
        break;
        case "O3":
        $new_data->o3 = (float)$level;
        break;
        case "PM2.5":
        $new_data->pm2_5 = (float)$level;
        break;
        case "AQHI":
        $new_data->aqhi = $level;
        break;
    }
}
class sensor_info{
    public $device_id;
    public $station_name;
    public $lat;
    public $lng;
    public $aqhi;
}
class pollutant_data{
    public $co;
    public $no;
    public $no2;
    public $pm2_5;
    public $aqhi;
}
class sensor_data{
    public $sensor_info;
    public $pollutant_data;
}

$conn = new mysqli(SERVER,USER,PASSWORD,DB);

if($conn->connect_error){
    die("Fail:".$conn->connect_error);
}
$sensor_array = array();
$json_array = array();
$lat1 = 42;
$lat2 = 44;
$lng1 = -79;
$lng2 = -80;
$sql = "CALL `airsence`.`get_latest_readings_area`(%f, %f, %f, %f);";
$sql = sprintf($sql,$lat1,$lng1,$lat2,$lng2);

if ($stmt = $conn->prepare($sql)) {
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($device_id,$station_name,$lat,$lng,$aqhi);
    while($stmt->fetch()) {
        $sensor_info = new sensor_info;
        $sensor_info->device_id = (int)$device_id;
        $sensor_info->station_name = $station_name;
        $sensor_info->lat = (float)$lat;
        $sensor_info->lng = (float)$lng;
        $sensor_info->aqhi = (int)$aqhi;
        $sensor_array[] = $sensor_info;
    }
} else {
    echo "0 result";
}
$stmt->close();

for($index = 0;$index < sizeof($sensor_array); $index++){
    $pollutant_sql = "CALL `airsence`.`get_latest_readings_single`(%d);";
    $device_id = $sensor_array[$index]->device_id;
    $pollutant_sql = sprintf($pollutant_sql,$device_id);

    $pollutant_data = new pollutant_data;
    $sensor_data = new sensor_data;
    $sensor_data->sensor_info = $sensor_array[$index];  
    if ($stmt = $conn->prepare($pollutant_sql)){
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($symbol,$level);
        while($stmt->fetch()){
            add_pollutant($pollutant_data,$symbol,$level);
        }
        $sensor_data->pollutant_data = $pollutant_data;
        $json_array[] = $sensor_data;
    }
    else{
        echo "error ";
    }
    $stmt->close();
}
echo json_encode($json_array);
$stmt->close();  
$conn->close();

?>