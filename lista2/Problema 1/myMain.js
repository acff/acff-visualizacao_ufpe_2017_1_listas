var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 970 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var histogram = new Histogram(500, 0, margin, width, height, svg, 1);

histogram.setData(trips);
histogram.generateHistogram();

var myG1 = svg.append("g");
var myScatterplot1 = new Scatterplot(470, -20, margin, width, height, svg, "sc1");

myScatterplot1.setData(trips);


var myDispatch = d3.dispatch("selectionChanged");
myDispatch.on("selectionChanged",function(){
	//console.log("Update histogram!");
	histogram.refresh(this.objects);
});

myScatterplot1.dispatch = myDispatch;
