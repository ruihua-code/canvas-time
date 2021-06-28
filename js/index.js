function renderTime() {
    let top = 0;
    let lineGap = 10;
    let lineShort = 50;
    let lineLong = 80;
    let canvas = document.getElementById("canvas");
    canvas.height = canvas.height * window.devicePixelRatio;
    canvas.width = canvas.width * window.devicePixelRatio;
    console.log(canvas.height, canvas.width, window.devicePixelRatio)
    let ctx = canvas.getContext("2d");
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