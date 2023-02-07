class WaterRipple {
  constructor(x, y){
    //座標
    this.x = x;
    this.y = y;
    // 色
    this.cA_set = 255; //不透明度の初期値
    this.cA = this.cA_set;
    this.objectColorSet = color(255,255,255,255);
    this.objectColor = this.objectColorSet;
    // 波紋の最大の大きさ
    this.rMax = random(150,300);
    // 波紋の現在の大きさ
    this.rNow = 0;
    // 波紋の出現時間(秒)
    this.second = random(1, 4) * 30;
    this.count = 0;
    // Easeの1〜0
    this.eX = 0;
    // オブジェクト削除スイッチ
    this.delete = false;
  }
  
  draw(){
    this.objectColor = color(255, 255, 255, this.cA);
    fill(this.objectColor);
    noStroke();
    this.rippleDraw_001();
  }

  rippleDraw_001(){  
    if(this.count < this.second){
      this.count++;
      this.cA = this.cA_set * ((this.second - this.count) / this.second); 
      this.eX = this.count / this.second;
      this.rNow = e(this.eX) * this.rMax;
      circle(this.x, this.y, this.rNow);
    }else{
      this.delete = true;
    }
  }
}