<?php
require_once( dirname(__FILE__) . '/dbconnect.php');
require_once( dirname(__FILE__) . '/function.php');
require_once( dirname(__FILE__) . './lib/tcpdf.php');

/**
 * 採用薬リスト作成のためのssidbから必要なデータ取り出す
 * tenmf, tensubm, tensubm2をリレーション
 * tkey=点数マスタ　tkjryk=薬剤名　tyuukou=有効期限　tensubclass=種別　tendat=紐づけ薬剤コード　tkjryk=紐づけ薬剤名　tyak=薬効コード
 */
// リスト作成用のSQLを作成
$sql_pdf_medicine = <<<SQL
  SELECT 
    tkey,
    CASE 
      WHEN tkouseicd='' 
        THEN null 
    ELSE 
      tkouseicd
    END AS tkouseicd,
    tkjryk,
    CASE 
      WHEN tyak = 0000 
        THEN '9999'
    ELSE
        tyak 
    END AS tyak,
    tshinno
  FROM 
    tenmf t
      LEFT JOIN tensubm m
        ON t.tkey = m.tenkey
      LEFT JOIN tensubm2 m2 
        ON t.tkey = m2.tenkey 
  WHERE 
    t.tnen = ?
    AND m2.tennen = ?
    AND tensanteikbn3 NOT LIKE '%100000'
    AND tensubclass = 0004 
    AND tendat LIKE '00001%' 
    AND tyuukou = '' 
    AND tkjryk NOT LIKE '%ﾃｽﾄ%' 
    AND tkjryk NOT LIKE '%テスト%' 
    AND tkjryk NOT LIKE '%てすと%'
    AND tshinno IN ('01', '02')
  ORDER BY
    tkjryk
SQL;
// $medicinesにssidbから取り出し、$tshinno(内服、外用、注射の切り分け),$startPage, $endPageをセットして、$medicinesにデータを格納
$medicines = $ssidb->prepare($sql_pdf_medicine);
// bindPramでそれぞれ取得してきた変数を代入
$medicines->bindParam(1,$tnen,PDO::PARAM_INT);
$medicines->bindParam(2,$tnen,PDO::PARAM_INT);
// SQL結果を取得
$medicines->execute();
$medicine_array = $medicines->fetchAll();
// $medicine_array = json_encode($medicine_array);


// TCPDFの設定
  // A4用紙の縦で指定
$pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8', false, false);
$pdf->addPage();
$pdf->setFont('kozgopromedium', 'B', 12);
// 出力する内容を変数$str_htmlに格納
$str_html = '
  <h1 class="el_title">院内採用薬リスト</h1>
  <section class="naihuku">
    <h2 class="el_secTitle">内服薬</h2>
    <div class="ly_list">
      <ul class="bl_medicine_list">
';
for ($i=0; $i < count($medicine_array) ; $i++) { 
  if($medicine_array[$i]['tshinno'] === '01'){
    $str_html .= '<li>'.$medicine_array[$i]['tkjryk'].'</li>';
  }
}
$str_html .= '
      </ul>
    </div>
  </section>';

  $str_html .= '
  <section class="gaiyou">
    <h2 class="el_secTitle">外用薬</h2>
    <div class="ly_list">
      <ul class="bl_medicine_list">
';
for ($i=0; $i < count($medicine_array) ; $i++) { 
  if($medicine_array[$i]['tshinno'] === '02'){
    $str_html .= '<li>'.$medicine_array[$i]['tkjryk'].'</li>';
  }
}
$str_html .= '
      </ul>
    </div>
  </section>';
// 変数$str_htmlに格納した出力内容をヒュアドキュメントで$htmlに格納
$html =<<< EOF
  {$str_html}
EOF;
// 出力内容をインスタンスに組み込む
$pdf -> writeHTML($html);
// PDFの出力
$pdf -> Output('PDF出力検証中');

?>

