<?php
ini_set('display_errors', 1); 
error_reporting('E_ALL'); 

function debug_to_console( $data ) {
    $output = $data;
    if ( is_array( $output ) )
        $output = implode( ',', $output);

    echo "<script>console.log( 'PHP respond: " . $output . "' );</script>";
}
function add_pollutant($new_data,$row){
    switch($row['pollutant']){
        case "CO": 
        $new_data->co = round((float)$row['level'],1);
        break;
        case "CO2": 
        $new_data->co = round((float)$row['level'],1);
        break;
        case "SO2": 
        $new_data->co = round((float)$row['level'],1);
        break;
        case "NO":
        $new_data->no = round((float)$row['level'],1);
        break;
        case "NO2":
        $new_data->no2 = round((float)$row['level'],1);
        break;
        case "O3":
        $new_data->o3 = round((float)$row['level'],1);
        break;
        case "PM2.5":
        $new_data->pm2_5 = round((float)$row['level'],1);
        break;
        case "AQHI":
        $new_data->aqhi = $row['level'];
        break;
        case "T":
        $new_data->temperature = round((float)$row['level'],1);
        break;
        case "RH":
        $new_data->humidity = round((float)$row['level'],1);
        break;
    }
}

class pollutant_data{
    public $co2;
    public $o3;
    public $so2;
    public $co;
    public $no;
    public $no2;
    public $pm2_5;
    public $aqhi;
    public $temperature;
    public $humidity;
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
//debug_to_console("Success");

$device_id = $_POST['device_id'];
$days = $_POST['days'];
$interval_minutes = $_POST['interval_minutes'];

$sql = "CALL `get_single_sensor_readings`(%f, %f, %f);";
$sql = sprintf($sql,$device_id,$days,$interval_minutes);
$result = $conn->query($sql);
$json_array = array();
$new_data = NULL;
if ($result->num_rows > 0) {
    // output the data
    while($row = $result->fetch_assoc()) {
        if($new_data == NULL || $new_data->timestamp != $row['timestamp'] ){
            if($new_data != NULL){
                $json_array[] = $new_data;
            }
            $new_data = new pollutant_data;
            $new_data->timestamp = $row['timestamp'];
        }
        add_pollutant($new_data,$row);
    }
} else {
    echo "0 result";
}
echo json_encode($json_array);

$conn->close();

?>
