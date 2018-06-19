<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die();
}

include_once('./db_connection.php');

# TODO: Devolve queries/parsing steps to separate methods/functions
# TODO: Add explanation of why request is parsed this way

$values = $_POST['vector'];
$values = explode(',', $values);

$headers = $_POST['header'];
$headers = explode(',', $headers);

$device_id = $values[0];
$timestamp = trim($values[1], '"');

$values = array_slice($values, 2);
$readings = array_combine($headers, $values);

$find_deployment = $pdo->prepare(
    "SELECT deployment.id
    FROM deployment
        INNER JOIN airsence_device
            ON airsence_device.id = deployment.airsence_device_id
    WHERE airsence_device.serial_number = :device_id
	    AND deployment.is_current = 1;"
);

$find_deployment->execute(['device_id' => $device_id]);

$deployment_id = $find_deployment->fetchColumn();

try {
    $pdo->beginTransaction();

    $insert_device_reading = $pdo->prepare(
        "INSERT INTO device_reading (deployment_id, timestamp) VALUE
	        (:deployment_id, :timestamp);"
    );

    $insert_device_reading->execute(['deployment_id' => $deployment_id, 'timestamp' => $timestamp]);

    # Possible race condition in next statement, depending on how PDO driver and MySQL share connections
    $device_reading_id = $pdo->lastInsertId();

    $insert_sensor_readings = $pdo->prepare(
        "INSERT INTO raw_sensor_reading (device_reading_id, sensor_id, reading) VALUE (
            :device_reading_id,
            (SELECT id
            FROM sensor
            WHERE name = :sensor_name),
            :sensor_reading
        );"       
    );

    # Should be single insert with multiple values, rather than multiple inserts, for better performance.
    # Because this is inside a transaction, only one commit is done, instead of
    # one commit per insert, so performance impact is mitigated
    foreach ($readings as $sensor_name => $sensor_reading) {
        $insert_sensor_readings->execute([
            'device_reading_id' => $device_reading_id,
            'sensor_name' => $sensor_name,
            'sensor_reading' => $sensor_reading
        ]);
    }
    
    $insert_pollutant_levels = $pdo->prepare(
        "CALL insert_linear_pollutant_levels(:device_reading_id);"
    );

    $insert_pollutant_levels->execute(['device_reading_id' => $device_reading_id]);

    $pdo->commit();
}
catch (Exception $e) {
    $pdo->rollBack();
    # TODO: log request and error
    throw $e;
}
?>