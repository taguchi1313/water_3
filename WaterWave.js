class WaterWave{
  constructor(vol){
    // 波の高さ
    this.h = 0;
    this.hMAX = map(vol, 0, 1, height*0.02, height*1.2);
    // 波の横サイズ
    this.widthSet = width*1.01;
    this.width = this.widthSet;
    this.widthMAX = random(width*2,width*3);
    // 波ポイントの数
    this.div = int(width/120);
    // 波のノイズ
    this.id = random(10000);
    this.xoff = 0;
    this.noiseType = random([0,1]);
    // 波の出現時間(秒)
    this.second = random(5, 6) * 30;
    this.count = 0;
    // 色
    this.cA_set = 30; //不透明度の初期値
    this.cA = this.cA_set;
    // Easeの1〜0
    this.eX = 0;
    // 削除スイッチ
    this.delete = false;
  }
  
  drawing(){
    this.c = color(255, 255, 255, this.cA);
    fill(this.c);
    this.shape();
    this.colorSet();
    this.count ++;
    if(this.count > this.second){
      this.delete = true;
    }
  }
  
  shape(){
    beginShape();
    let LSide = (width-this.width)/2;
    let RSide = (this.width-width)/2+width;
    curveVertex(LSide,height); // 底 左端
    
    for(let i = 0; i <= this.div; i ++){
      // 波の基本の形
      let x = map(i,0,this.div,LSide,RSide);
      let y = height-this.h;
      // ノイズ生成
      this.xoff += 0.0001;
      let noiseSize = map(noise(this.id+i+this.xoff),0,1,0,height/5);
      y -= noiseSize*e(this.eX);
      curveVertex(x,y);
    }

    curveVertex(RSide,height); // 底 右端
    curveVertex(LSide,height); // 底 左端
    endShape(CLOSE);
    
    this.width += width/100;
    this.h = this.hMAX * e(this.eX);
    this.eX = this.count / this.second;
  }

  colorSet(){
    this.cA = map(this.count / this.second, 0, 1, this.cA_set, 0);
  }
}