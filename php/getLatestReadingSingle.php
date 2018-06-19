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
function add_pollutant($new_data,$row){
    switch($row['symbol']){
        case "CO": 
        $new_data->co = (float)$row['level'];
        break;
        case "NO":
        $new_data->no = (float)$row['level'];
        break;
        case "NO2":
        $new_data->no2 = (float)$row['level'];
        break;
        case "O3":
        $new_data->o3 = (float)$row['level'];
        break;
        case "PM2.5":
        $new_data->pm2_5 = (float)$row['level'];
        break;
        case "AQHI":
        $new_data->aqhi = $row['level'];
        break;
    }
}

class pollutant_data{
    public $co;
    public $no;
    public $no2;
    public $pm2_5;
    public $aqhi;
}
/**************************************************************
 * Main script starts here
 **************************************************************/
$conn = new mysqli(SERVER,USER,PASSWORD,DB);

if($conn->connect_error){
    die("Fail:".$conn->connect_error);
}
//debug_to_console("Success");

$device_id = $_POST['device_id'];

$sql = "CALL `airsence`.`get_latest_readings_single`(%f);";
$sql = sprintf($sql,$device_id);
$result = $conn->query($sql);
$json_array = array();
$new_data = NULL;
$new_data = new pollutant_data;
if ($result->num_rows > 0) {
    // output the data
    while($row = $result->fetch_assoc()) {
        add_pollutant($new_data,$row);
    }
    $json_array[] = $new_data;
} else {
    echo "0 result";
}
echo json_encode($json_array);

$conn->close();

?>
