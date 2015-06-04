// おまじない…？
// enchant.jsのenchantメソッドを参照したら意味わかるんかな
enchant();

window.onload = function() {

	// ゲームの本体を準備し、表示される領域を設定
	var game = new Game(320, 320);

	// ゲームの進行スピードを設定
	game.fps = 24;

	// ゲームで使う素材をあらかじめ読み込む
	game.preload('./img/chara1.png', './img/start.png', './img/gameover.png');

	// ゲームの準備が整ったらメインの処理を実行
	game.onload = function() {
        
        /**
        * タイトルシーンを作成し、返却する関数
        */
        var createStartScene = function() {
            
            // 新しいシーンを作成
            var scene = new Scene();
            // シーンの背景色を設定
            scene.backgroundColor = '#fcc800';
            
            // スタート画像設定
            // スプライトを作成
            var startImage = new Sprite(236, 48);
            // スタート画像を設定
            startImage.image = game.assets['./img/start.png'];
            // 横位置調整
            startImage.x = 42;
            // 縦位置調整
            startImage.y = 136;
            // シーンに追加
            scene.addChild(startImage);
            
            // タイトルラベル設定
            // ラベルを作成
            var title = new Label('くまたたき');
            // 文字を中央寄せに設定
            title.textAlign = 'center';
            // 文字を白色に設定
            title.color = '#ffffff';
            // 横位置調整
            title.x = 0;
            // 縦位置調整
            title.y = 96;
            // ラベルのフォントを設定
            title.font = '28px sans-serif';
            // シーンに追加
            scene.addChild(title);
            
            // サブタイトルラベル設定
            // ラベルを作成
            var subTitle = new Label('-　くまをたくさん叩こう　-');
            // 文字を中央寄せに設定
            subTitle.textAlign = 'center';
            // 横位置調整
            subTitle.x = 0;
            // 縦位置調整
            subTitle.y = 196;
            // ラベルのフォントを設定
            subTitle.font = '14px sans-serif';
            // シーンに追加
            scene.addChild(subTitle);
            
            // スタート画像にタッチイベントを設定
            startImage.addEventListener(Event.TOUCH_START, function(e) {
                
                // 現在表示しているシーンをゲームシーンに置き換える
                game.replaceScene(createGameScene());
            });
            
            // タイトルシーンを返却
            return scene;
        };
        
        /**
        * ゲームシーンを作成し、返却する関数
        */
        var createGameScene = function() {
            
            // 新しいシーンを作成
            var scene = new Scene();
            // 背景色を設定
            scene.backgroundColor = '#fcc8f0';
            
            // 残り時間を初期化
            var time = 240;
            // 得点を初期化
            var score = 0;
            
            // 得点欄を作成
            var label = new Label('スコア:　' + score + '体叩いた！');
            // ラベルのフォントを設定
            label.font = '14px sans-serif';
            // シーンに追加
            scene.addChild(label);
            
            // 残り時間を作成
            var timeLimit = new Label('残り時間:' + time);
            // ラベルのフォントを設定
            timeLimit.font = '14px sans-serif';
            // 横位置調整
            timeLimit.x = 0;
            // 縦位置調整
            timeLimit.y = 20;
            // シーンに追加
            scene.addChild(timeLimit);
            
            // 背景テキストを作成
            var backgroundText = new Label('くまを叩け！');
            // 文字を白色に設定
            backgroundText.color = '#ffffff';
            // ラベルのフォントを設定
            backgroundText.font = '60px sans-serif';
            // 文字を中央寄せに設定
            backgroundText.textAlign = 'center';
            // 横位置調整
            backgroundText.x = 0;
            // 縦位置調整
            backgroundText.y = 130;
            // シーンに追加
            scene.addChild(backgroundText);
            
            // くまを作成
            var kuma = new Sprite(32, 32);
            // くまの画像を設定
            kuma.image = game.assets['./img/chara1.png'];
            // くまの横位置を0～288pxの間でランダムに設定
            kuma.x = Math.random() * 288;
            // くまの縦位置を0～288pxの間でランダムに設定
            kuma.y = Math.random() * 288;
            // シーンに追加
            scene.addChild(kuma);
            // くまのスピードを-4～4の間でランダムに設定
            var kumaSpeed = Math.random() * 8 - 4;
            
            // くまの移動方向が左ならスプライトを反転
            if (kumaSpeed > 0) {
                
                kuma.scaleX = 1;
            } else {
                
                kuma.scaleX = -1;
            }
            
            // シーンに毎フレームイベントを設定
            scene.addEventListener(Event.ENTER_FRAME, function() {
                
                // 残り時間を1つずつ減らす
                time --;
                // 残り時間の表示を更新
                timeLimit.text = '残り時間:' + time;
                
                // 時間切れ
                if (time <= 0) {
                    
                    // 現在表示しているシーンをゲームオーバーシーンに置き換え
                    game.replaceScene(createGameoverScene(score));
                }
                
                // くまを横方向に移動
                kuma.x += kumaSpeed;
                // くまが画面端にきた場合の処理
                // 右端に到達した場合
                if (kuma.x > 320) {
                    
                    // 左端にワープさせる
                    kuma.x = -32;
                // 左端に到達した場合
                } else if (kuma.x < -32) {
                    
                    // 右端にワープさせる
                    kuma.x = 320;
                }
                
//                // くまを走らせる
//                kuma.run(timeLimit);
                kuma.frame ++;
                if (kuma.frame > 2) {
                    kuma.frame = 0;
                }
            });
            
            // くまにタッチイベントを設定
            kuma.addEventListener(Event.TOUCH_START, function(e) {
            
                // くまを叩いたらスコアを1加算
                score ++;
                // スコアの文言を更新
                label.text = 'スコア:　' + score + '体叩いた！';
                
                // くまの横位置を0～288pxの間でランダムに設定
                kuma.x = Math.random() * 288;
                // くまの縦位置を0～288pxの間でランダムに設定
                kuma.y = Math.random() * 288;
                // くまのスピードを-4～4の間でランダムに設定
                kumaSpeed = Math.random() * 8 - 4;
                
                // くまの移動方向が左ならスプライトを反転
                if (kumaSpeed > 0) {
                    
                    kuma.scaleX = 1;
                } else {
                    
                    kuma.scaleX = -1;
                }
            });
            
            // ゲームシーンを返却
            return scene;
        };
        
        /**
        * ゲームオーバーシーンを作成し、返却する関数
        */
        var createGameoverScene = function(resultScore) {
            
            // 新しいシーンを作成
            var scene = new Scene();
            // 背景色を設定
            scene.backgroundColor = '#303030';
            
            // ゲームオーバー画像設定
            // スプライトを作成
            var gameoverImage = new Sprite(189, 97);
            // スタート画像を設定
            gameoverImage.image = game.assets['./img/gameover.png'];
            // 横位置調整
            gameoverImage.x = 65;
            // 縦位置調整
            gameoverImage.y = 112;
            // シーンに追加
            scene.addChild(gameoverImage);
            
            // スコアラベル設定
            var label = new Label(resultScore + '体叩いた');
            // 文字を中央寄せに設定
            label.textAlign = 'center';
            // 文字を白色に設定
            label.color = '#fff';
            // 横位置調整
            label.x = 0;
            // 縦位置調整
            label.y = 60;
            // ラベルのフォントを設定
            label.font = '40px sans-serif';
            // シーンに追加
            scene.addChild(label);
            
            // リトライラベル(ボタン)設定
            var retryLabel = new Label('もう一度遊ぶ');
            // 文字を白色に設定
            retryLabel.color = '#fff';
            // 横位置調整
            retryLabel.x = 0;
            // 縦位置調整
            retryLabel.y = 300;
            // ラベルのフォントを設定
            retryLabel.font = '20px sans-serif';
            // シーンに追加
            scene.addChild(retryLabel);
            
            // リトライラベルにタッチイベントを設定
            retryLabel.addEventListener(Event.TOUCH_START, function(e) {
                
                // 現在表示しているシーンをタイトルシーンに置き換え
                game.replaceScene(createStartScene());
            });
            
            return scene;
        };
        
        // ゲームをスタートシーンに置き換え
        game.replaceScene(createStartScene());
	}

	// ゲームをスタート
	game.start();
};

