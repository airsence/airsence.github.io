<?php
ini_set('display_errors', 1); 
error_reporting('E_ALL'); 

function add_pollutant($new_data,$symbol,$level){
    switch($symbol){
        case "CO": 
        $new_data->co = round((float)$level,1);
        break;
        case "CO2": 
        $new_data->co = round((float)$level,1);
        break;
        case "SO2": 
        $new_data->co = round((float)$level,1);
        break;
        case "NO":
        $new_data->no = round((float)$level,1);
        break;
        case "NO2":
        $new_data->no2 = round((float)$level,1);
        break;
        case "O3":
        $new_data->o3 = round((float)$level,1);
        break;
        case "PM2.5":
        $new_data->pm2_5 = round((float)$level,1);
        break;
        case "AQHI":
        $new_data->aqhi = $level;
        break;
        case "T":
        $new_data->temperature = round((float)$level,1);
        break;
        case "RH":
        $new_data->humidity = round((float)$level,1);
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
    public $so2;
    public $co2;
    public $o3;
    public $co;
    public $no;
    public $no2;
    public $pm2_5;
    public $aqhi;
    public $temperature;
    public $humidity;
}
class sensor_data{
    public $sensor_info;
    public $pollutant_data;
    public $timestamp;
}

/**************************************************************
 * Main script starts here
 **************************************************************/
$config = parse_ini_file('../web_config/config.ini');

$host = $config['db_host'];
$dbname = $config['db_dbname'];
$user = $config['db_user'];
$password = $config['db_password'];

$conn = new mysqli($host,$user,$password,$dbname);

if($conn->connect_error){
    die("Fail:".$conn->connect_error);
}
$sensor_array = array();
$json_array = array();
$lat1 = $_POST['lat1'];
$lat2 = $_POST['lat2'];
$lng1 = $_POST['lng1'];
$lng2 = $_POST['lng2'];
$sql = "CALL `get_latest_readings_area`(%f, %f, %f, %f);";
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
    $pollutant_sql = "CALL `get_latest_readings_single`(%d);";
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
        echo "error";
    }
    $stmt->close();
}
for($index = 0; $index < sizeof($json_array); $index++){
    $timestamp_sql = "CALL `get_latest_readings_single_time`(%d);";
    $device_id = $sensor_array[$index]->device_id;
    $timestamp_sql = sprintf($timestamp_sql,$device_id);
    if ($stmt = $conn->prepare($timestamp_sql)){
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($timestamp);
        while($stmt->fetch()){
            $json_array[$index]->timestamp = $timestamp;
        }
    }
    else{
        echo "error";
    }
    $stmt->close();
}
echo json_encode($json_array);
 
$conn->close();

?>
