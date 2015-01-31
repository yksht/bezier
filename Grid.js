// Grid object
var Grid = function(width, height){
	this.step = 10;
	this.width = width;
	this.height = height;
	this.cols = Math.floor(this.width / this.step);
	this.rows = Math.floor(this.height / this.step);
	this.color_grid = "#000000";
	this.show_grid = true;
}
Grid.prototype.toggleGrid = function(){
	this.show_grid = !this.show_grid;
}
Grid.prototype.setGridColor = function(color){
	this.color_grid = color;
}
Grid.prototype.draw = function(ctx){
	if (this.show_grid){
		ctx.lineWidth = 1;
		ctx.strokeStyle = this.color_grid;
		ctx.beginPath();
		for (var i = 0; i < this.width; i += this.step){
			ctx.moveTo(i, 0);
			ctx.lineTo(i, this.height);
		}
		for (var i = 0; i < this.height; i += this.step){
			ctx.moveTo(0, i);
			ctx.lineTo(this.width, i);
		}
		ctx.stroke();
	}
}
Grid.prototype.getPoint = function(event){
	var x = event.offsetX;
	var y = event.offsetY;
	var modx = x % this.step;
	var mody = y % this.step;
	var nearx = x - modx;
	var neary = y - mody;
	x = nearx;
	y = neary;
	if (modx > this.step / 2){
		x += this.step;
	}
	if (mody > this.step / 2){
		y += this.step;
	}
	return new Point(x, y);
}