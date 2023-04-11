let Progress = function (options) {
  this.init(options);
};
Progress.prototype = {
  init: function (options) {
    this.el = options.el; //元素ID
    this.options = options;
    options.deg = (options.percent / 100) * 360;

    let cvsElement = document.getElementById(this.el), //获取元素
      width = cvsElement.width, //元素宽度
      height = cvsElement.height; //元素高度

    this.ctx = cvsElement.getContext("2d"); //获取画笔

    //线宽
    options.lineWidth !== undefined
      ? (this.lineWidth = options.lineWidth)
      : (this.lineWidth = 20);

    //判断宽高较小者
    this.wh = width > height ? height : width;

    //设置圆的半径，默认为宽高较小者
    options.circleRadius > 0 &&
    options.circleRadius <= this.wh / 2 - this.lineWidth / 2
      ? (this.circleRadius = options.circleRadius)
      : (this.circleRadius = this.wh / 2 - this.lineWidth / 2);

    //绘制线的背景颜色
    options.lineBgColor !== undefined
      ? (this.lineBgColor = options.lineBgColor)
      : (this.lineBgColor = "#ccc");

    //绘制线的颜色
    options.lineColor !== undefined
      ? (this.lineColor = options.lineColor)
      : (this.lineColor = "#009ee5");

    //绘制文字颜色
    options.textColor !== undefined
      ? (this.textColor = options.textColor)
      : (this.textColor = "#009ee5");

    //绘制文字大小
    options.fontSize !== undefined
      ? (this.fontSize = options.fontSize)
      : (this.fontSize = parseInt(this.circleRadius / 2));

    //清除锯齿
    if (window.devicePixelRatio) {
      cvsElement.style.width = width + "px";
      cvsElement.style.height = height + "px";
      cvsElement.height = height * window.devicePixelRatio;
      cvsElement.width = width * window.devicePixelRatio;
      this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    //设置线宽
    this.ctx.lineWidth = this.lineWidth;

    this.draw();
  },
  draw: function () {
    let ctx = this.ctx;
    let cvsElement = document.getElementById(this.el), //获取元素
      width = cvsElement.width, //元素宽度
      height = cvsElement.height; //元素高度
    ctx.clearRect(0, 0, width, height); //清除画布
    ctx.beginPath(); //开始绘制底圆
    ctx.arc(width / 2, height / 2, this.circleRadius, 1, 8);
    ctx.strokeStyle = this.lineBgColor;
    ctx.stroke();
    ctx.beginPath(); //开始绘制动态圆
    ctx.arc(
      width / 2,
      height / 2,
      this.circleRadius,
      -Math.PI / 2,
      (this.options.deg * Math.PI) / 180 - Math.PI / 2
    );
    ctx.strokeStyle = this.lineColor;
    ctx.stroke();
    let txt = parseInt((this.options.deg * 100) / 360) + "%"; //获取百分比
    ctx.font = this.fontSize + "px SimHei";
    let w = ctx.measureText(txt).width; //获取文本宽度
    let h = this.fontSize / 2;
    ctx.fillStyle = this.textColor;
    ctx.fillText(txt, width / 2 - w / 2, height / 2 + h / 2);
  },
  set: function (percent, time) {
    let _this = this;
    let prev = this.options.deg;
    let l = (percent / 100) * 360 - prev;
    
    if (l<=0) {
        return
    }
    let i = 0
    let timer = setInterval(()=>{
        _this.options.deg = Math.round(prev + (i+1) * ((l / time) * 20));
        _this.draw();
        i++
        if (i == time / 20) {
            clearInterval(timer)
        }
    },20)
  },
};
