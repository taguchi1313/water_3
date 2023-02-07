class WaterStream {
  constructor(x, y, type, weight, sp, position) {
//--------------------------
// フェーズ判定用ステータス
//--------------------------
    // フェーズ(main,goal,delete)
    this.phaseState = "main"
    // オブジェクト削除スイッチ
    this.delete = false;
//--------------------------
// 基本ステータス
//--------------------------
    // ●基本設定
    this.f = 2; // 最小移動単位
    this.id = int(random(10000));
    this.weight = [];
    // 座標を格納する配列
    this.x = [];
    this.y = [];
    // 分岐ポイントの座標
    this.xPoint = [];
    this.yPoint = [];
    // タイプ
    this.type = type;
    this.position = position; // 0, 1, 2, 3  

//--------------------------
// アニメーション用ステータス
//--------------------------
    // ●基本アニメ用ステータス
    // 進行方向 (左:-1 右:1)
    this.LR = random([-1, 1]);
    // 広がるスピード
    this.extendSp = random(2,3) * 30;
    this.extendCount = 0;
    // 動作のスイッチ（down, left, right, curveLeft, curveRight）
    this.moveState = "down";
    // 移動カウント
    this.moveCount = 0;
    // ●カーブ描画用ステータス
    // カーブ描画時に使用する円の中心のx,y座標
    this.cenX = x;
    this.cenY = y + this.radius;
    
//--------------------------
// 分岐
//--------------------------
    this.objectColorSet = color(0,0,100);
    switch(type) {
      case "main":
        this.x[0] = x;
        this.y[0] = 0;
        // 線の太さの初期値
        this.weightDefault = random(28,32);
        this.weightStart = 0 ;
        if (y > height*0.75){
          this.moveCountTarget = height*0.75;
        }else{
          this.moveCountTarget = y;
        }
        this.sp = int(6/this.f);
        // カーブの半径
        this.radius = random([50,75,100]);
        break;
      case "branch":
        this.x[0] = x;
        this.y[0] = y;
        this.weightDefault = weight;
        this.weightStart = int(random(100,300));
        this.moveCountTarget = random(50,100);
        this.sp = sp;
        // カーブの半径
        this.radius = random([25,50,75]);
    }
    // 色
    switch(position){
      case 0: this.objectColorValue = 0.2; break;
      case 1: this.objectColorValue = 0.5; break;
      case 2: this.objectColorValue = 0.7; break;
      case 3: this.objectColorValue = 1;   
    }
    
  }

//--------------------------
// 描画メソッド
//--------------------------
  draw() {
    // ゴールフェーズチェック
    if (this.y[this.y.length - 1] > height) {
      this.phaseState = "goal";
    }
    // 消失フェーズチェック
    if (this.extendCount > this.extendSp) {
      this.phaseState = "delete";
    }
    
    switch(this.phaseState){
      case "main":
        this.pointSet(); // 各点の座標設定
        this.pointWeight(); // 各点の大きさ設定
        break;
      case "goal":
        this.pointWeight();
        this.extend();
        break;
      case "delete":
        this.delete = true;
    }

    // 色の設定
    this.colorSet();
    fill(this.objectColor);

    // メインフェーズの描画
    for (let i = 0; i < this.x.length; i++) {
      circle(this.x[i], this.y[i], this.weight[i]);
    }
  }

//--------------------------
// 色の設定
//--------------------------
  colorSet(){
    this.objectColor = lerpColor(backColor, color(255,255,255), this.objectColorValue);
  }
  
//--------------------------
// 各点の太さ決定
//--------------------------
  pointWeight() {
    for (let i = 0; i <= this.x.length; i++) {
      let n = (this.id - i)/(400/this.f)+frameCount/20;
      this.weight[i] = map(noise(n),0,1,this.weightDefault*0.2,this.weightDefault*1.1);
      if(i < this.weightStart) {
        this.weight[i] = map(i/this.weightStart,0,1,this.weight[i]*0.6,this.weight[i]);
      }
    }
  }

//--------------------------
// 各点の座標決定
//--------------------------
  pointSet() {
    for (let i = 0; i < this.sp; i++) {
      // 変数の設定
      let xTip = this.x[this.x.length - 1];
      let yTip = this.y[this.y.length - 1];
      let xySet = [];
      // 座標の計算
      xySet = this.moveCombine(xTip, yTip);
      // 座標の追加
      this.x.push(xySet[0]);
      this.y.push(xySet[1]);
    }
  }

//--------------------------
// メインフェーズの動作計算
//--------------------------
  // 動き組合せ
  moveCombine(x, y) {
    let xSet, ySet;
    let xySet = [];

    switch(this.moveState){
        
      case "down":
        xySet = this.moveDown(x, y);
        if(this.moveCount < this.moveCountTarget){
          this.moveCount += this.f;
        }else{
          this.cenX = x + this.radius * this.LR;
          this.cenY = y;
          this.angle = 90 + this.LR * 90;
          switch(this.LR){
            case -1: 
              this.moveState = "curveLeft"; break;
            case 1: 
              this.moveState = "curveRight"; break;
          }
        }
        break;

      case "left":
        xySet = this.moveStraight(x, y);
        this.cenX = x;
        if(this.moveCount < this.moveCountTarget){
          this.moveCount += this.f;
          if(this.moveCount % 5 == 0){
            this.xPoint.push(xySet[0]);
            this.yPoint.push(xySet[1]);
          }
        }else{
          this.radius = random([25,50,75]);
          this.LR = 1;
          this.moveState = "curveRight";
          // 5% で下移動に変わる
          if(random()<0.05){
            this.moveState = "curveDown";
            this.radius = 5;
            this.moveCountTarget = random(50);}
          this.cenX = x;
          this.cenY = y + this.radius;
          this.angle = 90 + this.LR * 180; // つまり270
        }
        break;
        
      case "right":
        xySet = this.moveStraight(x, y);
        this.cenX = x;
        if(this.moveCount < this.moveCountTarget){
          this.moveCount += this.f;
          if(this.moveCount % 5 == 0){
            this.xPoint.push(xySet[0]);
            this.yPoint.push(xySet[1]);
          }
        }else{
          this.radius = random([25,50,75]);
          this.LR = -1;
          this.moveState = "curveLeft";
          // 5% で下移動に変わる
          if(random()<0.05){
            this.moveState = "curveDown";
            this.radius = 5;
            this.moveCountTarget = random(50);
          }
          this.cenX = x;
          this.cenY = y + this.radius;
          this.angle = 90 + this.LR * 180;　// つまり-90
        }
        break;
        
      case "curveLeft":
        xySet = this.moveCurve(x, y);
        if (this.angle < 90 ) {
          this.angle = this.angle-this.LR*(180/PI/this.radius*this.f);
        } else {
          this.moveCount = 0;
          this.moveCountTarget = random(400);
          this.moveState = "left";
        }
        break;
        
      case "curveRight":
        xySet = this.moveCurve(x, y);
        if (this.angle > 90 ) {
          this.angle = this.angle-this.LR*(180/PI/this.radius*this.f);
        } else {
          this.moveCount = 0;
          this.moveCountTarget = random(400);
          this.moveState = "right";
        }
        break;
        
      case "curveDown":
        xySet = this.moveCurve(x, y);
        if (this.angle < 0 || this.angle > 180) {
          this.angle = this.angle-this.LR*(180/PI/this.radius);
        } else {
          this.moveCount = 0;
          this.moveCountTarget = random(25,200);
          this.radius = 5;
          this.LR *= -1;
          this.moveState = "down";
        }
        break;
    }
    return xySet;
  }
  
  // 直下移動
  moveDown(x, y) {
    let xSet, ySet;
    let xySet = [];
    xSet = x;
    ySet = y + this.f;
    xySet = [xSet, ySet];
    return xySet;
  }
  
  // カーブ
  moveCurve(x, y) {
    let xSet, ySet;
    let xySet = [];
    xSet = cos(radians(this.angle)) * this.radius + this.cenX;
    ySet = sin(radians(this.angle)) * this.radius + this.cenY;
    xySet = [xSet, ySet];
    return xySet;
  }
  
  // 横移動
  moveStraight(x, y) {
    let xSet, ySet;
    let xySet = [];
    xSet = x + this.LR * this.f;
    ySet = y;
    xySet = [xSet, ySet];
    return xySet;
  }
  
//--------------------------
// 消える動作
//--------------------------
  extend() {
    let count = this.extendCount/this.extendSp; // 0~1
    //this.objectColor = lerpColor(this.objectColorSet, backColor, count);
    for (let i = 0; i < this.weight.length; i++) {
      this.weight[i] = map(count,0,1,this.weight[i],0);
    }
    this.extendCount++;
  }
}
