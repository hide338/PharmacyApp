<?php
define('DSN', '');
define('DB_USER', '');
define('DB_PASS', '');

try {
  $ssidb = new PDO(
    DSN,
    DB_USER,
    DB_PASS,
    [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]
    );
    // echo '接続OK';
} catch(PDOException $e) {
  echo $e->getMessage();
  exit;
}


?>
