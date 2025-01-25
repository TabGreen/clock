//constants
const width = 500;
const height = 500;
const inset = 15;
const updateTime = 30;

const light = 0.35;

const clockBorderColor = [10,10,10];
const clockBorderWidth = 15;

const clockFaceColor = [240,240,240];

const clockHourHandColor = [0,0,0];
const clockHourHandWidth = 5;
const clockHourHandLengthOfHeight = 0.5;

const clockMinuteHandColor = [0,0,0];
const clockMinuteHandWidth = 3;
const clockMinuteHandLengthOfHeight = 0.7;

const clockSecondHandColor = [255,0,0];
const clockSecondHandWidth = 2;
const clockSecondHandLengthOfHeight = 0.9;
//otherConstants
const centerPos = [width/2,height/2];
const realWidth = width - inset*2;
const realHeight = height - inset*2;
const radius = Math.min(realWidth,realHeight)/2;
//cvsEl
const cvsEl = document.getElementById("canvas");
const ctx = cvsEl.getContext("2d");
//setCVSEl
function setCVSElSize(){
    cvsEl.width = width;
    cvsEl.height = height;
}
function setCVSElPos(){
    cvsEl.style.top = (window.innerHeight - height)/2 + 'px';
    cvsEl.style.left = (window.innerWidth - width)/2 + 'px';
}
setCVSElSize();
setCVSElPos();
addEventListener('resize',setCVSElPos);
//getTime
function getTime(){
    let time = new Date();

    return [
        time.getHours(),
        time.getMinutes(),
        time.getSeconds(),
        time.getMilliseconds()//获取毫秒是为了给秒针提供更精细的动画
    ]
}
//Tolight
function Tolight(color,percent){
    let newColor = [];
    for(let i = 0;i < 3;i++){
        let c = color[i] + percent*(255 - color[i]);
        if(c > 255){c = 255;}else if(c < 0){c = 0;}
        newColor.push(c);
    }
    return newColor;
}
//creatGradient
function creatGradient(color){
    const color_text = `rgb(${color[0]},${color[1]},${color[2]})`;
    let color2 = Tolight(color,light);
    const color_text_light = `rgb(${color2[0]},${color2[1]},${color2[2]})`;
    const clockBorderGradient = ctx.createLinearGradient(0,0,width,height);
    clockBorderGradient.addColorStop(0,color_text_light);
    clockBorderGradient.addColorStop(1,color_text);
    return clockBorderGradient;

}
//drawBorder
const clockBorderGradient = creatGradient(clockBorderColor);
function drawBorder(){
    ctx.beginPath();
    ctx.lineWidth = clockBorderWidth;
    ctx.strokeStyle = clockBorderGradient;
    ctx.arc(centerPos[0],centerPos[1],radius,0,Math.PI*2);
    ctx.closePath();
    ctx.stroke();
}
//drawFace
const clockFaceGradient = creatGradient(clockFaceColor);
function drawFace(){
    function drawFace_BG(){
        ctx.beginPath();
        ctx.fillStyle = clockFaceGradient;
        ctx.arc(centerPos[0],centerPos[1],
            radius-clockBorderWidth/2
        ,0,Math.PI*2);
        ctx.closePath();
        ctx.fill();
    }
    function drawFace_scale(){//绘制刻度
        //code here
    }

    drawFace_BG();
}

//update
function update(){
    ctx.clearRect(0,0,width,height);
    drawBorder();
    drawFace();
}
setInterval(update,updateTime);