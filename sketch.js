// スタート画面
let start = false;
// イージング
const e  = function (t) {return 1-(--t)*t*t*t};
// マイク
let mic;
let v;

// 音楽カウント
let bgmCount,bgmPart;
let bgmCountSet = 30*3.8;
// マウス
let mouseCount = 0;
let mouseXY = [];
let mouseD, mouseR;
// 自動描画のタイミング調整用変数
let waveCount, waveTiming;
// 放置モード
let sleep,sleepCount;
let previousMouse = false;
//　背景の色
let backColor;
let seed = [];

// レイヤー処理
let streamLayer = [];

//　ブラウザをリサイズしたら再読み込み
//window.onresize = function(){
//  location.reload();
//};

//--------------------
// 初回起動
//--------------------
function setup() {
  // 基本設定
  //createCanvas(windowWidth, windowHeight);
  createCanvas(1112, 1437);
  colorMode(RGB);
      noStroke();
  frameRate(30);
  sleep = false;
  soundVol = 0.5;
  // マイク設定
  mic = new p5.AudioIn();
  v = 0;
  // wave設定
  waveTiming = int(random(4, 6) * 30);
  waveCount = 0;
  bgmCount = 0;
  // sleep設定
  sleepCount = 0;
  // マウス
  mouseD = 0;
  mouseR = 0;
  // 背景
  seed[0] = random(10000);
  seed[1] = random(10000);
  seed[2] = random(10000);
}


//--------------------
// Draw
//--------------------
function draw() {
  backColorSet();
  background(backColor);
  if(start){
    mainDraw();
    touchOnOff();
    sleepCount = 0;
  }
}


//--------------------
// touchOnOff
//--------------------
function touchOnOff(){
  let a = 0;
  let b = 0;
  if(mouseIsPressed){a=10;}
  if(previousMouse){b=1;}
  
  switch(a+b){
    case 10: touchOnMoment(); break;
    case 01: touchOffMoment(); break;
    case 11: touchOnLong(); break;
    case 0: touchOffLong(); break;
  }
  previousMouse = mouseIsPressed;
}

//--------------------
// touchOnOff クリックした瞬間
//--------------------
function touchOnMoment(){
  // 記録
  mouseXY = [mouseX, mouseY];
  // スリープモードをオフ
  if(sleep){sleep = false;}
  sleepCount = 0;
}

//--------------------
// touchOnOff 離した瞬間
//--------------------
function touchOffMoment(){
  let stream_amount = stream[0].length + stream[1].length + stream[2].length + stream[3].length;
  if(mouseCount < 5 && stream_amount < 6){
    toutchDraw("stream");
  }else{
    toutchDraw("ripple");
  }
  mouseCount=0;
  sleepCount = 0;
}

//--------------------
// touchOnOff 長押し
//--------------------
function touchOnLong(){
  mouseD = dist(mouseX, mouseY, mouseXY[0], mouseXY[1]);
  mouseR = Math.atan2(mouseY - mouseXY[1], mouseX - mouseXY[0]);
  
  if(mouseD > 20){toutchDraw("bubble");}
  else if(mouseD > 10 && random() < 0.3){toutchDraw("bubble");}
  else if(mouseD > 0 && random() < 0.1){toutchDraw("bubble");}

  
  // 記録
  mouseCount++;
  mouseXY = [mouseX, mouseY];
}

//--------------------
// touchOnOff 押してない
//--------------------
function touchOffLong(){
  // 非スリープモード
  if(!sleep){
    sleepCount++;
    if(sleepCount > bgmCountSet*8){
      sleep = true;
      sleepCount = 0;
    }
  // スリープモード
  }else if(sleep){
    // Bubbleの自動再生
    
    if(random() < 0.01){
      waterBubble_push(random(width),height,0,0);
    }

    // Streamの自動再生
    let i = (bgmCount-int(bgmCountSet/4))%bgmCountSet == 0;
    let ii = (bgmCount+int(bgmCountSet/2))%bgmCountSet == 0;
    let iii = (bgmCount+int(bgmCountSet/4))%bgmCountSet == 0;
    if(i || ii){
      if (random() < 0.2){
        let x = random(width/5,width/5*4);
        let y = random(height/4,height/3*2);
        waterStream_push(x,y,true);
        waterRipple_push(x,y);
      } 
    }
  }
}

//--------------------
// 初クリック
//--------------------
function firstClick(){
  start = true;
  waterRipple_push(mouseX,mouseY);
  mic.start(); // マイク開始
  bgmPart = 0; // BGM設定
  touchSound(1);
}

//--------------------------
// toutchDraw
//--------------------------
function toutchDraw(type){
  switch(type){
    case "ripple":
      waterRipple_push(mouseX,mouseY);
      touchSound(0);
      break;
    case "stream":
      waterStream_push(mouseX,mouseY);
      waterRipple_push(mouseX,mouseY);
      break;
    case "bubble":
      waterBubble_push(random(mouseX-10,mouseX+10),random(mouseY-10,mouseY+10),mouseR,mouseD);
  }
}

//--------------------------
// mainDraw
//--------------------------
function mainDraw(){
  let micVolume = mic.getLevel();
  
  if (v < micVolume) {
    v = micVolume;
  }

  // waterPartsDrawing
  waterStream_draw();
  waterWave_draw();
  waterRipple_draw();
  waterBubble_draw();
  
  // waterPatsPush
  waterWave_push(v);
  
  // bgmCount
  if(bgmCount>bgmCountSet*4){bgmCount=0;}
  switch(bgmCount){
    case 0:
      bgm_00.play(0,1,soundVol*0.5);
      bgmPart = 0;
      break;
    case bgmCountSet:
      bgm_01.play(0,1,soundVol*0.5);
      bgmPart = 1;
      break;
    case bgmCountSet*2:
      bgm_02.play(0,1,soundVol*0.5);
      bgmPart = 2;
      break;
    case bgmCountSet*3:
      bgm_03.play(0,1,soundVol*0.5);
      bgmPart = 3;
      break;
  } bgmCount ++;
}



//--------------------------
// toutchSound
//--------------------------
function touchSound(type){
  let a;
  let soundPlay = true;
  switch(type){
    case 0:
      a = random([0,1,/*2,*//*3,*/4,5]);break;
    case 1:
      a = random([0,1,2]); break;
    case 2:
      a = 0;
      soundPlay = false;
  }
  if(soundPlay){
    let soundType = type*100 + bgmPart*10 + a;
    sound[soundType].play(0,1,soundVol*1);
  }
  
}

//--------------------------
//  背景色の設定
//--------------------------
function backColorSet(){
  let colorR,colorG,colorB;
  let n = frameCount * 0.0005;
  colorR = map(noise(seed[0]+n),0,1,0,50);
  colorG = map(noise(seed[1]+n),0,1,0,80);
  colorB = map(noise(seed[2]+n),0,1,10,100);
  backColor = color(colorR,colorG,colorB);
}

//--------------------------
//  デバック用
//--------------------------
function keyPressed(){
  if (keyCode === DOWN_ARROW) {
    soundVol = 0.03;
    console.log("soundVol = 0.03");
  }else if(keyCode === UP_ARROW) {
    soundVol = 0.5;
    console.log("soundVol = 0.5");
  } else if(key === 'z') {
    if(!sleep){
      sleep = true; 
      console.log("sleep ON");
    }
  }
}
