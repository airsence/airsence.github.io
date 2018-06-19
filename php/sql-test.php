<?php
ini_set('display_errors', 1); 
error_reporting('E_ALL'); 

define("SERVER","localhost:9100");
define("USER","root");
define("PASSWORD","Airsence");
define("DB","airsence");
$password = "Airsence";
$database_name = "airsence";

function debug_to_console( $data ) {
    $output = $data;
    if ( is_array( $output ) )
        $output = implode( ',', $output);

    echo "<script>console.log( 'PHP respond: " . $output . "' );</script>";
}
class sensor_info{
    public $device_id;
    public $station_name;
    public $lat;
    public $lng;
    public $aqhi;
}

$conn = new mysqli(SERVER,USER,PASSWORD,DB);

if($conn->connect_error){
    die("Fail:".$conn->connect_error);
}
//debug_to_console("Success");

$lat1 = $_GET['lat1'];
$lat2 = $_GET['lat2'];
$lng1 = $_GET['lng1'];
$lng2 = $_GET['lng2'];

$sql = "CALL `airsence`.`get_latest_readings_area`(%f, %f, %f, %f);";
//$sql = "CALL airsence.get_latest_readings_area(40, -79, 45, -80)";
$sql = sprintf($sql,$lat1,$lng1,$lat2,$lng2);
$result = $conn->query($sql);
$json_array = array();
$index = 0;
if ($result->num_rows > 0) {
    // output the data
    while($row = $result->fetch_assoc()) {
        $new_data = new sensor_info;
        $new_data->device_id = (int)$row['device_id'];
        $new_data->station_name = $row['station_name'];
        $new_data->lat = (float)$row['lat'];
        $new_data->lng = (float)$row['lng'];
        $new_data->aqhi = $row['aqhi'];
        $json_array[] = $new_data;
        $index = $index + 1;
    }
} else {
    echo "0 result";
}
echo json_encode($json_array);

$conn->close();

?>
