class Scatterplot{
    constructor(x,y,width,height,container,id){
		this.id = id;
		this.x = x;
		this.y = y;
		this.totalWidth = width;
		this.totalHeight = height;

		//Margin, height, width
		this.margin = {left:20,right:20,top:20,bottom:20};
		this.width = width - this.margin.left - this.margin.right;
		this.height = height - this.margin.top - this.margin.bottom;

		//container is either svg or g
		this.container = container;
		this.canvas = this.container.append("g").attr("class", "container");
		this.canvas.attr("transform","translate("+(this.x+this.margin.left) + "," + (this.y+this.margin.top) + ")");
		
		//Scales
		//REVER ISSOO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    	var k = height / width,
		    x0 = [-4.5, 4.5],
		    y0 = [-4.5 * k, 4.5 * k];
		
		this.xScale = d3.scaleLinear().range([0,this.width]).domain(x0);
		this.yScale = d3.scaleLinear().range([this.height,0]).domain(y0);
		this.cScale = d3.scaleOrdinal(d3.schemeCategory10);

		// add the x Axis
		var xGroup = this.container.append("g")
		    .attr("transform", "translate(0," + this.height + ")")
		    .attr("class", "xAxis")
		    .call(d3.axisBottom(this.xScale));

		// add the y Axis
		var yGroup = this.container.append("g")
			.attr("class", "yAxis")
		    .call(d3.axisLeft(this.yScale));

		//Brush
		var that = this;
		this.brush = d3.brush();
		this.myBrushGroup = this.canvas.append("g");
		this.brush(this.myBrushGroup);
		this.brush.on("brush", function(){
			that.brushMoved(that);
		});
    }

    brushMoved(widget){
    	var screenSelection = d3.event.selection;
    	if (!screenSelection){

    	}
    }

    setData(newData){
		
		var that = this;

		var myCircles = this.canvas
		    .selectAll("circle")
		    .data(newData)
		    .enter()
		    .append("circle")
		    .attr("cx",function(d){return that.xScale(d[0]);})
		    .attr("cy",function(d){return that.yScale(d[1]);})
		    .attr("r",function(d){return 2;})
		    .style("fill", function(d){return that.cScale(d[2])});
    }
/*
    setZoom(){
    	var zoom = d3.zoom()
		    .scaleExtent([1, 8])
		    .on("zoom", this.zoomed);
		this.canvas.call(zoom);
    }

    zoomed(){
    	var that = this;
    	var t = this.canvas.transition().duration(750);
		this.container.select(".xAxis").transition(t).call(this.xAxis);
		this.container.select(".yAxis").transition(t).call(this.yAxis);
		this.container.selectAll("circle").transition(t)
		    .attr("cx", function(d) { return that.xGroup(d[0]); })
		    .attr("cy", function(d) { return that.yGroup(d[1]); });
		
    }
*/
}
