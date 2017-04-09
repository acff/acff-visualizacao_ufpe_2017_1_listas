var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 900 - margin.left - margin.right,
    height = 900 - margin.top - margin.bottom;

var posX = 0,
	posY = 0;

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var jsonData = [];

d3.json("egrid2010.json", function(json) {
	for (i = 0; i < 2; i++){
		for (j = 0; j < 2; j++){
			var id = i + "" + j;
			var myG1 = svg.append("g");
			var myScatterplot1 = new Scatterplot(posX, posY, margin, 400, 400, svg, id);
			myScatterplot1.setData(json, "nameplate", "generation", j, i);
			posX += 300;
		}
		posY += 300;
		posX = 0;
	}
});

