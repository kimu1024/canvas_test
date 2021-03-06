export class drawRectangle{
  constructor(x,y,r,g,b,a){
    this.position = [x,y];
    this.size =[0,0];
    this.strokeColor="rgba(0,0,0,1)";
    this.setFillColor(r,g,b,a);
  };

  setPosition(x,y){
    this.position[0]=x;
    this.position[1]=y;
  };

  setSize(width,height){
    this.size[0]=width;
    this.size[1]=height;
  };

  setStrokeColor(r,g,b,a){
    this.strokeColor="rgba("+r+","+g+","+b+","+a+")";
  };

  isInside(x,y){
    return (x>this.position[0])&&
    (x<this.position[0]+this.size[0])&&
    (y>this.position[1])&&
    (y<this.position[1]+this.size[1]);
  };

  getStrokeColor(){
    let str = this.strokeColor.replace("rgba(","");
    str = str.replace(")","");
    return str.split(",");
  };


  setFillColor(r,g,b,a){
    this.fillColor="rgba("+r+","+g+","+b+","+a+")";
    console.log(this.fillColor);
  };

  getFillColor(){
    let str = this.fillColor.replace("rgba(","");
    str = str.replace(")","");
    return str.split(",");
  };

  drawObject(ctx){
    ctx.fillStyle=this.fillColor;
    ctx.fillRect(this.position[0],this.position[1],this.size[0],this.size[1]);
    ctx.strokeStyle=this.strokeColor;
    ctx.strokeRect(this.position[0],this.position[1],this.size[0],this.size[1]);
  };

}
