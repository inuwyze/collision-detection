// collion detection on multiple circle moving objects


const canvas=document.getElementById('canvas');
const ctx=canvas.getContext('2d');
canvas.width = innerWidth
canvas.height = innerHeight
// console.log(innerHeight)
// console.log(innerWidth)

// function drawCirlcle(){
//     ctx.beginPath();
//     ctx.arc(200,200,50,0,Math.PI*2,false);
//     ctx.fillStyle='#000';
//     ctx.fill();
//     ctx.closePath();
// }

// drawCirlcle();
const color=[
    'red',
    'blue',
    'green',
    'yellow'
]

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
    this.colli=0;
    this.v={
        x:(Math.random()-0.5)*4,
        y:(Math.random()-0.5)*4
    }
    
    this.update=function(){
      
        
        for(let i=0;i<circles.length;i++){
            if(this!==circles[i] && getDistance(this.x,this.y,circles[i].x,circles[i].y)<=200*200){
                this.c='red';
                circles[i].c='red';
                
                this.draw();
                circles[i].draw();
                
                resolveCollision(this,circles[i]);
            }
            
        }
        
        if(this.x-this.r<=0||this.x+this.r>=innerWidth)
        this.v.x*=-1
        if(this.y-this.r<=0||this.y+this.r>=innerHeight)
        this.v.y*=-1
        this.x+=this.v.x;
        this.y+=this.v.y;
        this.draw();
        this.c='blue';
    };
    
    this.draw=function(){
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.r,0,Math.PI*2,false);
        ctx.fillStyle=this.c;
        ctx.fill();
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