<?php
function database_connect() {
    static $pdo;

    if (!isset($pdo)) {
        $config = parse_ini_file('../web_config/config.ini');

        $host = $config['db_host'];
        $dbname = $config['db_dbname'];
        $user = $config['db_user'];
        $password = $config['db_password'];
        $charset = $config['db_charset'];

        $connection = "mysql:host=$host;dbname=$dbname;charset=$charset";

        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ];

        $pdo = new PDO($connection, $user, $password, $options);
    }

    return $pdo;
}

$pdo = database_connect();
?>