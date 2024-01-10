{
  // 全角→半角(英数字)
  function replaceFullToHalf(str){
    return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s){
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
  }

  // 全角→半角(カタカナ)
  function replaceKanaFullToHalf(str){
    var kanaMap = {
      "ガ": "ｶﾞ", "ギ": "ｷﾞ", "グ": "ｸﾞ", "ゲ": "ｹﾞ", "ゴ": "ｺﾞ",
      "ザ": "ｻﾞ", "ジ": "ｼﾞ", "ズ": "ｽﾞ", "ゼ": "ｾﾞ", "ゾ": "ｿﾞ",
      "ダ": "ﾀﾞ", "ヂ": "ﾁﾞ", "ヅ": "ﾂﾞ", "デ": "ﾃﾞ", "ド": "ﾄﾞ",
      "バ": "ﾊﾞ", "ビ": "ﾋﾞ", "ブ": "ﾌﾞ", "ベ": "ﾍﾞ", "ボ": "ﾎﾞ",
      "パ": "ﾊﾟ", "ピ": "ﾋﾟ", "プ": "ﾌﾟ", "ペ": "ﾍﾟ", "ポ": "ﾎﾟ",
      "ヴ": "ｳﾞ", "ヷ": "ﾜﾞ", "ヺ": "ｦﾞ",
      "ア": "ｱ", "イ": "ｲ", "ウ": "ｳ", "エ": "ｴ", "オ": "ｵ",
      "カ": "ｶ", "キ": "ｷ", "ク": "ｸ", "ケ": "ｹ", "コ": "ｺ",
      "サ": "ｻ", "シ": "ｼ", "ス": "ｽ", "セ": "ｾ", "ソ": "ｿ",
      "タ": "ﾀ", "チ": "ﾁ", "ツ": "ﾂ", "テ": "ﾃ", "ト": "ﾄ",
      "ナ": "ﾅ", "ニ": "ﾆ", "ヌ": "ﾇ", "ネ": "ﾈ", "ノ": "ﾉ",
      "ハ": "ﾊ", "ヒ": "ﾋ", "フ": "ﾌ", "ヘ": "ﾍ", "ホ": "ﾎ",
      "マ": "ﾏ", "ミ": "ﾐ", "ム": "ﾑ", "メ": "ﾒ", "モ": "ﾓ",
      "ヤ": "ﾔ", "ユ": "ﾕ", "ヨ": "ﾖ",
      "ラ": "ﾗ", "リ": "ﾘ", "ル": "ﾙ", "レ": "ﾚ", "ロ": "ﾛ",
      "ワ": "ﾜ", "ヲ": "ｦ", "ン": "ﾝ",
      "ァ": "ｧ", "ィ": "ｨ", "ゥ": "ｩ", "ェ": "ｪ", "ォ": "ｫ",
      "ッ": "ｯ", "ャ": "ｬ", "ュ": "ｭ", "ョ": "ｮ",
      "。": "｡", "、": "､", "ー": "ｰ", "「": "｢", "」": "｣", "・": "･"
    };
    var reg = new RegExp('(' + Object.keys(kanaMap).join('|') + ')', 'g');
    return str.replace(reg, function(s){
      return kanaMap[s];
    }).replace(/゛/g, 'ﾞ').replace(/゜/g, 'ﾟ');
  }
}

{
  var yakkoLinks = document.querySelectorAll('.js_yakkolink');
  for (var i = 0; i < yakkoLinks.length; i++) {
    var yakkolink = yakkoLinks[i];
    yakkolink.addEventListener('click', function(e){
      var tyak = e.target.dataset["value"];
      // document.cookie = "tyak="+tyak;
      // console.log(tyak);
    });
  }
}

