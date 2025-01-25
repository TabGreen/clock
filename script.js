//constants
const width = 500;
const height = 500;
const inset = 15;
const updateTime = 30;

const light = 0.35;

const clockScaleWidth_blod = 8;
const clockScaleLength_blod = 8;
const clockScaleWidth_normal = 3;
const clockScaleLength_normal = 3;
const clockScaleColor = [0,0,0];

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
const radius = realWidth/2;
const clockFaceWidth = realWidth - clockBorderWidth*2;
const clockFaceRadius = clockFaceWidth/2;
//numbers
const 时钟上一大格的角度 = 30;
const 时钟上一小格的角度 = 30/4;
//cvsEl
const cvsEl = document.getElementById("canvas");
const ctx = cvsEl.getContext("2d");

const bufferEL = document.createElement('canvas');
const buffer = bufferEL.getContext("2d");
//setCVSEl
function setCVSElSize(){
    cvsEl.width = width;
    cvsEl.height = height;
    bufferEL.width = width;
    bufferEL.height = height;
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
    const clockBorderGradient = buffer.createLinearGradient(0,0,width,height);
    clockBorderGradient.addColorStop(0,color_text_light);
    clockBorderGradient.addColorStop(1,color_text);
    return clockBorderGradient;

}
//drawBorder
const clockBorderGradient = creatGradient(clockBorderColor);
function drawBorder(){
    buffer.beginPath();
    buffer.lineWidth = clockBorderWidth;
    buffer.strokeStyle = clockBorderGradient;
    buffer.arc(centerPos[0],centerPos[1],radius,0,Math.PI*2);
    buffer.closePath();
    buffer.stroke();
}
//drawFace
const clockFaceGradient = creatGradient(clockFaceColor);
const clockScaleGradient = creatGradient(clockScaleColor);
function drawFace(){
    function drawFace_BG(){
        buffer.beginPath();
        buffer.fillStyle = clockFaceGradient;
        buffer.arc(centerPos[0],centerPos[1],
            radius-clockBorderWidth/2
        ,0,Math.PI*2);
        buffer.closePath();
        buffer.fill();
    }
    function drawFace_scale(){//绘制刻度
        function drawScale(point1,point2,isBlod = false){
            buffer.beginPath();
            buffer.moveTo(point1[0],point1[1]);
            buffer.lineTo(point2[0],point2[1]);
            buffer.lineWidth = isBlod ? clockScaleWidth_blod : clockScaleWidth_normal;
            buffer.strokeStyle = clockScaleGradient;
            buffer.stroke();
        }
        for(let i = 0;i < 12;i++){
            let point1 = getPointOnCircle(clockFaceRadius,i*时钟上一大格的角度,clockFaceWidth);
            point1 =  point1.map((e)=>{return e + inset + clockBorderWidth});
            let point2 = getPointOnCircle(clockFaceRadius-clockScaleLength_blod,i*时钟上一大格的角度,clockFaceWidth);
            point2 = point2.map((e)=>{return e  + inset + clockBorderWidth});
            drawScale(point1,point2,true);

            for(let j = 1;j < 4;j++){
                let point1 = getPointOnCircle(clockFaceRadius-clockScaleLength_normal,i*时钟上一大格的角度+j*时钟上一小格的角度,clockFaceWidth);
                point1 = point1.map((e)=>{return e + inset + clockBorderWidth});
                let point2 = getPointOnCircle(clockFaceRadius-clockScaleLength_normal-clockScaleLength_normal,i*时钟上一大格的角度+j*时钟上一小格的角度,clockFaceWidth);
                point2 = point2.map((e)=>{return e + inset + clockBorderWidth});
                drawScale(point1,point2);
            }
        }
    }
    function drawCenterPoint(){
        //code here
    }

    drawFace_BG();
    drawFace_scale();
}
//getPointOnCircle
function getPointOnCircle(r, thetaDegrees, width) {
    // 将角度从度转换为弧度，并调整角度，使0度指向正上方
    const adjustedThetaDegrees = (thetaDegrees - 90) % 360; // 调整角度
    const thetaRadians = (adjustedThetaDegrees * Math.PI) / 180;
    // 计算 x 和 y 坐标
    let x = r * Math.cos(thetaRadians);
    let y = r * Math.sin(thetaRadians);
    // 调整坐标以适应 canvas 的坐标系统
    x += width / 2; // 圆心移至画布中心
    y += width / 2; // 反转 y 坐标并移至画布中心
    return [x, y];
}
//update
function renderFrame(){
    ctx.clearRect(0,0,width,height);
    ctx.drawImage(bufferEL,0,0);
}
function update(){
    buffer.clearRect(0,0,width,height);
    drawBorder();
    drawFace();

    renderFrame();
}
setInterval(update,updateTime);