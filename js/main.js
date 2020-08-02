import {drawRectangle} from './drawObject.js';

const canvas =document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.strokeStyle='black';
ctx.strokeRect(0,0,canvas.width, canvas.height);

let x, y, r, g, b, a;
let rectArray=[];
let rectFlag = false;
let rect = canvas.getBoundingClientRect();
let strokeColor="black";

function onDown(e){
  rectFlag=true;
  x=e.clientX - rect.left;
  y=e.clientY - rect.top;
  r = document.getElementById('result_R').value;
  g = document.getElementById('result_G').value;
  b = document.getElementById('result_B').value;
  a = document.getElementById('result_alpha').value;
  console.log(r,g,b,a);
  rectArray.push(new drawRectangle(x,y, r,g,b,a));
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.strokeStyle=strokeColor;
  ctx.strokeRect(0,0,canvas.width, canvas.height);
  for (let i = 0; i < rectArray.length; i++){
    console.log(rectArray[i].fillColor,rectArray[i].strokeColor);
    rectArray[i].drawObject(ctx);
  }
}

function onMove(e){
  if (rectFlag){
    let tmp=rectArray.length-1;
    let width=e.clientX - rect.left-rectArray[tmp].position[0];
    let height=e.clientY - rect.top-rectArray[tmp].position[1];
    rectArray[tmp].setSize(width,height);
    console.log(tmp, rectFlag, rectArray[tmp].position,rectArray[tmp].size);
    draw();
  }
}

function onUp(e){
  rectFlag=false;
}


class selectMode{
  onDown(){
    console.log("testDown");
  };
  onMove(){
    console.log("testMove");
  };
  onUp(){
    console.log("testUp");
  };
}

function resetButtonClick(){
  strokeColor="black";
  rectArray=[];
  draw();
  console.log('reset');
}

canvas.addEventListener('mousedown', onDown, false);
canvas.addEventListener('mousemove', onMove, false);
canvas.addEventListener('mouseup', onUp, false);
document.getElementById("resetButton").onclick=resetButtonClick;
mode.addEventListener('change', (event) => {
  let mode=document.getElementById("mode").mode.value;
  console.log(mode);
  if (mode=="draw"){
    //
  }else{
    //
  }
});
