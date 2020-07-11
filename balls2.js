// collion detection on multiple circle moving objects


const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');
canvas.width = innerWidth
canvas.height = innerHeight


function range(mn,mx){
    return Math.floor(Math.random()*(mx-mn+1)+mn)
}
circle_m=new circle(undefined,undefined,30,'green');

function circle(x,y,r,c){
this.x=x;
    this.y=y;
    this.r=r;
    this.c=c;
    this.v={
        x:Math.random()-0.5,
        y:Math.random()-0.5
    }

    this.update=function(){
        this.draw();
        for(let i=0;i<circles.length;i++){
            if(this!==circles[i] && getDistance(this.x,this.y,circles[i].x,circles[i].y)<=200*200){
                this.c='red';
            }
        }

        if(this.x-this.r<=0||this.x+this.r>=innerWidth)
            this.v.x*=-1
        if(this.y-this.r<=0||this.y+this.r>=innerHeight)
            this.v.y*=-1
        this.x+=this.v.x;
        this.y+=this.v.y;
    };

    this.draw=function(){
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2,false);
        ctx.strokeStyle=this.c;
        ctx.stroke();
        ctx.closePath();
    }


}

function getDistance(x1,y1,x2,y2){
    let xDistance=x2-x1;
    let yDistance=y2-y1;

    return (xDistance*xDistance+yDistance*yDistance);
}

function init(){
    circles=[];
    
    for (let i=0;i<4;i++){
        let x=range(100,canvas.width-100);
        let y=range(100,canvas.height-100);
        
        if(i!==0){
            for(let j=0;j<circles.length;j++){
                console.log(getDistance(x,y,circles[j].x,circles[j].x));
                if (getDistance(x,y,circles[j].x,circles[j].y)<=200*200 )
                {
                    
                        x=range(100,canvas.width-100);
                        y=range(100,canvas.height-100);
                        
                        j=-1;
                    }
            }
        }
        circles.push(new circle(x,y,100,'blue'));
    }
    console.log(circles)

}
init();
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    requestAnimationFrame(animate);
    circles.forEach(circle => {
        circle.update();
    });


    circle_m.x=mouse.x;
    circle_m.y=mouse.y;
    circle_m.c='green';

    for(let i=0;i<circles.length;i++){
        if(getDistance(circle_m.x,circle_m.y,circles[i].x,circles[i].y)<=130*130){
            circles[i].c='red';
        }
    }
    circle_m.update();
   
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