/*--------------------------
 目次
1. Stream
2. Riplle
3. Wave
4. bubble

--------------------------*/

// パーツ
let stream = [[],[],[],[]];
let stream_goal = [[],[],[],[]];
// [0] 自動 back
// [1] 自動 front
// [2] 手動 back
// [3] 手動 front

let ripple = [];
let bubble = [];
let wave = [];

//--------------------------
// 1. WaterStream
//--------------------------

function waterStream_push(mX, mY, auto) { 

  let a = [0,0,0,0,0,0];
  
  for(let i = 0; i < stream.length; i++){
    for(let j = 0; j < stream[i].length; j++){
      if (stream[i][j].phaseState == "goal"){continue;}
      for(let k = 0; k < stream[i][j].xPoint.length; k++ ){
        let x = stream[i][j].xPoint[k];
        let y = stream[i][j].yPoint[k];
        if(dist(mX, mY,x,y) < 20){
          a = [
            1,                              // [0]
            x,                              // [1]
            y,                              // [2]
            stream[i][j].weightDefault*0.6, // [3]
            stream[i][j].sp+1,              // [4]
            i                               // [5]
          ];
          // a
          // [0] 主流(0) or 分岐(1)
          // [1] 分岐点のX座標
          // [2] 分岐点のY座標
          // [3] weightの取得
          // [4] spの取得
          // [5] ポジションの取得（0, 1, 2, 3）
          break;
        }
      }
    } 
  }
  
  // # 主流 "main"
  if(a[0]==0){
    // ## 手動再生
    if(!auto){
      stream[3].push(new WaterStream(mX, mY, "main", 0, 0, 3));
    // ## 自動再生
    } else {
      // ### 後ろ
      if(random() < 0.3){
        stream[0].push(new WaterStream(mX, mY, "main", 0, 0, 0));
      // ### 手前
      }else{
        stream[1].push(new WaterStream(mX, mY, "main", 0, 0, 1));
      }
    }
    // 主流SE再生
    touchSound(0);
    
  // # 分岐 "branch"
  }else{
    // ## 手動再生
    if(!auto){
      // ### 後ろ
      if (a[5] < 3) {
        stream[a[5]].push(new WaterStream(a[1], a[2], "branch",a[3], a[4], a[5]));
      } else if(random() < 0.3){
        stream[2].push(new WaterStream(a[1], a[2], "branch",a[3], a[4], 2));
      // ### 手前
      } else {
        stream[3].push(new WaterStream(a[1], a[2], "branch",a[3], a[4], 3));
      }
    // ## 自動再生
    }else {
      if(random() < 0.3 || a[5]==0){
         stream[0].push(new WaterStream(a[1], a[2], "branch",a[3], a[4], 0));
      // ### 手前
      } else {
         stream[1].push(new WaterStream(a[1], a[2], "branch",a[3], a[4], 1));
      }
      
    }
  // 分岐SE再生
  touchSound(1);
  }
    
}

function waterStream_draw() {
  // オブジェクトの削除
  for (let i = 0; i < stream.length; i++) {
    for (let j = 0; j < stream[i].length; j++) {
      if (stream[i][j].delete) {
       stream[i].splice(j, 1);
      }
  } }
  // 各 stream の処理
  for (let i = 0; i < stream.length; i++) {
    for (let j = 0; j < stream[i].length; j++) {
      stream[i][j].draw();
  } }

}


//--------------------------
// 2. WaterRipple
//--------------------------
function waterRipple_push(mX,mY) {
  ripple.push(new WaterRipple(mX, mY));
}
function waterRipple_draw() {
  if (ripple.length > 0) {
    for (let i = 0; i < ripple.length; i++) {
      if (ripple[i].delete == true) {
        ripple.splice(i, 1);
      }
    }
    for (let i = 0; i < ripple.length; i++) {
      ripple[i].draw();
    }
  }
}

//--------------------------
// 3. WaterWave
//--------------------------

function waterWave_push(vol) {
  if (frameCount % waveTiming == 0) {
    wave.push(new WaterWave(vol));
    waveTiming = int(random(3, 4) * 30);
    waveCount = 0;
    v = 0;
  }
  waveCount++;
}

function waterWave_draw() {
  if (wave.length > 0) {
    for (let i = 0; i < wave.length; i++) {
      if (wave[i].delete) {
        wave.splice(i, 1);
      }
    }
    for (let i = 0; i < wave.length; i++) {
      wave[i].drawing();
    }
  }
}

//--------------------------
//  4. WaterBubble
//--------------------------
function waterBubble_push(x, y, r, d) {
  
  let n = random(1,4);
  let m = random(height/5,height/3);
  for(let i = 0; i < n; i++){
    let a = map(i, 0, n, 0, m)
    bubble.push(new WaterBubble(x, y, r, d));
  }
  touchSound(2);
}

function waterBubble_draw(){
  if (bubble.length > 0) {
    // オブジェクトの削除
    for (let i = 0; i < bubble.length; i++) {
      if (bubble[i].delete) {
        bubble.splice(i, 1);
      }
    }
    // 描画
    for (let i = 0; i < bubble.length; i++) {
      bubble[i].draw();
    }
  }
}

function mouseReleased(){
  if(!start){
    firstClick();
  }
}
