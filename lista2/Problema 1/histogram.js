class Histogram{

	constructor(x , y, margin, width, height, container, id){
		this.id = id;
		this.x = x;
		this.y = y;
		this.data = []; //[{carrier:value, tripsLen:value}, ...]
		
		this.margin = margin;
		this.width = width/2;
		this.height = height/2;

		this.container = container;
		this.canvas = this.container.append("g");
		this.canvas.attr("transform","translate("+(this.x+this.margin.left) + "," + (this.y+this.margin.top) + ")");

		//Setting scales
		this.xScale = d3.scaleBand().range([0, this.width]).padding(0.1);
		this.yScale = d3.scaleLinear().range([this.height, 0]);
	}

	setData(trips){
		var i = 0;
		var tripsByCarrier = {};

		//Data have a format: [{carrier:value, tripsLen:value}, ...]
		for (i = 0; i < trips.length; i++){
			if(isNaN(tripsByCarrier[trips[i].carrier]))
			{
				this.data.carrier = 1;
				tripsByCarrier[trips[i].carrier] = 1;
			}else{
				tripsByCarrier[trips[i].carrier] += 1;
			}
		}

		for (trips in tripsByCarrier){
			this.data.push({"carrier":trips, "tripsQtd":tripsByCarrier[trips]});
		}
	}

	generateHistogram(){
		var that = this;

		this.data.forEach(function(d) {
    		d.tripsQtd = +d.tripsQtd;
 		});
		console.log(this.data);
	    this.xScale.domain(this.data.map(function(d) { return d.carrier; }));
  		this.yScale.domain([0, d3.max(this.data, function(d) { return d.tripsQtd; })]);

  		this.container.selectAll(".bar")
	      .data(this.data)
	      .enter().append("rect")
	      .attr("class", "bar")
	      .attr("x", function(d) { return that.xScale(d.carrier); })
	      .attr("width", that.xScale.bandwidth())
	      .attr("y", function(d) { return that.yScale(d.tripsQtd); })
	      .attr("height", function(d) { return that.height - that.yScale(d.tripsQtd); })
	      .style("fill", function(d){ return that.setColor(d.carrier)});

	     // add the x Axis
		svg.append("g")
		    .attr("transform", "translate(0," + that.height + ")")
		    .call(d3.axisBottom(that.xScale));

		// add the y Axis
		svg.append("g")
		    .call(d3.axisLeft(that.yScale));
	}

	setColor(carrier){
    	if (carrier == "Tam"){
    		return "#8B0000";
    	}else if (carrier == "Azul"){
    		return "#6495ED";
    	}else{
    		return "#FFA500";
    	}
    }
}