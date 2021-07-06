let canvas = document.getElementById("canvas");
let selectAreaCanvas = document.getElementById("selectArea");
selectAreaCanvas.height = canvas.height * window.devicePixelRatio;
selectAreaCanvas.width = canvas.width * window.devicePixelRatio;
canvas.height = canvas.height * window.devicePixelRatio;
canvas.width = canvas.width * window.devicePixelRatio;
console.log(canvas.height, canvas.width, window.devicePixelRatio)
let ctx = canvas.getContext("2d");
let ctxSelect = selectAreaCanvas.getContext("2d");
function renderTime() {
    let top = 0;
    let lineGap = 10;
    let lineShort = 50;
    let lineLong = 80;


    // 解决渲染模糊
    ctx.translate(0.5, 0.5);

    // 字体大小和字体颜色
    ctx.fillStyle = "#fff"
    ctx.font = "20px Georgia";

    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.lineWidth = 1;
    let hour = -1
    for (let i = 0; i < 1440; i += 1) {
        if (i % 5 === 0) {
            if (i % 60 === 0) {
                ctx.moveTo(lineGap * i, top);
                ctx.lineTo(lineGap * i, 110);
                hour++;
                // 计算字体宽度，用来定位字体位置对齐线条
                let textWidth = ctx.measureText(hour).width;
                ctx.fillText(hour, (lineGap * i) - (textWidth / 2), 130);
            } else {
                ctx.moveTo(lineGap * i, top);
                ctx.lineTo(lineGap * i, lineLong);
            }

        } else {
            ctx.moveTo(lineGap * i, top);
            ctx.lineTo(lineGap * i, lineShort);
        }
    }
    ctx.stroke();
}

renderTime()


/**
 * 
 * @param {Number} x 线条x坐标值 
 */
function drawLine(x) {
    ctxSelect.strokeStyle = "#fff";
    ctxSelect.beginPath()
    ctxSelect.moveTo(x, 0);
    ctxSelect.lineTo(x, 200);
    ctxSelect.stroke()
}

let rectList = [];
let x1 = 0;
function onMousedown(e) {
    ctxSelect.fillStyle = "rgba(255,255,0,0.5)"
    x1 = e.offsetX;
    ctxSelect.beginPath()
}

function onMouseup(e) {
    ctxSelect.clearRect(x1, 0, e.offsetX - x1, 200);
    ctxSelect.rect(x1, 0, e.offsetX - x1, 200);
    ctxSelect.closePath();
    ctxSelect.fill();
    rectList.push([x1, e.offsetX - x1])

}

function onMousemove(e) {
    console.log("move")
}


function onClearRect() {
    console.log(canvas.width, canvas.height)
    ctxSelect.clearRect(0, 0, canvas.width, canvas.height)
}


let regionMouseFlag = false

function onRegionMousedown(e) {
    console.log(e)
    regionMouseFlag = true
}

let zrh = document.getElementById("zrh")
function onRegionMousemove(e) {
    if (regionMouseFlag === true) {
        console.log(e.offsetX, zrh.style.width)
        zrh.style.left = e.offsetX + "px"
    }
}

function onRegionMouseup(e) {
    console.log("up")
    regionMouseFlag = false
}