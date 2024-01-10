<?php
require_once('tcpdf.php');

$pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8', false, false);
$pdf->addPage();
$pdf->setFont('kozgopromedium', 'B', 10);

$html = <<<EOF
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>PDF出力検証中</h1>
</body>
</html>
EOF;

$pdf -> writeHTML($htnl);
$pdf -> Output('PDF出力検証中')

?>