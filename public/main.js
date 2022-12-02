// PIANO
let osc, env;

let c = [0, 30, 60, 80, 150, 240, 270, 330];

let keys = ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'q', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'w', 'x', 'c', 'v', 'b', 'n'];

let notes = [40, 42, 44, 45, 47, 49, 50, 52, 54, 55, 57, 59, 60, 62, 64, 65, 67, 69, 71, 72, 74, 76, 77, 79, 81, 83];

let angle = 20;
let offset = 200;
let scalar = 35;
let speedVal= 10;
let col = {
  r: 255,
  g: 0,
  b: 0
};

let rectWidth;
let saveButton;
let resetButton;
let dim;
let keyIndex = -1;


function setup() {
  let cnv = createCanvas(400, 400);
  cnv.parent('canvasContainer')
  colorMode(HSB)
  
  env = new p5.Envelope()

  env.setADSR(0.01, 0.1, 1, 0.25);
  
  osc = new p5.Oscillator('triangle');
  osc.start();
  osc.amp(env);
  midiToFreq()

  rectWidth = width/4;

  dim = width / 2;
  background(0);
  colorMode(HSB, 360, 100, 100);
  noStroke();
  ellipseMode(RADIUS);
  frameRate(1);

//   SAVE BUTTON
  saveButton = createButton('Save Canvas');
  saveButton.parent('buttons')
  saveButton.mousePressed(savePalette);

  // RESET BUTTON
  resetButton = createButton('Reset Canvas');
  resetButton.parent('buttons')
  resetButton.mousePressed(resetPalette);
}

function savePalette() {
    saveCanvas('myCanvas', 'png');
}

function resetPalette() {
  background(0);
  angle = 20;
  offset = 200;
  scalar = 35;
  speedVal = 10;
}



function draw() {
  // background(220, 49, 150);

  // for(let i = 0; i < notes.length; i++) {
  //   // fill(0, 0, 100)
  //   if(keyIsPressed && key == keys[i]){
  //       // rect(cos(200 + i), sin(200 + i), i * 4, i*4)
  //       // fill(random(1, 255), 100, 100)
  //       // noStroke()

  //       col.r = random(0, 200);
  //       col.g = random(0, 250);
  //       col.b = random(100, 250);
  //       let x = offset + cos(angle) * scalar;
  //       let y = offset + sin(angle) * scalar;
  //       fill(col.r, col.g, col.b);
  //       noStroke();
  //       ellipse(x, y, 10, 10);
  //       angle += speed;
  //       scalar += speed;
  //       // osc.freq(midiToFreq(notes[i])); 
  //   }
  // }

}


function drawGradient() {
  let radius = dim / 2;
  if (key >= 'a' && key <= 'z') {
    keyIndex = key.charCodeAt(0) - 'a'.charCodeAt(0);
    let h = notes[keyIndex] * 4;
    let x = offset + cos(angle) * scalar;
    let y = offset + sin(angle) * scalar;
    for (let r = radius; r > 0; --r) {
      fill(h, 90, 90);
      ellipse(x, y, r, r);
      h = (h + 1) % 360;
    }
    angle += speedVal;
    scalar += speedVal;
  }
}


function keyPressed() {
    if (key >= 'a' && key <= 'z') {
      keyIndex = key.charCodeAt(0) - 'a'.charCodeAt(0);
      osc.freq(midiToFreq(notes[keyIndex])); 
    }
    if (keyIndex === -1) {
      resetPalette()
    } else {
        for (let x = 0; x <= width; x += dim) {
          drawGradient(x, height / 2);
        }
    }
  env.play()
}
