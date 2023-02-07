class WaterBubble{
  constructor(x,y,r,d){
    this.id = int(random(10000));
    // 座標
    this.x = x;
    this.y = y;
    // 方向
    this.angle = r;
    // 勢い
    this.Momentum = d;
    // 泡の半径
    this.r = random(10,30);
    if(random()<0.05){this.r = random(50,100);}
    // 泡の振れ幅
    this.range = 10;
    // 泡の上昇スピード
    this.upSp = random(10,30);
    // 色
    this.cA_set = random(100,200); //不透明度の初期値
    this.cA = this.cA_set;
    // カウント
    this.count = 0;
    this.second = int(random(1,3) * 30);
    
  }

  
//--------------------
// メインの関数
//--------------------
  draw(){
    this.deleteCheck();
    this.colorSet();
    this.frow();
    this.bubbleShape();
    this.count++;
  }
//--------------------
// 色の設定
//--------------------
  colorSet(){
    let objectColor = color(255,255,255, this.cA);
    
    noStroke();
    fill(objectColor);
  }
  
//--------------------
// 泡の形の描画
//--------------------
  bubbleShape(){
    ellipse(this.x,this.y,this.r,this.r*0.9);
  }
  
//--------------------
// 浮かんでいく動き
//--------------------
  frow(){
    let i = map 
    this.x = this.x + map(noise(this.id+this.count/5), 0, 1, -this.range, this.range);
    this.y = this.y - this.upSp;
    if(this.Momentum > 0) {
      this.x = this.x + cos(this.angle) * this.Momentum/6;
      this.y = this.y + sin(this.angle) * this.Momentum/6;
      this.Momentum = this.Momentum*0.9;
    }
  }
  
//--------------------
// 削除チェック
//--------------------
  deleteCheck(){
    if(this.y < -30){
      this.delete = true;
  } }
}