// 2023/04/25 t.n 薬効リストに中間項目も表示されるように設定変更
{
  // 名称マスタコード、末尾「00」の大項目のみを抽出して配列にする
  // 大項目格納用に空配列を定義、変数名を「namefBigList」とする
  var namefBigList = [];
  for(var i = 0; i < namefs_array.length; i++){
    // 薬効の大項目の分類に薬剤がない場合は、表示させないよう設定
    medicineCount = medicine_array.filter(function(obj){
      return obj.tyak.substr(0,2) == namefs_array[i]['namkey'].substr(2,2);
    })
    if (namefs_array[i]['namkey'].substr(4,2) === "00" && namefs_array[i]['namkey'].substr(3,3) !== "000" && medicineCount.length > 0 ) {
      // console.log(namefs_array[i]['namkey'] + ":" + medicineCount.length);
      namefBigList.push(namefs_array[i]);
    }
  }
  // 名称マスタコード、末尾「0」の中間項目のみを抽出して配列にする
  var namefMiddleList = [];
  for (var i = 0; i < namefs_array.length; i++) {
    // console.log(namefs_array[i])
    medicineCount = medicine_array.filter(function(obj){
      return obj.tyak.substr(0,3) == namefs_array[i]['namkey'].substr(2,3);
    })
    if (namefs_array[i]['namkey'].substr(5,1) === "0" && namefs_array[i]['namkey'].substr(3,3) !== "000" && namefs_array[i]['namkey'].substr(4,2) !== '00' && medicineCount.length > 0 ) {
      // console.log(namefs_array[i]['namkey'] + ":" + medicineCount.length);
      namefMiddleList.push(namefs_array[i]);
    }
  }
  // 名称マスタコード、末尾「00」「0」以外の詳細薬効項目のみを抽出して配列にする
  var namefSmallList = [];
  for (var i = 0; i < namefs_array.length; i++) {
    // console.log(namefs_array[i])
    medicineCount = medicine_array.filter(function(obj){
      return obj.tyak == namefs_array[i]['namkey'].substr(2);
    })
    if (namefs_array[i]['namkey'].substring(5) !== "0" && namefs_array[i]['namkey'].substring(3) !== "000" && namefs_array[i]['namkey'].substring(4) !== '00' && medicineCount.length > 0 ) {
      // console.log(namefs_array[i]['namkey'] + ":" + medicineCount.length);
      namefSmallList.push(namefs_array[i]);
    }
  }

  // 薬効リストを作成する
  function createYakkoList(bigList, middleList, smallList){
    
    var ul = document.createElement("ul");
    ul.classList.add("bl_yakkouList_group");
    
    var yakkoulist = document.querySelector(".js_yakkoulist");
    yakkoulist.appendChild(ul);

    for(var i = 0; i < bigList.length; i++ ){
      var liBig = document.createElement("li");
      liBig.classList.add('bl_list__yakkouBig')
      // liBig.classList.add("bl_yakkouList");
      var buttonBig = document.createElement("button");
      buttonBig.classList.add("el_yakkouBtn");
      buttonBig.classList.add("el_yakkouBtn__big");
      buttonBig.classList.add("js_accordion");
      buttonBig.classList.add("js_createList");
      buttonBig.setAttribute("data-value",bigList[i]["namkey"]);
      buttonBig.innerHTML = bigList[i]["kjnam"];
      liBig.appendChild(buttonBig);

      var ulMiddle = document.createElement('ul');
      for (let j = 0; j < middleList.length; j++) {
        if (bigList[i]["namkey"].substring(0,4) == middleList[j]['namkey'].substring(0,4)){
          var liMiddle = document.createElement('li');
          liMiddle.classList.add('bl_list__yakkouMiddle')
          var buttonMiddle = document.createElement('button');
          buttonMiddle.classList.add('el_yakkouBtn');
          buttonMiddle.classList.add('el_yakkouBtn__middle');
          buttonMiddle.classList.add('js_accordion__middle');
          buttonMiddle.classList.add('js_createList');
          buttonMiddle.setAttribute("data-value",middleList[j]["namkey"]);
          buttonMiddle.innerHTML = middleList[j]["kjnam"];
          liMiddle.appendChild(buttonMiddle);
          ulMiddle.appendChild(liMiddle);
          liBig.appendChild(ulMiddle);

          var ulSmall = document.createElement('ul');
          for (let k = 0; k < smallList.length; k++) {
            if (middleList[j]['namkey'].substring(0,5) == smallList[k]['namkey'].substring(0,5)){
              var liSmall = document.createElement('li');
              var buttonSmall = document.createElement('button');
              buttonSmall.classList.add('el_yakkouBtn');
              buttonSmall.classList.add('el_yakkouBtn__small');
              buttonSmall.classList.add('js_accordion__small');
              buttonSmall.classList.add('js_createList');
              buttonSmall.setAttribute("data-value",smallList[k]["namkey"]);
              buttonSmall.innerHTML = smallList[k]["kjnam"];
              liSmall.appendChild(buttonSmall);
              ulSmall.appendChild(liSmall);
              liMiddle.appendChild(ulSmall);
            }
          }
        }
      }


      ul.appendChild(liBig);
    }
    return ul;
  }

  createYakkoList(namefBigList, namefMiddleList, namefSmallList);
}

