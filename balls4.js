// collion detection on multiple circle moving objects


const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');
canvas.width = innerWidth
canvas.height = innerHeight

const color=[
    'red',
    'blue',
    'green',
    'orange'

];

function range(mn,mx){
    return Math.floor(Math.random()*(mx-mn+1)+mn)
}
circle_m=new circle(undefined,undefined,30,'green');

function circle(x,y,r,c){
this.x=x;
    this.y=y;
    this.r=r;
    this.c=c;
    this.m=1;
    this.v={
        x:(Math.random()-0.5)*5,
        y:(Math.random()-0.5)*5
    }

    this.update=function(){
        this.draw();
        for(let i=0;i<circles.length;i++){
            if(this!==circles[i] && getDistance(this.x,this.y,circles[i].x,circles[i].y)<=30*30){
                this.c=color[Math.floor(Math.random()*4)];
                circles[i].c=color[Math.floor(Math.random()*4)];
                
                resolveCollision(this,circles[i]);
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

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}


function resolveCollision(circle,othercircle){
    const xVelocityDiff=circle.v.x-othercircle.v.x;
    const yVelocityDiff=circle.v.y-othercircle.v.y;

    const xDist=othercircle.x-circle.x;
    const yDist=othercircle.y- circle.y;
    if(xVelocityDiff*xDist+yVelocityDiff*yDist>=0){
        const angle=-Math.atan2(othercircle.y-circle.y,othercircle.x-circle.x);
        const m1=circle.m;
        const m2=othercircle.m;

        const u1=rotate(circle.v,angle);
        const u2=rotate(othercircle.v,angle);

        const v1={x:u1.x*(m1-m2)/(m1+m2)+u2.x*2*m2/(m1+m2),y:u1.y}
        const v2={x:u2.x*(m1-m2)/(m1+m2)+u1.x*2*m2/(m1+m2),y:u2.y}
        
        const vFinal1=rotate(v1,-angle);
        const vFinal2=rotate(v2,-angle);

        circle.v.x=vFinal1.x;
        circle.v.y=vFinal1.y;
        othercircle.v.x=vFinal2.x;
        othercircle.v.y=vFinal2.y;
    }

}






function getDistance(x1,y1,x2,y2){
    let xDistance=x2-x1;
    let yDistance=y2-y1;

    return (xDistance*xDistance+yDistance*yDistance);
}

function init(){
    circles=[];
    
    for (let i=0;i<100;i++){
        let x=range(100,canvas.width-100);
        let y=range(100,canvas.height-100);
        
        if(i!==0){
            for(let j=0;j<circles.length;j++){
               
                if (getDistance(x,y,circles[j].x,circles[j].y)<=30*30 )
                {
                    
                        x=range(100,canvas.width-100);
                        y=range(100,canvas.height-100);
                        
                        j=-1;
                    }
            }
        }
        circles.push(new circle(x,y,15,color[randomColor()]));
    }
    

}

function randomColor(){
    console.log(Math.floor(Math.random()*color.length))
    return Math.floor(Math.random()*color.length);
}
init();
function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    circles.forEach(circle => {
        circle.update();
    });
    circle_m.update();
    
    requestAnimationFrame(animate);
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