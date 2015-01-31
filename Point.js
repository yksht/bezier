// Point object
var Point = function(x, y){
	this.x = x;
	this.y = y;
	this.r = 6;
	this.xmin = this.x - this.r;
	this.xmax = this.x + this.r;
	this.ymin = this.y - this.r;
	this.ymax = this.y + this.r;
	this.color_point = "#000000";
}
Point.prototype.setPointColor = function(color){
	this.color_point = color;
}
Point.prototype.setXY = function(x, y){
	this.x = x;
	this.y = y;
	this.xmin = this.x - this.r;
	this.xmax = this.x + this.r;
	this.ymin = this.y - this.r;
	this.ymax = this.y + this.r;
}
Point.prototype.draw = function(ctx){
	ctx.lineWidth = 1;
	ctx.fillStyle = this.color_point;
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
	ctx.fill();
}
Point.prototype.clicked = function(event){
	if (this.xmin <= event.offsetX && this.xmax >= event.offsetX &&
		this.ymin <= event.offsetY && this.ymax >= event.offsetY){
		return true;
	}
	return false;
}