{
  // 薬効の大項目をクリックした時のアコーディオンアクションを作成
  const accordions = document.querySelectorAll('.js_accordion');
  for (let i = 0; i < accordions.length; i++) {
    const accordion = accordions[i];
    // 大項目をクリックしたときに、クリックした項目の親Nodeに「appear」クラスを付与
    accordion.addEventListener('click', function(e) {
      const clickTarget = e.target;
      clickTarget.parentNode.classList.toggle('appear');
      // 他の大項目をクリックした時に、現在の「appear」クラスを外す設定
      for (let j = 0; j < accordions.length; j++) {
        const element = accordions[j];
        if( clickTarget !== element) {
          element.parentNode.classList.remove('appear');
          // 中間項目にアクティブになっているものがあれば非アクティブにする
          const middleAccordions = document.querySelectorAll('.js_accordion__middle');
          for (let k = 0; k < middleAccordions.length; k++) {
            const middleAccordion = middleAccordions[k];
            middleAccordion.parentNode.classList.remove('appear');
          }
          // 詳細項目にアクティブになっているものがあれば非アクティブにする
          const smallAccordions = document.querySelectorAll('.js_accordion__small');
          for (let l = 0; l < smallAccordions.length; l++) {
            const clickTargetSmall = smallAccordions[l];
            clickTargetSmall.classList.remove('el_active');
          }
        }
      }
    })
  }

  // 薬効の中間項目をクリックした時のアコーディオンアクションを作成
  const middleAccordions = document.querySelectorAll('.js_accordion__middle');
  for (let i = 0; i < middleAccordions.length; i++) {
    const middleAccordion = middleAccordions[i];
    // 中間項目をクリックしたときに、クリックした項目の親Nodeに「appear」クラスを付与
    middleAccordion.addEventListener('click', function(e) {
      const clickTargetMiddle = e.target;
      clickTargetMiddle.parentNode.classList.toggle('appear');
      // 他の中間項目をクリックした時に、現在の「appear」クラスを外す設定
      for (let j = 0; j < middleAccordions.length; j++) {
        const element = middleAccordions[j];
        if( clickTargetMiddle !== element) {
          element.parentNode.classList.remove('appear');
          // 詳細項目にアクティブになっているものがあれば非アクティブにする
          const smallAccordions = document.querySelectorAll('.js_accordion__small');
          for (let k = 0; k < smallAccordions.length; k++) {
            const clickTargetSmall = smallAccordions[k];
            clickTargetSmall.classList.remove('active');
          }
        }
      }
    })
  }

  // 薬効の詳細項目をクリックした時のクリックアクションを作成
  const smallAccordions = document.querySelectorAll('.js_accordion__small');
  for (let i = 0; i < smallAccordions.length; i++) {
    const smallAccordion = smallAccordions[i];
    // 詳細項目をクリックしたときに、クリックした項目の親Nodeに「active」クラスを付与
    smallAccordion.addEventListener('click', function(e) {
      const clickTargetSmall = e.target;
      clickTargetSmall.classList.add('active');
      // 他の詳細項目をクリックしたときに、現在の「active」クラスを外す設定
      for (let j = 0; j < smallAccordions.length; j++) {
        const element = smallAccordions[j];
        if (clickTargetSmall !== element) {
          element.classList.remove('active');
        }
      }
    })
  }
}

