<?php
/**
 * 現在の年度を西暦に変換して変数「$tnen」に格納
 */
$date_Y = date('Y');
$date_m = date('m');
if ($date_m < 4) {
  $tnen = $date_Y - 1;
} else {
  $tnen = $date_Y;
}

/**
 * htmlspecialcharsを略した関数
 */
function h($data){
  return htmlspecialchars($data, ENT_QUOTES, "UTF-8");
}

/**
 * URLパラメーターをチェックして、追加・削除・変更をする関数
 */
function url_param_change($par=Array(),$op=0){
  $url = parse_url($_SERVER["REQUEST_URI"]);
  // print_r($url);
  // exit;
  if(isset($url["query"])) {
    parse_str($url["query"],$query);
  } else {
    $query = Array();
  }
  foreach($par as $key => $value){
    if($key && is_null($value)) {
      unset($query[$key]);
    } else {
      $query[$key] = $value;
    }
  }
  $query = str_replace("=&", "&", http_build_query($query));
  $query = preg_replace("/=$/", "", $query);
  if ($query) {
    if (!$op) {
      $op = '?';
    } else {
      $op = '';
    }
    $query = $op.h($query);
  } else {
    $query = '';
  }
  return $query;
}

/**
 * 内服薬・外用薬・注射薬のURLREQUESTの受け取り
 */
if (isset($_REQUEST['tshinno']) && is_numeric($_REQUEST['tshinno'])) {
  $tshinno = 'AND tshinno ='.h($_REQUEST['tshinno']);
} else {
  $tshinno = '';
}

/**
 * 薬効tyakのURLパラメーター受け取り
 */
if (isset($_REQUEST['tyak'])) {
  $tyak = 'AND tyak ='.h($_REQUEST['tyak']);
} else {
  $tyak = '';
}

/**
 * 薬剤表示数を変数で定義
 */
$display_num = 30;

/**
 * 内服薬・外用薬・注射薬を切り替えるため、診療Noを配列にする(今回は、3つだけのため手動で作成)
 */
$tshinno_array = ['01'=>'内服薬', '02'=>'外用薬', '03'=>'注射薬'];

/**
 * ファイルパスを取得して、院内採用薬か院外採用薬かを判定する区分を作成
 */
if (basename ($_SERVER['PHP_SELF'], '.php') == 'index' or basename ($_SERVER['PHP_SELF'], '.php') == 'outputpdf') {
  $tensanteikbn3 = '%100000';
} else if (basename ($_SERVER['PHP_SELF'], '.php') == 'ingai'){
  $tensanteikbn3 = '%200000';
}

/**
 * 採用薬リスト作成のためのssidbから必要なデータ取り出す
 * tenmf, tensubm, tensubm2をリレーション
 * tkey=点数マスタ　tkjryk=薬剤名　tyuukou=有効期限　tensubclass=種別　tendat=紐づけ薬剤コード　tkjryk=紐づけ薬剤名　tyak=薬効コード tshinno=内服・外用・注射の区分
 */
$sql_medicine = <<<SQL
  WITH sub_m2_class0004 AS (
    SELECT
      tennen, tenkey,tendat
    FROM
      tensubm2
    WHERE
      tensubclass = 0004
  )

  ,sub_m2_class0034 AS (
    SELECT
      tennen, tenkey,tendat
    FROM
      tensubm2
    WHERE
      tensubclass = 0034
  )

  SELECT 
    * 
  FROM (
    SELECT 
      ROW_NUMBER() OVER(ORDER BY tkjryk ASC) num, tenlist.* 
    FROM (
      SELECT 
        tkey,
        CASE 
          WHEN sub_m2_class0034.tendat = '' 
            AND t.tkouseicd != ''
            THEN RTRIM(t.tkouseicd)
          WHEN sub_m2_class0034.tendat IS NULL
            AND t.tkouseicd != ''
            THEN RTRIM(t.tkouseicd)
          WHEN sub_m2_class0034.tendat = ''
            THEN NULL
        ELSE
          RTRIM(sub_m2_class0034.tendat)
        END AS yjcode,
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
          LEFT JOIN sub_m2_class0004 
            ON t.tkey = sub_m2_class0004.tenkey
            AND t.tnen = sub_m2_class0004.tennen
          LEFT JOIN sub_m2_class0034
            ON t.tkey = sub_m2_class0034.tenkey
            AND t.tnen = sub_m2_class0034.tennen
      WHERE 
        t.tnen = 2023
        AND tensanteikbn3 NOT LIKE '%100000'
        AND sub_m2_class0004.tendat LIKE '00001%' 
        AND tyuukou = ''
        AND tkjryk NOT LIKE '%ﾃｽﾄ%' 
        AND tkjryk NOT LIKE '%テスト%' 
        AND tkjryk NOT LIKE '%てすと%'
        {$tshinno}
    ) tenlist 
  ) tenlist_num
SQL;
// $medicinesにssidbから取り出し、$tshinno(内服、外用、注射の切り分け),$startPage, $endPageをセットして、$medicinesにデータを格納
$medicines = $ssidb->prepare($sql_medicine);
// bindPramでそれぞれ取得してきた変数を代入
$medicines->bindParam(1,$tnen,PDO::PARAM_INT);
$medicines->bindParam(2,$tensanteikbn3,PDO::PARAM_STR);
// 医薬品リストのSQL結果を取得
$medicines->execute();


/**
 * 薬効別リスト作成のためnamefテーブルから薬効データ抽出
 */
// SQL_薬効をすべて取得
$sql_namef = <<<SQL
  SELECT 
    * 
  FROM 
    SUKAGAWASRV14.sukagawadb.dbo.namef 
  WHERE 
    namkey LIKE '08%'
SQL;
$namefs = $ssidb->prepare($sql_namef);
$namefs->execute();
// fetchAllで薬効の名称マスタを全て取得
$namefs = $namefs->fetchAll();
$namefs_json_array = json_encode($namefs);

/**
 * $_REQUEST['tshinno']を受けてクラスとラベル用の変数を作成
 */
if(isset($_GET['tshinno'])){
  $tshinno = h($_GET['tshinno']);
  $tshinno = strval($tshinno);
  $btn_class = 'btn-outline-secondary';
  $shin_label = $tshinno_array[$tshinno];
} else {
  $btn_class = 'btn-secondary';
}