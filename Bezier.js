// Bezier object
var Bezier = function(){
	this.points = [];
	this.step = 2;
	this.shift = 100;
	this.color_bound_selected = "#000000";
	this.color_curve = "#000000";
	this.color_curve = "#000000";
	this.color_line = "#000000";
	this.bound_top = null;
	this.bound_bottom = null;
	this.show_bounds = true;
	this.show_lines = true;
	this.show_curve = true;
	this.show_points = true;
	this.show_indexes = true;
	this.selected = false;
}
Bezier.prototype.toggleBounds = function(){
	this.show_bounds = !this.show_bounds;
}
Bezier.prototype.toggleLines = function(){
	this.show_lines = !this.show_lines;
}
Bezier.prototype.toggleCurve = function(){
	this.show_curve = !this.show_curve;
}
Bezier.prototype.togglePoints = function(){
	this.show_points = !this.show_points;
}
Bezier.prototype.toggleIndexes = function(){
	this.show_indexes = !this.show_indexes;
}
Bezier.prototype.setCurveColor = function(color){
	this.color_curve = color;
}
Bezier.prototype.setBoundColor = function(color){
	this.color_bound = color;
}
Bezier.prototype.setBoundSelectedColor = function(color){
	this.color_bound_selected = color;
}
Bezier.prototype.setLineColor = function(color){
	this.color_line = color;
}
Bezier.prototype.calculateBounds = function(){
	var minx = 99999, maxx = -1, miny = 99999, maxy = -1;
	for (var i = 0; i < this.points.length; ++i){
		minx = Math.min(minx, this.points[i].x);
		maxx = Math.max(maxx, this.points[i].x);
		miny = Math.min(miny, this.points[i].y);
		maxy = Math.max(maxy, this.points[i].y);
	}
	this.bound_top = new Point(minx, miny);
	this.bound_bottom = new Point(maxx, maxy);
}
Bezier.prototype.addPoint = function(point){
	this.points.push(point);
	this.calculateBounds();
}
Bezier.prototype.removePoint = function(index){
	this.points.splice(index, 1);
	this.calculateBounds();
}
Bezier.prototype.clickPoint = function(event){
	var clicked = false;
	for (var i = 0; i < this.points.length; ++i){
		if (this.points[i].clicked(event)){
			this.movingPoint = i;
			clicked = true;
			break;
		}
	}
	return clicked;
}
Bezier.prototype.clickCurve = function(event){
	if (this.bound_top.x <= event.offsetX && this.bound_bottom.x >= event.offsetX &&
		this.bound_top.y <= event.offsetY && this.bound_bottom.y >= event.offsetY){
		return true;
	}
	return false;
}
Bezier.prototype.movePoint = function(point){
	this.points[this.movingPoint].setXY(point.x, point.y);
	this.calculateBounds();
}
Bezier.prototype.moveCurve = function(point){
	var difx = this.startPoint.x - point.x;
	var dify = this.startPoint.y - point.y;
	for (var i = 0; i < this.points.length; ++i){
		this.points[i].setXY(this.points[i].x - difx, this.points[i].y - dify);
	}
	this.startPoint = point;
	this.calculateBounds();
}
Bezier.prototype.draw = function(ctx){
	if (this.show_bounds){
		this.drawBounds(ctx);
	}
	if (this.show_lines){
		this.drawLines(ctx);
	}
	if (this.show_curve){
		this.drawCurve(ctx);
	}
	if (this.show_points){
		this.drawPoints(ctx);
	}
	if (this.show_indexes){
		this.drawIndexes(ctx);
	}
}
Bezier.prototype.drawPoints = function(ctx){
	for (var i = 0; i < this.points.length; ++i){
		this.points[i].draw(ctx);
	}
}
Bezier.prototype.drawIndexes = function(ctx){
	ctx.font = "10px sans-serif";
	for (var i = 0; i < this.points.length; ++i){
		ctx.fillText(i + 1, this.points[i].x - 3, this.points[i].y + this.points[i].r + 10);
	}
}
Bezier.prototype.drawBounds = function(ctx){
	ctx.lineWidth = 1;
	if (this.selected){
		ctx.strokeStyle = this.color_bound_selected;
	} else {
		ctx.strokeStyle = this.color_bound;
	}
	ctx.beginPath();
	ctx.moveTo(this.bound_top.x, this.bound_top.y);
	ctx.lineTo(this.bound_bottom.x, this.bound_top.y);
	ctx.lineTo(this.bound_bottom.x, this.bound_bottom.y);
	ctx.lineTo(this.bound_top.x, this.bound_bottom.y);
	ctx.lineTo(this.bound_top.x, this.bound_top.y);
	ctx.stroke();
}
Bezier.prototype.drawLines = function(ctx){
	ctx.lineWidth = 1;
	ctx.strokeStyle = this.color_line;
	ctx.beginPath();
	ctx.moveTo(this.points[0].x, this.points[0].y);
	for (var i = 1; i < this.points.length; ++i){
		ctx.lineTo(this.points[i].x, this.points[i].y);
	}
	ctx.stroke();
}
Bezier.prototype.drawCurve = function(ctx){
	ctx.lineWidth = 1;
	ctx.strokeStyle = this.color_curve;
	ctx.beginPath();
	ctx.moveTo(this.points[0].x, this.points[0].y);
	for (var i = 0; i <= this.shift; i += this.step){
		var point = this.getPointOnCurve(i, this.points);
		ctx.lineTo(point.x, point.y);
	}
	ctx.stroke();
}
Bezier.prototype.getPointOnCurve = function(shift, points){
	if (points.length == 2){
		return this.getPointOnLine(shift, points);
	}
	var pointsPP = [];
	for (var i = 1; i < points.length; i++){
		pointsPP.push(this.getPointOnLine(shift, [points[i - 1], points[i]]));
	}
	return this.getPointOnCurve(shift, pointsPP);
}
Bezier.prototype.getPointOnLine = function(shift, points){
	return new Point((points[1].x - points[0].x) * (shift / 100) + points[0].x,
					 (points[1].y - points[0].y) * (shift / 100) + points[0].y);
}