// Canvas object
var Canvas = function(object){
	this.canvas = object;
	this.curves = [];
	this.curves_count = 2;
	this.points = Math.floor(Math.random() * 3 + 3);
	this.color_bound_selected = "#a6a6a6";
	this.color_bound = "#c6c6c6";
	this.color_curve = "#0eb1a2";
	this.color_point = "#f20d52";
	this.color_line = "#5ad22d";
	this.color_grid = "#e5e5e5";
}
Canvas.prototype.init = function(){
	for (var i = 0; i < this.curves_count; ++i){
		this.addCurve();
	}
}
Canvas.prototype.setWidth = function(width){
	$(this.canvas).attr('width', width);
}
Canvas.prototype.setHeight = function(height){
	$(this.canvas).attr('height', height);
}
Canvas.prototype.setContext = function(){
	this.ctx = this.canvas.getContext('2d');
	this.width = this.canvas.width;
	this.height = this.canvas.height;
	this.grid = new Grid(this.width, this.height);
	this.grid.setGridColor(this.color_grid);
}
Canvas.prototype.getContext = function(){
	return this.ctx;
}
Canvas.prototype.addCurve = function(){
	this.curves.push(new Bezier());
	this.curves_count = this.curves.length;
	this.curves[this.curves_count - 1].setCurveColor(this.color_curve);
	this.curves[this.curves_count - 1].setBoundColor(this.color_bound);
	this.curves[this.curves_count - 1].setLineColor(this.color_line);
	for (var j = 0; j < this.points; ++j){
		this.curves[this.curves_count - 1].addPoint(
			new Point(
				Math.floor(Math.random() * this.grid.cols + 1) * this.grid.step,
				Math.floor(Math.random() * this.grid.rows + 1) * this.grid.step
			)
		);
		this.curves[this.curves_count - 1].points[j].setPointColor(this.color_point);
	}
}
Canvas.prototype.removeCurve = function(){
	if (this.curves[0].selected){
		this.curves.splice(0, 1);
		this.curves_count = this.curves.length;
	} else {
		alert('Select curve');
	}
}
Canvas.prototype.addPoint = function(){
	if (this.curves[0].selected){
		this.curves[0].addPoint(
			new Point(
				Math.floor(Math.random() * this.grid.cols + 1) * this.grid.step,
				Math.floor(Math.random() * this.grid.rows + 1) * this.grid.step
			)
		);
		this.curves[0].points[this.curves[0].points.length - 1].setPointColor(this.color_point);
	} else {
		alert('Select curve');
	}
}
Canvas.prototype.removePoint = function(){
	if (this.curves[0].selected){
		this.curves[0].removePoint(this.curves[0].points.length - 1);
	} else {
		alert('Select curve');
	}
}
Canvas.prototype.draw = function(){
	this.ctx.clearRect(0, 0, this.width, this.height);
	this.grid.draw(this.ctx);
	for (var i = this.curves_count - 1; i >= 0; --i){
		this.curves[i].draw(this.ctx);
	}
}
Canvas.prototype.setBoundSelectedColor = function(color){
	this.color_bound_selected = color;
	for (var i = 0; i < this.curves_count; ++i){
		this.curves[i].setBoundSelectedColor(this.color_bound_selected);
	}
}
Canvas.prototype.setBoundColor = function(color){
	this.color_bound = color;
	for (var i = 0; i < this.curves_count; ++i){
		this.curves[i].setBoundColor(this.color_bound);
	}
}
Canvas.prototype.setCurveColor = function(color){
	this.color_curve = color;
	for (var i = 0; i < this.curves_count; ++i){
		this.curves[i].setCurveColor(this.color_curve);
	}
}
Canvas.prototype.setPointColor = function(color){
	this.color_point = color;
	for (var i = 0; i < this.curves_count; ++i){
		for (var j = 0; j < this.curves[i].points.length; ++j){
			this.curves[i].points[j].setPointColor(this.color_point);
		}
	}
}
Canvas.prototype.setLineColor = function(color){
	this.color_line = color;
	for (var i = 0; i < this.curves_count; ++i){
		this.curves[i].setLineColor(this.color_line);
	}
}
Canvas.prototype.setGridColor = function(color){
	this.color_grid = color;
	this.grid.setGridColor(this.color_grid);
}
Canvas.prototype.toggleBounds = function(){
	for (var i = 0; i < this.curves_count; ++i){
		this.curves[i].toggleBounds();
	}
}
Canvas.prototype.toggleCurves = function(){
	for (var i = 0; i < this.curves_count; ++i){
		this.curves[i].toggleCurve();
	}
}
Canvas.prototype.togglePoints = function(){
	for (var i = 0; i < this.curves_count; ++i){
		this.curves[i].togglePoints();
	}
}
Canvas.prototype.toggleLines = function(){
	for (var i = 0; i < this.curves_count; ++i){
		this.curves[i].toggleLines();
	}
}
Canvas.prototype.toggleGrid = function(){
	this.grid.toggleGrid();
}
Canvas.prototype.toggleIndexes = function(){
	for (var i = 0; i < this.curves_count; ++i){
		this.curves[i].toggleIndexes();
	}
}