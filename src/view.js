class View {
  constructor(ctx) {
    this.ctx = ctx;

    this.ctx.beginPath();
    this.ctx.rect(20, 40, 50, 50);
    this.ctx.fillStyle = "#FF0000";
    this.ctx.fill();
    this.ctx.closePath();
  }
}

export default View;