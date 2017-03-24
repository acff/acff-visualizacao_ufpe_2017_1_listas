window.onload = function() {
	  var margin = {top: 50, right: 50, bottom:50, left: 60};

	  var width = 800- margin.left - margin.right;
	  var height = 500 - margin.top - margin.bottom;

	  var monthScale = d3.scaleTime()
	  	.domain([new Date(2000, 0, 1), new Date(2000, 10, 31)])
	  	.range([0,width]);

	  var mySVG = d3.select("body").append("svg")
	        .attr("width", width + margin.left + margin.right) 
	        .attr("height", height + margin.top + margin.bottom) 
	        .append("g")
	        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	  var xAxis = d3.axisTop(monthScale)
	  		.tickFormat(d3.timeFormat("%b"));

	  var mySVGAxisGroupX = mySVG.append("g");
	  var mySVGAxisGroupY = mySVG.append("g");

	  var xScale = d3.scaleLinear()
	    .domain([0, 11])
	    .range([0, width]);

	  var yScale = d3.scaleLinear()
	    .domain([10, 30])
	    .range([height, 0]);

	  var yAxis = d3.axisLeft()
	    .scale(yScale);
	 
	  var line = d3.line()
	    .x(function(d) { return xScale(d.x); })
	    .y(function(d) { return yScale(d.y); });

	  //Average high
	  var datasetAvaregeHigh = [
		  {x: 0, y: 27.3},
		  {x: 1, y: 28},
		  {x: 2, y: 27.2},
		  {x: 3, y: 25.1},
		  {x: 4, y: 23},
		  {x: 5, y: 21.8},
		  {x: 6, y: 21.8},
		  {x: 7, y: 23.3},
		  {x: 8, y: 23.9},
		  {x: 9, y: 24.8},
		  {x: 10, y: 25.9},
		  {x: 11, y: 26.3}
		];

		 //Daily mean
	  var datasetDailyMean = [
		  {x: 0, y: 22.1},
		  {x: 1, y: 22.4},
		  {x: 2, y: 21.8},
		  {x: 3, y: 19.7},
		  {x: 4, y: 17.4},
		  {x: 5, y: 16.3},
		  {x: 6, y: 15.8},
		  {x: 7, y: 17.1},
		  {x: 8, y: 17.9},
		  {x: 9, y: 19},
		  {x: 10, y: 20.2},
		  {x: 11, y: 21.1}
		];

	//Average low
	  var datasetAvaregeLow = [
		  {x: 0, y: 18.7},
		  {x: 1, y: 18.8},
		  {x: 2, y: 18.2},
		  {x: 3, y: 16.3},
		  {x: 4, y: 13.8},
		  {x: 5, y: 12.4},
		  {x: 6, y: 11.7},
		  {x: 7, y: 12.8},
		  {x: 8, y: 13.9},
		  {x: 9, y: 15.3},
		  {x: 10, y: 16.6},
		  {x: 11, y: 17.7}
		];

		mySVG.append("path")
	      .data([datasetAvaregeHigh])
	      .attr("d", line)
	      .attr("style", "stroke:red;fill: none;stroke-width: 2px;");

	    mySVG.append("path")
	      .data([datasetDailyMean])
	      .attr("d", line)
	      .attr("style", "stroke:blue;fill: none;stroke-width: 2px;");

	    mySVG.append("path")
	      .data([datasetAvaregeLow])
	      .attr("d", line)
	      .attr("style", "stroke:gray;fill: none;stroke-width: 2px;");

		mySVGAxisGroupX.call(xAxis);
		mySVGAxisGroupY.call(yAxis);
}