{
  // 薬品一覧のテーブルを作成する関数
  function createTable(array) {
    // table要素を取得し、その中にHTMLが書かれているかチェックする。
    // 書かれていればリセット、書かれていなければ処理をとばす。
    var div_table = document.querySelector('.table');
    if (div_table.innerHTML !== "") {
      div_table.innerHTML = "";
    }
  // 薬品一覧を表示するtableのヘッダーを作成する設定
    // tableタグを作成し、クラスにbl_tableをつける
    var table = document.createElement("table");
    table.classList.add("bl_table");
    // theadタグを作成
    var thead = document.createElement("thead");
    // trタグを作成して、名称を「headRow」にする
    var headRow = document.createElement("tr");
    // thタグをheadCell1としてセルを作成して、中に「薬品名」を入れる
    var headCell1 = document.createElement("th");
    headCell1.innerHTML = "薬品名";
    // thタグをheadCell2としてセルを作成して、中に「DI」を入れる
    var headCell2 = document.createElement("th");
    headCell2.innerHTML = "DI";
    // headRowの下にheadCell1とheadCell2を入れる
    headRow.appendChild(headCell1);
    headRow.appendChild(headCell2);
    // theadの下にheadRowを配置、tableの下にtheadに配置する
    thead.appendChild(headRow);
    table.appendChild(thead);
    // HTML内のtableクラスを取得し、その下にこれまで作成してきたtableタグを配置する
    var tabletab = document.querySelector(".table");
    tabletab.appendChild(table);

  // 薬品一覧で、実際に薬品を表示するtbodyを作るための設定
    // tbodyタグを作成、クラスにel_table_body
    var tbody = document.createElement("tbody");
    tbody.classList.add("el_table_body");
    // ループで薬品リストを作成
    for(var i = 0; i < array.length; i++) {
      var row = document.createElement("tr");
      var cell1 = document.createElement("td");
      var cell1img = document.createElement("img");
      var cell1text = document.createElement("span");
      cell1img.classList.add("el_icon");
      cell1img.src = "img/錠剤.png";
      cell1img.alt = "錠剤のアイコン"
      cell1text.innerHTML = array[i]["tkjryk"];
      cell1.appendChild(cell1img);
      cell1.appendChild(cell1text);
      row.appendChild(cell1);
      var cell2 = document.createElement("td");
      var a = document.createElement("a");
      var cell2img = document.createElement("img");
      cell2.classList.add("text-center");
      cell2img.classList.add("el_icon");
      cell2img.src = "img/linkIcon.svg";
      cell2img.alt = "リンクアイコン";
      if(array[i]["yjcode"]) {
        a.appendChild(cell2img);
      }
      a.href = "http://192.9.103.112/mdv/SearchFrSet2.aspx?YJCODE=" + array[i]["yjcode"] + "&PICT=0";
      a.target = "_blank"
      cell2.appendChild(a);
      row.appendChild(cell2);
      tbody.appendChild(row);
    }
    return table.appendChild(tbody);
  }
  
  // createTable(medicine_array);

  // クリックされた薬効ごとに配列を作り替える関数
  function changeArray() {
    var click_items = document.querySelectorAll('.js_createList');
    // console.log(a);
    for (var i = 0; i < click_items.length; i++) {
      var click_item = click_items[i];
      click_item.addEventListener('click', function(e){
        // console.log(e.target.classList);
        var medicine_array = JSON.parse(js_json_medicine_array);
        var click_item_value = e.target.dataset["value"];
        if ( click_item_value.substring(4) === "00" ) {
          medicine_array = medicine_array.filter(function(obj){
            return obj.tyak.substring(0,2) == click_item_value.substring(2,4);
          });
        } else if( click_item_value.substring(5) === "0" ){
          medicine_array = medicine_array.filter(function(obj){
            return obj.tyak.substring(0,3) == click_item_value.substring(2,5);
          });
        }else if ( click_item_value.substring(4) !== "00" && click_item_value.substring(5) !== "0" ) {
          // クリックされた要素にbgc_grayクラスをつける
          // e.target.classList.add('bgc_gray');
          medicine_array = medicine_array.filter(function(obj){
            return obj.tyak == click_item_value.substring(2);
          });
        } else {
          return medicine_array = JSON.parse(js_json_medicine_array);
        }
        createTable(medicine_array);
        // 別な項目をクリックされた場合に、bgc_grayクラスを外す設定
        for (let j = 0; j < click_items.length; j++) {
          var element = click_items[j];
          if (e.target !== element) {
            element.classList.remove('bgc_gray');
          };
        }
      });
    }
  }

  // 検索機能を実装
  // submitボタンの取得
  var submit = document.querySelector('input[name="submit"]');
  // 検索のためのfunctionを作成
  var search = function() {
    // input要素を取得
    var inputSearch = document.querySelector('input[name="search"]');

    // medicine_arrayをリセットして、全件の中から検索できるようにする
    var medicine_array = JSON.parse(js_json_medicine_array);
    // 検索欄に入力された文字列をすべて半角に変換する
    var searchValue = replaceFullToHalf(inputSearch.value);
    var searchValue = replaceKanaFullToHalf(searchValue);
    // 新しく配列を作成するために、空配列を準備し、ループを回して空配列に値を格納する
    var searchArry = [];
    for (var i = 0; i < medicine_array.length; i++) {
      // 半角でも全角でも検索にヒットするように検索対象をいったんすべて半角にする
      var searchName = replaceFullToHalf(medicine_array[i]['tkjryk']);
      // indexOfでヒットする文字列があるか判定し、ない場合は「-1」が返されるので、0以上のものを新しく配列にする
      var searchIndex = searchName.indexOf( searchValue );
      if ( searchIndex >= 0 ) {
        searchArry.push( medicine_array[i] );
      }
    }
    // 最後にテーブルの再作成を行う
    createTable(searchArry);
  }

  // 検索ボタンをクリックされたときにsearch functionが実行されるように設定
  submit.addEventListener('click', function () {
    var inputSearch = document.querySelector('input[name="search"]');
    // inputが空じゃない場合にのみ、search()が起動するように設定
    // console.log(inputSearch.value);
    if (inputSearch.value !== '') {
      search();
    }
  });

  window.onload = createTable(medicine_array);
  window.onload = changeArray();

}