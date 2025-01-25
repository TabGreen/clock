//constants
const width = 500;
const height = 500;
const inset = 10;
const updateTime = 30;

const clockBorderColor = [0,0,0];
const clockBorderWidth = 5;

const clockFaceColor = [255,255,255];

const clockHourHandColor = [0,0,0];
const clockHourHandWidth = 5;
const clockHourHandLengthOfHeight = 0.5;

const clockMinuteHandColor = [0,0,0];
const clockMinuteHandWidth = 3;
const clockMinuteHandLengthOfHeight = 0.7;

const clockSecondHandColor = [255,0,0];
const clockSecondHandWidth = 2;
const clockSecondHandLengthOfHeight = 0.9;
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