// おまじない…？
// enchant.jsのenchantメソッドを参照したら意味わかるんかな
enchant();

window.onload = function() {

	// Spriteを拡張
	Sprite.prototype.run = function(nowFrame) {

		if (nowFrame % 4 == 0 || nowFrame % 4 == 2) {
			this.frame = 0;
		} else if (nowFrame % 4 == 1) {
			this.frame = 1;
		} else {
			this.frame = 2;
		}
	};

	// ゲームの本体を準備し、表示される領域を設定
	var game = new Game(320, 320);

	// ゲームの進行スピードを設定
	game.fps = 24;

	// ゲームで使う素材をあらかじめ読み込む
	game.preload('./img/chara1.png');

	// ゲームの準備が整ったらメインの処理を実行
	game.onload = function() {

		// くまというスプライト(操作可能な画像)を準備すると同時に表示領域の大きさを指定
		var kuma = new Sprite(32, 32);

		// 生成したインスタンスに関数を後付けする場合
//		kuma.run = function(nowFrame) {
//
//			if (nowFrame % 4 == 0 || nowFrame % 4 == 2) {
//				this.frame = 0;
//			} else if (nowFrame % 4 == 1) {
//				this.frame = 1;
//			} else {
//				this.frame = 2;
//			}
//		};

		// くまにあらかじめロードしていた画像を適用
		kuma.image = game.assets['./img/chara1.png'];

		// くまの横位置を設定
		kuma.x = 100;
		// くまの立て位置を設定
		kuma.y = 120;

//		// 幅を2倍に設定
//		kuma.scaleX = 2;
//		// 高さを0.5倍に設定
//		kuma.scaleY = 0.5;
//		// 幅、高さを相対的に変形させる
//		kuma.scale(2, 3);
//		// 時計回りに90度回転させる
//		kuma.rotation = 90;
//		// こういう書き方も可能
//		kuma.rotate(270);

		// ゲームのシーンにくまを表示させる
		game.rootScene.addChild(kuma);
		// ゲームの動作部分の背景色を設定
		game.rootScene.backgroundColor = '#7ecef4';

		// くまのスピードを表す変数を定義
		var speed = 1;
		// くまを歩かせるためのフレーム
		var nowFrame = 0;
		// シーンに「毎フレーム実行イベント」を追加
		game.rootScene.addEventListener(Event.ENTER_FRAME, function() {

			// 毎フレーム、くまの座標を右に1pxずつずらす
			kuma.x += speed;

			nowFrame += 1;

			kuma.run(nowFrame);
		});

		// シーンに「タッチイベント」を追加
		game.rootScene.addEventListener(Event.TOUCH_START, function(e) {

			// タッチイベントは、タッチした座標をe.x,e.yとして取得することが可能
			if (e.x > kuma.x) {

				speed = 1;
				kuma.scaleX = 1;
			} else {

				speed = -1;
				kuma.scaleX = -1;
			}
		});
	}

	// ゲームをスタート
	game.start();
};

