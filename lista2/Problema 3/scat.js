class Scatterplot{
    constructor(x, y, margin, width, height, container, id){
		this.id = id;
		this.x = x;
		this.y = y;
		this.totalWidth = width;
		this.totalHeight = height;

		this.margin = margin;
		this.width = width/2;
		this.height = height/2;

		this.container = container;
		this.canvas = this.container.append("g");
		this.canvas.attr("transform","translate("+(this.x+this.margin.left) + "," + (this.y+this.margin.top) + ")");
		
		this.xScale = d3.scaleLinear().range([0,this.width]);
		this.yScale = d3.scaleLinear().range([this.height,0]);
/*
		var that = this;
		this.brush = d3.brush();
		this.myBrushGroup = this.canvas.append("g");
		this.brush(this.myBrushGroup);
		this.brush.on("brush", function(){console.log("MY Brush")})
		this.brush.on("brushend", this.brushend);		*/
    }

/*
    brushMoved(widget){
    	var that = this;
		var screenSelection = d3.event.selection;

		widget.selectedObjects = [];

		widget.canvas
		    .selectAll("circle")
		    .attr("fill",function(d,i){
				var x = widget.xScale(d.timeDiff);
				var y = widget.yScale(d.price);
				if (screenSelection[0][0]<= x 
					&& x <= screenSelection[1][0] 
					&& screenSelection[0][1]<= y 
					&& y <= screenSelection[1][1]) {
					    widget.selectedObjects.push(d);
					    return "#FFFF00";
				} else {
					return that.setColor(d.carrier);

				}
			 });

		widget.dispatch.call("selectionChanged",{caller:widget.id, objects:widget.selectedObjects});
    }

    setSelected(ids){
		this.canvas.selectAll("circle")
		    .attr("fill",function(d,i){
			if(ids.indexOf(i) !== -1){
			    return "red";
			}
			else{
			    return "black";
			}
		});
    }*/

    /* Data Format
		{
		    "nameplate": 5,
		    "generation": 8,
		    "fuel": "OIL",
		    "age": 11,
		    "capacityfactor": 0.0002,
		    "co2emissions": 6.87,
		    "co2emissionsRate": 1718.05
		}
    */
    setData(newData, attr1, attr2, column, line){
    	var that = this;
    	
		this.xScale.domain(d3.extent(newData,function(d){return d[attr1];}));
		this.yScale.domain(d3.extent(newData,function(d){return d[attr2];}));
		
		var myCircles = this.canvas
		    .selectAll("circle")
		    .data(newData)
		    .enter()
		    .append("circle")
		    .attr("cx",function(d){return that.xScale( d[attr1]);})
		    .attr("cy",function(d){return that.yScale(d[attr2]);})
		    .attr("r",function(d){return 2;})
		    .attr("fill", function(d){ return "red"});

		if (line == 1){
			// add the x Axis
			this.canvas.append("g")
			    .attr("transform", "translate(0," + that.height + ")")
			    .call(d3.axisBottom(that.xScale));
		} 

		if (column == 0){
			// add the y Axis
			this.canvas.append("g")
			    .call(d3.axisLeft(that.yScale));
		}		
    }
}