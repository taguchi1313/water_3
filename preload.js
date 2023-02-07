// 音素材
let bgm_00,bgm_01,bgm_02,bgm_03;
let sound,soundVol;

// --------------------
// 音素材のロード
// --------------------
function preload() {
  sound = [];
  soundFormats('mp3');
  bgm_00 = loadSound('assets/bgm/bgm_00');
  bgm_01 = loadSound('assets/bgm/bgm_01');
  bgm_02 = loadSound('assets/bgm/bgm_02');
  bgm_03 = loadSound('assets/bgm/bgm_03');
  sound[0] = loadSound('assets/sound/sound_000');
  sound[1] = loadSound('assets/sound/sound_001');
  //sound[2] = loadSound('assets/sound/sound_002');
  //sound[3] = loadSound('assets/sound/sound_003');
  sound[4] = loadSound('assets/sound/sound_004');
  sound[5] = loadSound('assets/sound/sound_005');
  sound[10] = loadSound('assets/sound/sound_010');
  sound[11] = loadSound('assets/sound/sound_011');
  //sound[12] = loadSound('assets/sound/sound_012');
  //sound[13] = loadSound('assets/sound/sound_013');
  sound[14] = loadSound('assets/sound/sound_014');
  sound[15] = loadSound('assets/sound/sound_015');
  sound[20] = loadSound('assets/sound/sound_020');
  sound[21] = loadSound('assets/sound/sound_021');
  //sound[22] = loadSound('assets/sound/sound_022');
  //sound[23] = loadSound('assets/sound/sound_023');
  sound[24] = loadSound('assets/sound/sound_024');
  sound[25] = loadSound('assets/sound/sound_025');
  sound[30] = loadSound('assets/sound/sound_030');
  sound[31] = loadSound('assets/sound/sound_031');
  //sound[32] = loadSound('assets/sound/sound_032');
  //sound[33] = loadSound('assets/sound/sound_033');
  sound[34] = loadSound('assets/sound/sound_034');
  sound[35] = loadSound('assets/sound/sound_035');
  sound[100] = loadSound('assets/sound/sound_100');
  sound[101] = loadSound('assets/sound/sound_101');
  sound[102] = loadSound('assets/sound/sound_102');
  sound[110] = loadSound('assets/sound/sound_110');
  sound[111] = loadSound('assets/sound/sound_111');
  sound[112] = loadSound('assets/sound/sound_112');
  sound[120] = loadSound('assets/sound/sound_120');
  sound[121] = loadSound('assets/sound/sound_121');
  sound[122] = loadSound('assets/sound/sound_122');
  sound[130] = loadSound('assets/sound/sound_130');
  sound[131] = loadSound('assets/sound/sound_131');
  sound[132] = loadSound('assets/sound/sound_132');
  sound[200] = loadSound('assets/sound/sound_200');
  sound[210] = loadSound('assets/sound/sound_210');
  sound[220] = loadSound('assets/sound/sound_220');
  sound[230] = loadSound('assets/sound/sound_230');
}