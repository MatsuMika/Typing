$(function(){

  let randomText;
  let inputText  = ""; //タイピング文字
  const themeList = ['赤パジャマ黄パジャマ青パジャマ', '生麦生米生卵', '隣の客はよく柿食う客だ', '老若男女', 'きゃりーぱみゅぱみゅ','赤巻紙青巻紙黄巻紙','裏庭には二羽にわとりがいる','著作者手術中','親切診察室視察','今日急遽休暇許可拒否']  //お題を複数格納する変数

  let random = Math.floor( Math.random() * themeList.length );  //お題のランダム変数

  //お題をランダムにrandomid欄に表示
  randomText = $('#randomid').val(); 
  $('#randomid').text(themeList[random]);

  let Misscount = 0;  //ミス回数(ゲーム回数)をカウントするための変数
  let typeMiss = 0; //ミス文字の合計を格納
  let timer_id; //10秒カウントのid

  //okボタンを押した時の処理
  $('#okid').on('click',function(){ 
    //inputid欄に入力された文字をinputTextに格納
    inputText = $('#inputid').val(); 
    //ミス文字のカウントと追加
    const input = inputText.split('');
    typeMiss += miss_result(theme,input)
    reset(); //お題の更新
    clearTimeout(timer_id); //今動いているタイマーを止める
    count10();  //10秒カウントをスタートする
  });

  //ランダムなお題とタイピング文字から間違えた文字数を出力
  let theme = themeList[random].split(''); //ランダムに取り出したお題を一文字ずつ配列化
  function miss_result(theme_array,input_array){
    let miss = 0
    let equal = 0
    let longer;
    if(theme_array.length > input_array.length){
      longer = theme_array.length
    }else if(theme_array.length < input_array.length){
      longer = input_array.length
    }else{
      longer = input_array.length
    }

    for(let i = 0; i < longer; i++){
      if(theme_array[i] === input_array[i]){
        equal += 1  //等しい(正しい)文字を1つずつ入れていく
      }else{
        miss += longer - equal
        break;
      }
    }
    return miss
  }

  //10秒関数
  function timeupMiss(){
    //①お題の文字数を取得してミスに追加
    typeMiss += themeList[random].length
    //②画面を更新
    reset();
    //③10秒カウントをスタートする
    count10();
  }

  function count10(){
    if(Misscount < 5){
      //①10秒カウントして、カウントした後に、timeupMissを実行する
      timer_id = setTimeout(timeupMiss,10000);
    }
  }
  count10();

  //リセット(初期化)する関数
  //文字を入力するinputid欄を空にする
  function reset(){
    random = Math.floor( Math.random() * themeList.length );
    $('#randomid').text(themeList[random]);
    theme = themeList[random].split('');
    $('#inputid').val("");
    Misscount++;  //reset関数が走ると「1」カウントする
    jageMent(); //ゲーム5回目の時結果を画面に出力
  }

  //1回のゲームの処理(ボタンが押された際か、10秒経過した際にtypeMissにミス文字をoutputid欄に表示する)
  function jageMent(){
    if(Misscount === 5){
      $('#randomid').text("ゲーム終了です");
      //okボタンを非活性にする
      $("#okid").prop("disabled",true);
      let result = jage_result()
      $('#outputid').text(result);
    }
  }

  //間違った文字数の合計数に応じた結果
  function jage_result(){  
    if(typeMiss === 0){
      return "完璧！";
    }else if(typeMiss <= 3){
      return "おしい！";
    }else if(typeMiss <= 8){
      return "まだまだです。";
    }else{
      return "頑張りましょう。";
    }
  }

});

