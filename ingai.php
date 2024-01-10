<?php
require_once( dirname(__FILE__) . '/dbconnect.php');
require_once( dirname(__FILE__) . '/function.php');
session_start();

$medicine_array = $medicines->fetchAll();
$medicine_array = json_encode($medicine_array);

?>

<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PharmacyAPP</title>
  <link rel="shortcut icon" href="img/pharmacyIcon.png" type="image/x-icon">
  <link rel="stylesheet" href="./css/riset.css">
  <link rel="stylesheet" href="./css/style.css">
  <script src="./js/flexibility.js"></script>
</head>
<body>
  <header class="ly_header">
    <div class="ly_header_inner d-flex justify-content-between">
      <a href="index.php" class="d-flex ly_header__link">
        <img class="el_mainIcon_img" src="./img/pharmacyIcon.png" alt="">
        <h1 class="el_title">PharmacyAPP</h1>
      </a>
      <ul class="ly_header__right d-flex justify-content-between">
        <li class="el_mdv el_header-btn">
          <a href="http://192.9.103.112/mdv/searchpage.aspx" target="_blank" class="btn btn-outline-danger"><span>MDV起動</span></a>
        </li>
        <li class="bl_nav-search">
          <!-- /.bl_mdv -->
          <ul class="bl_nav d-flex justify-content-between">
            <li class="bl_nav__item">
              <a href="index.php" class="btn btn-outline-success"><span>院内採用薬</span></a>
            </li>
            <li class="bl_nav__item">
              <a href="./ingai.php" class="btn btn-success"><span>院外採用薬</span></a>
            </li>
          </ul>
          <!-- /.bl_nav d-flex justify-content-between -->
          <ul class="bl_search d-flex justify-content-between">
            <input type="search" name="search" placeholder="薬剤名入力">
            <input type="submit" name="submit" value="検索">
          </ul>
          <!-- /.bl_search -->
        </li>
        <!-- /.bl_nav-search -->
      </ul>
      <!-- /.ly_header__right d-flex justify-content-between -->
    </div>
  </header>
  <main>
    <div class="row">
      <div class="col-4">
        <div class="bl_card bl_card__hightCalc mb-0">
          <div class="bl_cardBody bl_cardBody__hight100">
            <ul class="d-flex justify-content-around bl_nav__yakuType">
              <li>
                <a class="el_btn <?= $btn_class ?>" href="ingai.php">全</a>
              </li>
              <?php foreach($tshinno_array as $key => $value): ?>
                <?php 
                  $url_param = url_param_change(array('tshinno'=>$key,'page'=>null, 'tyak'=>null, 'tkouseicd'=>null));
                  if(isset($_REQUEST['tshinno']) && $key == $_REQUEST['tshinno']){
                    $btn_class = 'btn-secondary';
                  } else {
                    $btn_class = 'btn-outline-secondary';
                  }
                ?>
                <li class="">
                  <a class="el_btn <?= $btn_class ?>" href="ingai.php<?= $url_param; ?>"><?= $value; ?></a>
                </li>
              <?php endforeach; ?>
            </ul>
            <div class="el_accordion bl_scroll_box bl_list__yakkou js_yakkoulist">
            </div>
          </div>
          <!-- /.bl-cardBody -->
        </div>
        <!-- /.bl_card -->
      </div>
      <!-- /.col-5 -->
      <div class="col-8">
        <section class="bl_medicine">
          <div class="bl_card bl_card__hightCalc">
            <div class="bl_cardBody bl_cardBody__hight100 position-relative">
              <?php if(isset($_REQUEST['tshinno'])): ?>
                <span class="el_tshin_flag position-absolute font-bold"><?= $shin_label ?></span>
              <?php endif; ?>
              <h2 class="el_secTitle text-center mb-3">
                <span class="el_secTitle__prominent">”院外”</span>採用薬リスト
              </h2>
              <!-- 採用薬リストブロック -->
              <div class="bl_medicine_list bl_scroll_box table">
              </div>
              <!-- /.bl_medicine_list bl_scroll_box-->
            </div>
            <!-- /.bl_cardBody -->
          </div>
          <!-- /.bl_card -->
        </section>
      </div>
      <!-- /.col-lg-5 -->
    </div>
    <!-- /.row -->
    <div class="table"></div>
    <div class="js_yakkoulist"></div>
  </main>

  <script>
    var json_namefs_array = <?php echo $namefs_json_array; ?>;
    var js_namefs_json_array = JSON.stringify(json_namefs_array);
    var namefs_array = JSON.parse(js_namefs_json_array);

    var json_medicine_array = <?php echo $medicine_array; ?>;
    var js_json_medicine_array = JSON.stringify(json_medicine_array);
    var medicine_array = JSON.parse(js_json_medicine_array);
  </script>
  <script src="./js/main.js"></script>

</body>
</html>