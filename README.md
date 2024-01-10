<div id="top"></div>

## 使用技術一覧

<!-- シールド一覧 -->
<p style="display: inline">
  <!-- フロントエンド -->
  <img src="https://img.shields.io/badge/-Javascript-000000.svg?logo=javascript&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Sass-000000.svg?logo=sass&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Bootstrap-000000.svg?logo=bootstrap&style=for-the-badge">
  <!-- バックエンド -->
  <img src="https://img.shields.io/badge/-Php-000000.svg?logo=php&style=for-the-badge">
  <!-- ミドルウェア一覧 -->
  <img src="https://img.shields.io/badge/-Apache-D22128.svg?logo=apache&style=for-the-badge">
  <img src="https://img.shields.io/badge/-SQL%20Server-666666.svg?logo=&style=for-the-badge">
  <!-- インフラ一覧 -->
  <img src="https://img.shields.io/badge/-Windows%20server-0078D6.svg?logo=windows&style=for-the-badge">
</p>

## 目次

1. [システム詳細](#システム詳細)
2. [環境](#環境)
3. [ディレクトリ構成](#ディレクトリ構成)

## システム名

PharmacyApp -院内採用薬一覧-

<!-- プロジェクトについて -->

## システム詳細

電子カルテサーバーに保存されている薬剤マスタを使用したシステムで、院内の採用薬として登録されている薬剤を一覧画面で閲覧することが可能です。

機能詳細については、下記参照。

### 機能一覧

- 院内採用薬の一覧表示
- 院内採用薬の一覧をPDF出力する機能
- 内服、外用、注射別表示機能
- 薬効別検索(プルダウン)
- 薬剤名入力検索
- 院外採用薬一覧参照
- 薬効詳細画面への遷移(外部システム)
  - MDV参照

<p align="right">(<a href="#top">トップへ</a>)</p>

### システムイメージ図

- 薬剤一覧画面
  ![pharmacy01](https://github.com/hide338/PharmacyApp/assets/93624688/bc0bfc12-552b-4cd6-85f9-089cb0295b58)
- 内服、外用、注射別に表示が可能
  - 薬効の選択欄も内容に合わせて切り替わります。
  ![pharmacy02](https://github.com/hide338/PharmacyApp/assets/93624688/3dd2ebc7-f3b6-4d07-bf5e-18ddd66ca2b9)
  ![pharmacy03](https://github.com/hide338/PharmacyApp/assets/93624688/6623c58e-fc72-49c3-93db-52636c351173)
  ![pharmacy04](https://github.com/hide338/PharmacyApp/assets/93624688/fdcaa1da-57ac-4dd3-9678-3fd6025698f2)
- 薬効別にプルダウン形式で選択可能
  - 薬効は、大項目から小項目までクリックするたびに絞り込みが行われるため、見つかった時点で薬剤の詳細が閲覧可能です。
  ![pharmacy05](https://github.com/hide338/PharmacyApp/assets/93624688/28decf99-b3a1-4890-9b21-f16ea769ec0b)
  ![pharmacy06](https://github.com/hide338/PharmacyApp/assets/93624688/2581e676-a130-46a5-a6b4-fda7c36eb59a)
  ![pharmacy07](https://github.com/hide338/PharmacyApp/assets/93624688/d528d490-1428-4317-ac28-ab611714ba7b)
- 薬剤の詳細情報は、外部システムと連携して閲覧可能
  ![pharmacy08](https://github.com/hide338/PharmacyApp/assets/93624688/eb5adffc-4d81-41a9-a218-f1e4e420ba82)
- 薬剤名を一部入力し、検索することが可能
  ![pharmacy09](https://github.com/hide338/PharmacyApp/assets/93624688/3fbcf2a1-7139-426d-ae6c-2a4011014bdf)
  ![pharmacy10](https://github.com/hide338/PharmacyApp/assets/93624688/df117db7-e1a2-4328-bc0e-75067a2139fc)
- 外部システムの検索画面へリンク
  ![pharmacy11](https://github.com/hide338/PharmacyApp/assets/93624688/265075d3-1136-4478-872a-9cdf5be88b35)
- 院外の薬剤一覧も参照可能(PDF出力対象外)
  ![pharmacy12](https://github.com/hide338/PharmacyApp/assets/93624688/69148d2e-ce2b-4da8-82d6-39df3d9f8b8c)

<p align="right">(<a href="#top">トップへ</a>)</p>

## 環境

<!-- 言語、フレームワーク、ミドルウェア、インフラの一覧とバージョンを記載 -->

| 言語・フレームワーク  | バージョン   |
| --------------------- | ------------ |
| PHP                   | 8.1.13       |
| Apache                | 2.4.54       |
| SQL Server            | 10.50.4302.0 |

<p align="right">(<a href="#top">トップへ</a>)</p>

## ディレクトリ構成

.
│  dbconnect.php
│  function.php
│  index.php
│  ingai.php
│  outputpdf.php
│  
├─css
│      riset.css
│      style.css
│      style.css.map
│
├─img
│      blue-ui_folder-open.svg
│      blue-ui_folder.svg
│      linkIcon.svg
│      pharmacyIcon.png
│      settingIcon.svg
│      錠剤.png
│
├─js
│      main.js
│
├─lib
│  │  CHANGELOG.TXT
│  │  composer.json
│  │  LICENSE.TXT
│  │  pdf.php
│  │  README.md
│  │  tcpdf.php
│  │  tcpdf_autoconfig.php
│  │  tcpdf_barcodes_1d.php
│  │  tcpdf_barcodes_2d.php
│  │  tcpdf_import.php
│  │  tcpdf_parser.php
│  │  VERSION
│  │
│  ├─config
│  │      tcpdf_config.php
│  │
│  ├─examples
│  │  │  example_001.php
│  │  │  example_002.php
│  │  │  example_003.php
│  │  │  example_004.php
│  │  │  example_005.php
│  │  │  example_006.php
│  │  │  example_007.php
│  │  │  example_008.php
│  │  │  example_009.php
│  │  │  example_010.php
│  │  │  example_011.php
│  │  │  example_012.pdf
│  │  │  example_012.php
│  │  │  example_013.php
│  │  │  example_014.php
│  │  │  example_015.php
│  │  │  example_016.php
│  │  │  example_017.php
│  │  │  example_018.php
│  │  │  example_019.php
│  │  │  example_020.php
│  │  │  example_021.php
│  │  │  example_022.php
│  │  │  example_023.php
│  │  │  example_024.php
│  │  │  example_025.php
│  │  │  example_026.php
│  │  │  example_027.php
│  │  │  example_028.php
│  │  │  example_029.php
│  │  │  example_030.php
│  │  │  example_031.php
│  │  │  example_032.php
│  │  │  example_033.php
│  │  │  example_034.php
│  │  │  example_035.php
│  │  │  example_036.php
│  │  │  example_037.php
│  │  │  example_038.php
│  │  │  example_039.php
│  │  │  example_040.php
│  │  │  example_041.php
│  │  │  example_042.php
│  │  │  example_043.php
│  │  │  example_044.php
│  │  │  example_045.php
│  │  │  example_046.php
│  │  │  example_047.php
│  │  │  example_048.php
│  │  │  example_049.php
│  │  │  example_050.php
│  │  │  example_051.php
│  │  │  example_052.php
│  │  │  example_053.php
│  │  │  example_054.php
│  │  │  example_055.php
│  │  │  example_056.php
│  │  │  example_057.php
│  │  │  example_058.php
│  │  │  example_059.php
│  │  │  example_060.php
│  │  │  example_061.php
│  │  │  example_062.php
│  │  │  example_063.php
│  │  │  example_064.php
│  │  │  example_065.php
│  │  │  example_066.php
│  │  │  example_067.php
│  │  │  index.php
│  │  │  tcpdf_include.php
│  │  │
│  │  ├─barcodes
│  │  │      example_1d_html.php
│  │  │      example_1d_png.php
│  │  │      example_1d_svg.php
│  │  │      example_1d_svgi.php
│  │  │      example_2d_datamatrix_html.php
│  │  │      example_2d_datamatrix_png.php
│  │  │      example_2d_datamatrix_svg.php
│  │  │      example_2d_datamatrix_svgi.php
│  │  │      example_2d_pdf417_html.php
│  │  │      example_2d_pdf417_png.php
│  │  │      example_2d_pdf417_svg.php
│  │  │      example_2d_pdf417_svgi.php
│  │  │      example_2d_qrcode_html.php
│  │  │      example_2d_qrcode_png.php
│  │  │      example_2d_qrcode_svg.php
│  │  │      example_2d_qrcode_svgi.php
│  │  │      tcpdf_barcodes_1d_include.php
│  │  │      tcpdf_barcodes_2d_include.php
│  │  │
│  │  ├─config
│  │  │      tcpdf_config_alt.php
│  │  │
│  │  ├─data
│  │  │  │  chapter_demo_1.txt
│  │  │  │  chapter_demo_2.txt
│  │  │  │  table_data_demo.txt
│  │  │  │  utf8test.txt
│  │  │  │
│  │  │  └─cert
│  │  │          tcpdf.crt
│  │  │          tcpdf.fdf
│  │  │          tcpdf.p12
│  │  │
│  │  ├─images
│  │  │      alpha.png
│  │  │      image_demo.jpg
│  │  │      image_with_alpha.png
│  │  │      img.png
│  │  │      logo_example.gif
│  │  │      logo_example.jpg
│  │  │      logo_example.png
│  │  │      tcpdf_box.ai
│  │  │      tcpdf_box.svg
│  │  │      tcpdf_cell.png
│  │  │      tcpdf_logo.jpg
│  │  │      tcpdf_signature.png
│  │  │      testsvg.svg
│  │  │      tux.svg
│  │  │      _blank.png
│  │  │
│  │  └─lang
│  │          afr.php
│  │          ara.php
│  │          aze.php
│  │          bel.php
│  │          bra.php
│  │          bul.php
│  │          cat.php
│  │          ces.php
│  │          chi.php
│  │          cym.php
│  │          dan.php
│  │          eng.php
│  │          est.php
│  │          eus.php
│  │          far.php
│  │          fra.php
│  │          ger.php
│  │          gle.php
│  │          glg.php
│  │          hat.php
│  │          heb.php
│  │          hrv.php
│  │          hun.php
│  │          hye.php
│  │          ind.php
│  │          ita.php
│  │          jpn.php
│  │          kat.php
│  │          kor.php
│  │          mkd.php
│  │          mlt.php
│  │          msa.php
│  │          nld.php
│  │          nob.php
│  │          pol.php
│  │          por.php
│  │          ron.php
│  │          rus.php
│  │          slv.php
│  │          spa.php
│  │          sqi.php
│  │          srp.php
│  │          swa.php
│  │          swe.php
│  │          ukr.php
│  │          urd.php
│  │          yid.php
│  │          zho.php
│  │
│  ├─fonts
│  │  │  aealarabiya.ctg.z
│  │  │  aealarabiya.php
│  │  │  aealarabiya.z
│  │  │  aefurat.ctg.z
│  │  │  aefurat.php
│  │  │  aefurat.z
│  │  │  cid0cs.php
│  │  │  cid0ct.php
│  │  │  cid0jp.php
│  │  │  cid0kr.php
│  │  │  courier.php
│  │  │  courierb.php
│  │  │  courierbi.php
│  │  │  courieri.php
│  │  │  dejavusans.ctg.z
│  │  │  dejavusans.php
│  │  │  dejavusans.z
│  │  │  dejavusansb.ctg.z
│  │  │  dejavusansb.php
│  │  │  dejavusansb.z
│  │  │  dejavusansbi.ctg.z
│  │  │  dejavusansbi.php
│  │  │  dejavusansbi.z
│  │  │  dejavusanscondensed.ctg.z
│  │  │  dejavusanscondensed.php
│  │  │  dejavusanscondensed.z
│  │  │  dejavusanscondensedb.ctg.z
│  │  │  dejavusanscondensedb.php
│  │  │  dejavusanscondensedb.z
│  │  │  dejavusanscondensedbi.ctg.z
│  │  │  dejavusanscondensedbi.php
│  │  │  dejavusanscondensedbi.z
│  │  │  dejavusanscondensedi.ctg.z
│  │  │  dejavusanscondensedi.php
│  │  │  dejavusanscondensedi.z
│  │  │  dejavusansextralight.ctg.z
│  │  │  dejavusansextralight.php
│  │  │  dejavusansextralight.z
│  │  │  dejavusansi.ctg.z
│  │  │  dejavusansi.php
│  │  │  dejavusansi.z
│  │  │  dejavusansmono.ctg.z
│  │  │  dejavusansmono.php
│  │  │  dejavusansmono.z
│  │  │  dejavusansmonob.ctg.z
│  │  │  dejavusansmonob.php
│  │  │  dejavusansmonob.z
│  │  │  dejavusansmonobi.ctg.z
│  │  │  dejavusansmonobi.php
│  │  │  dejavusansmonobi.z
│  │  │  dejavusansmonoi.ctg.z
│  │  │  dejavusansmonoi.php
│  │  │  dejavusansmonoi.z
│  │  │  dejavuserif.ctg.z
│  │  │  dejavuserif.php
│  │  │  dejavuserif.z
│  │  │  dejavuserifb.ctg.z
│  │  │  dejavuserifb.php
│  │  │  dejavuserifb.z
│  │  │  dejavuserifbi.ctg.z
│  │  │  dejavuserifbi.php
│  │  │  dejavuserifbi.z
│  │  │  dejavuserifcondensed.ctg.z
│  │  │  dejavuserifcondensed.php
│  │  │  dejavuserifcondensed.z
│  │  │  dejavuserifcondensedb.ctg.z
│  │  │  dejavuserifcondensedb.php
│  │  │  dejavuserifcondensedb.z
│  │  │  dejavuserifcondensedbi.ctg.z
│  │  │  dejavuserifcondensedbi.php
│  │  │  dejavuserifcondensedbi.z
│  │  │  dejavuserifcondensedi.ctg.z
│  │  │  dejavuserifcondensedi.php
│  │  │  dejavuserifcondensedi.z
│  │  │  dejavuserifi.ctg.z
│  │  │  dejavuserifi.php
│  │  │  dejavuserifi.z
│  │  │  freemono.ctg.z
│  │  │  freemono.php
│  │  │  freemono.z
│  │  │  freemonob.ctg.z
│  │  │  freemonob.php
│  │  │  freemonob.z
│  │  │  freemonobi.ctg.z
│  │  │  freemonobi.php
│  │  │  freemonobi.z
│  │  │  freemonoi.ctg.z
│  │  │  freemonoi.php
│  │  │  freemonoi.z
│  │  │  freesans.ctg.z
│  │  │  freesans.php
│  │  │  freesans.z
│  │  │  freesansb.ctg.z
│  │  │  freesansb.php
│  │  │  freesansb.z
│  │  │  freesansbi.ctg.z
│  │  │  freesansbi.php
│  │  │  freesansbi.z
│  │  │  freesansi.ctg.z
│  │  │  freesansi.php
│  │  │  freesansi.z
│  │  │  freeserif.ctg.z
│  │  │  freeserif.php
│  │  │  freeserif.z
│  │  │  freeserifb.ctg.z
│  │  │  freeserifb.php
│  │  │  freeserifb.z
│  │  │  freeserifbi.ctg.z
│  │  │  freeserifbi.php
│  │  │  freeserifbi.z
│  │  │  freeserifi.ctg.z
│  │  │  freeserifi.php
│  │  │  freeserifi.z
│  │  │  helvetica.php
│  │  │  helveticab.php
│  │  │  helveticabi.php
│  │  │  helveticai.php
│  │  │  hysmyeongjostdmedium.php
│  │  │  kozgopromedium.php
│  │  │  kozminproregular.php
│  │  │  msungstdlight.php
│  │  │  pdfacourier.php
│  │  │  pdfacourier.z
│  │  │  pdfacourierb.php
│  │  │  pdfacourierb.z
│  │  │  pdfacourierbi.php
│  │  │  pdfacourierbi.z
│  │  │  pdfacourieri.php
│  │  │  pdfacourieri.z
│  │  │  pdfahelvetica.php
│  │  │  pdfahelvetica.z
│  │  │  pdfahelveticab.php
│  │  │  pdfahelveticab.z
│  │  │  pdfahelveticabi.php
│  │  │  pdfahelveticabi.z
│  │  │  pdfahelveticai.php
│  │  │  pdfahelveticai.z
│  │  │  pdfasymbol.php
│  │  │  pdfasymbol.z
│  │  │  pdfatimes.php
│  │  │  pdfatimes.z
│  │  │  pdfatimesb.php
│  │  │  pdfatimesb.z
│  │  │  pdfatimesbi.php
│  │  │  pdfatimesbi.z
│  │  │  pdfatimesi.php
│  │  │  pdfatimesi.z
│  │  │  pdfazapfdingbats.php
│  │  │  pdfazapfdingbats.z
│  │  │  stsongstdlight.php
│  │  │  symbol.php
│  │  │  times.php
│  │  │  timesb.php
│  │  │  timesbi.php
│  │  │  timesi.php
│  │  │  uni2cid_ac15.php
│  │  │  uni2cid_ag15.php
│  │  │  uni2cid_aj16.php
│  │  │  uni2cid_ak12.php
│  │  │  zapfdingbats.php
│  │  │
│  │  ├─ae_fonts_2.0
│  │  │      ChangeLog
│  │  │      COPYING
│  │  │      README
│  │  │
│  │  ├─dejavu-fonts-ttf-2.33
│  │  │      AUTHORS
│  │  │      BUGS
│  │  │      langcover.txt
│  │  │      LICENSE
│  │  │      NEWS
│  │  │      README
│  │  │      unicover.txt
│  │  │
│  │  ├─dejavu-fonts-ttf-2.34
│  │  │      AUTHORS
│  │  │      BUGS
│  │  │      langcover.txt
│  │  │      LICENSE
│  │  │      NEWS
│  │  │      README
│  │  │      unicover.txt
│  │  │
│  │  ├─freefont-20100919
│  │  │      AUTHORS
│  │  │      ChangeLog
│  │  │      COPYING
│  │  │      CREDITS
│  │  │      INSTALL
│  │  │      README
│  │  │
│  │  └─freefont-20120503
│  │          AUTHORS
│  │          ChangeLog
│  │          COPYING
│  │          CREDITS
│  │          INSTALL
│  │          README
│  │          TROUBLESHOOTING
│  │          USAGE
│  │
│  ├─include
│  │  │  sRGB.icc
│  │  │  tcpdf_colors.php
│  │  │  tcpdf_filters.php
│  │  │  tcpdf_fonts.php
│  │  │  tcpdf_font_data.php
│  │  │  tcpdf_images.php
│  │  │  tcpdf_static.php
│  │  │
│  │  └─barcodes
│  │          datamatrix.php
│  │          pdf417.php
│  │          qrcode.php
│  │
│  └─tools
│          .htaccess
│          convert_fonts_examples.txt
│          tcpdf_addfont.php
│
├─logs
│      access_log
│      error_log
│
└─scss
        style.scss
