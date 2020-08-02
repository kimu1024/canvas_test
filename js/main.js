import {drawRectangle} from './drawObject.js';

const canvas =document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.strokeStyle='black';
ctx.strokeRect(0,0,canvas.width, canvas.height);



class drawMode{
  static drawFlag=false;
  static onDown(e){
    this.drawFlag=true;
    x=e.clientX - rect.left;
    y=e.clientY - rect.top;
    r = document.getElementById('result_R').value;
    g = document.getElementById('result_G').value;
    b = document.getElementById('result_B').value;
    a = document.getElementById('result_alpha').value;
    console.log(r,g,b,a);
    rectArray.push(new drawRectangle(x,y, r,g,b,a));
  }


  static onMove(e){
    if (this.drawFlag){
      let tmp=rectArray.length-1;
      let width=e.clientX - rect.left-rectArray[tmp].position[0];
      let height=e.clientY - rect.top-rectArray[tmp].position[1];
      rectArray[tmp].setSize(width,height);
      console.log(tmp, this.drawFlag, rectArray[tmp].position,rectArray[tmp].size);
      draw();
    }
  }

  static onUp(e){
    let tmp=rectArray[rectArray.length-1];
    for(let i=0; i<2;i++){
      if(tmp.size[i]<0){
        tmp.position[i]+=tmp.size[i];
        tmp.size[i]=-tmp.size[i];
      }
    }
    this.drawFlag=false;
  }
}

class selectMode{
  static selectNum;
  static selectFlag=false;
  static dragFlag=false;
  static selectDist=[0,0];
  static onDown(e){
    x=e.clientX - rect.left;
    y=e.clientY - rect.top;
    for(let i=rectArray.length-1; i>=0; i--){
      let tmp=[rectArray[i].position[0],
        rectArray[i].position[1],
        rectArray[i].position[0]+rectArray[i].size[0],
        rectArray[i].position[1]+rectArray[i].size[1]];
      if(((x>tmp[0])&&(x<tmp[2]))&&((y>tmp[1])&&(y<tmp[3]))){
        this.selectNum=i;
        this.selectFlag=true;
        this.dragFlag=true;
        this.selectDist[0]=x-rectArray[i].position[0];
        this.selectDist[1]=y-rectArray[i].position[1];
        let rgba=rectArray[i].getFillColor();
        console.log(rgba);
        document.getElementById('result_R').value = rgba[0];
        document.getElementById('result_G').value = rgba[1];
        document.getElementById('result_B').value = rgba[2];
        document.getElementById('result_alpha').value = rgba[3];
        document.getElementById('colorSlider_R').value = rgba[0];
        document.getElementById('colorSlider_G').value = rgba[1];
        document.getElementById('colorSlider_B').value = rgba[2];
        document.getElementById('colorSlider_alpha').value = rgba[3];

        console.log(this.selectNum, this.selectDist[0]);
        break;
      }
    }
  };

  static onMove(e){
    if (this.dragFlag){
      let tmp=rectArray[this.selectNum];
      x=e.clientX-rect.left;
      y=e.clientY-rect.top;
      rectArray[this.selectNum].setPosition(
        x-this.selectDist[0], y-this.selectDist[1]);
      draw();
    }
  };
  static onUp(e){
    this.dragFlag=false;
  };

  static changeColor(e){
    console.log('changeColor');
    r = document.getElementById('result_R').value;
    g = document.getElementById('result_G').value;
    b = document.getElementById('result_B').value;
    a = document.getElementById('result_alpha').value;
    rectArray[this.selectNum].setFillColor(r,g,b,a);
    draw();
  }

  static reset(){
    this.selectNum=null;
    this.selectFlag=false;
    this.dragFlag=false;
    this.selectDist=[0,0];
  }
}

function onDown(e){
  if (typeof nowMode.onDown =='function'){
    nowMode.onDown(e);
  }
}
function onMove(e){
  if (typeof nowMode.onMove =='function'){
    nowMode.onMove(e);
  }
}
function onUp(e){
  if (typeof nowMode.onUp =='function'){
    nowMode.onUp(e);
  }
}

function changeColor(e){
  if (typeof nowMode.changeColor =='function'){
    nowMode.changeColor(e);
  }
}

function changeMode(modeFlag){
  if (modeFlag=="draw"){
    nowMode=drawMode;
  }else if(modeFlag=="select"){
    nowMode=selectMode;
  }

  if(modeFlag!="select"){
    selectMode.reset();
  }
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


function resetButtonClick(){
  strokeColor="black";
  rectArray=[];
  draw();
  console.log('reset');
}

let x, y, r, g, b, a;
let rectArray=[];
let rect = canvas.getBoundingClientRect();
let strokeColor="black";
let modeFlag="draw"
let nowMode=drawMode;

canvas.addEventListener('mousedown', onDown, false);
canvas.addEventListener('mousemove', onMove, false);
canvas.addEventListener('mouseup', onUp, false);
document.getElementById('colorSlider_R').addEventListener('input',changeColor, false);
document.getElementById('colorSlider_G').addEventListener('input',changeColor, false);
document.getElementById('colorSlider_B').addEventListener('input',changeColor, false);
document.getElementById('colorSlider_alpha').addEventListener('input',changeColor, false);

document.getElementById("resetButton").onclick=resetButtonClick;

mode.addEventListener('change', (event) => {
  modeFlag=document.getElementById("mode").mode.value;
  console.log(modeFlag);
  changeMode(modeFlag);
});
