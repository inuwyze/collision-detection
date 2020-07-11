const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');


// function drawCirlcle(){
//     ctx.beginPath();
//     ctx.arc(200,200,50,0,Math.PI*2,false);
//     ctx.fillStyle='#000';
//     ctx.fill();
//     ctx.closePath();
// }

// drawCirlcle();

function circle(x,y,r,c){
this.x=x;
    this.y=y;
    this.r=r;
    this.c=c;

    this.update=function(){
        this.draw();
    };

    this.draw=function(){
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2,false);
        ctx.fillStyle=this.c;
        ctx.fill();
        ctx.closePath();
    }


}

function getDistance(x1,y1,x2,y2){
    let xDistance=x2-x1;
    let yDistance=y2-y1;

    return (xDistance*xDistance+yDistance*yDistance)<=(circle1.r+circle2.r)*(circle1.r+circle2.r);
}


let circle1=new circle(300,300,100,'black');
let circle2=new circle(undefined,undefined,30,'red');

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    circle1.update();
    circle2.x=mouse.x;
    circle2.y=mouse.y;
    if (getDistance(circle1.x,circle1.y,circle2.x,circle2.y))
    {
        console.log('ola')
        circle1.c='red';
    }
    else
    circle1.c='black';
    circle2.update();
}

let mouse={
    x:100,
    y:100
}
// circle1.update();
animate();
addEventListener('mousemove',function(event){
    mouse.x=event.clientX;
    mouse.y=event.clientY;
});