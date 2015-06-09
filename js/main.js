// おまじない…？
// enchant.jsのenchantメソッドを参照したら意味わかるんかな
enchant();

window.onload = function() {

    var game_ = new Game(320, 320); // 表示領域の大きさを設定
    game_.fps = 24;                 // ゲームの進行スピードを設定
    game_.preload('./img/chara1.png'); // ゲームに使う素材をあらかじめ読み込み
    game_.onload = function() { // ゲームの準備が整ったらメインの処理を実行します
        var kuma = new Sprite(32, 32);
        kuma.image = game_.assets['./img/chara1.png'];
        kuma.frame = 4; // スケボーに乗ったくまを表示させる
        kuma.x = 144; //くまの初期位置設定
        kuma.y = 0; // くまの初期位置設定
        game_.rootScene.backgroundColor = '#ffffff'; // 背景色
        game_.rootScene.addChild(kuma); // シーンにくまを追加
        // くまがジグザグに移動するアニメーションを登録する
        kuma.tl.moveTo(174, 30, 10, enchant.Easing.QUAD_EASEINOUT);     // x=174, y=30の地点?まで10フレームかけて移動させる
        kuma.tl.moveTo(114, 90, 20, enchant.Easing.QUAD_EASEINOUT);     // x=114, y=90の地点?まで20フレームかけて移動させる
        kuma.tl.moveTo(174, 150, 20, enchant.Easing.QUAD_EASEINOUT);     // x=174, y=150の地点?まで20フレームかけて移動させる
        kuma.tl.moveTo(114, 210, 20, enchant.Easing.QUAD_EASEINOUT);     // x=114, y=210の地点?まで20フレームかけて移動させる
        kuma.tl.moveTo(144, 240, 10, enchant.Easing.QUAD_EASEINOUT);     // x=144, y=240の地点?まで10フレームかけて移動させる
        kuma.tl.moveTo(144, 0, 10, enchant.Easing.QUAD_EASEINOUT);      // x=144, y=0の地点?まで10フレームかけて移動させる
        kuma.tl.then(function(){
            // sampleのシングルがおかしかったくさい
            alert('then()を使うとアニメーションの途中に関数を挟められる！');
        });
        kuma.tl.loop();                 // 全て終わったら初めから繰り返す
    }

	// ゲームをスタート
	game_.start();
};

