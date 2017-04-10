class Scatterplot{
    constructor(x, y, margin, width, height, container, id, data){
		this.id = id;
		this.x = x;
		this.y = y;
		this.totalWidth = width;
		this.totalHeight = height;
		this.defaultData = data;

		this.margin = margin;
		this.width = width/2;
		this.height = height/2;

		this.container = container;
		this.canvas = this.container.append("g");
		this.canvas.attr("transform","translate("+(this.x+this.margin.left) + "," + (this.y+this.margin.top) + ")");
		
		this.xScale = d3.scaleLinear().range([0,this.width]);
		this.yScale = d3.scaleLinear().range([this.height,0]);

		var that = this;
		this.brush = d3.brush();
		this.myBrushGroup = this.canvas.append("g");
		this.brush(this.myBrushGroup);
		this.brush.on("brush", function(){that.brushMoved(that)});
    }

    brushMoved(widget){
    	var that = this;
		var screenSelection = d3.event.selection;

		widget.selectedObjects = [];
		widget.canvas
		    .selectAll("circle")
		    .attr("fill",function(d,i){
				var x = widget.xScale(d.timeDiff);
				var y = widget.yScale(d.price);
				if (screenSelection[0][0]<= x && x <= screenSelection[1][0] 
					&& screenSelection[0][1]<= y && y <= screenSelection[1][1]) {
					    widget.selectedObjects.push(d);
					    return "#FFFF00";
				} else {
					return that.setColor(d.carrier);
				}
		});
		    
		if (widget.selectedObjects.length != 0){
			widget.dispatch.call("selectionChanged",{caller:widget.id, objects:widget.selectedObjects});
		}else{
			widget.dispatch.call("selectionChanged",{caller:widget.id, objects:this.defaultData});
		}
    }
    
    setData(newData){
    	var data = this.setDataScatterplot(newData);
    	var that = this;

		this.xScale.domain(d3.extent(data,function(d){return d.timeDiff;}));
		this.yScale.domain(d3.extent(data,function(d){return d.price;}));
		
		var myCircles = this.canvas
		    .selectAll("circle")
		    .data(data)
		    .enter()
		    .append("circle")
		    .attr("cx",function(d){return that.xScale(d.timeDiff);})
		    .attr("cy",function(d){return that.yScale(d.price);})
		    .attr("r",function(d){return 2;})
		    .attr("fill", function(d){ return that.setColor(d.carrier)});

		this.canvas.append("g")
		    .attr("transform", "translate(0," + that.height + ")")
		    .call(d3.axisBottom(that.xScale));

		this.canvas.append("g")
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

    refresh(carrier){
    	var that = this;
    	var dataset = [];
    	
    	this.defaultData.forEach(function(d) {
    		if(d.carrier == carrier){
    			dataset.push(d);
    		}
 		});
 		
	    this.canvas.selectAll("circle")
	      .data(dataset)
	      .exit().remove();
	      
	    this.canvas
		    .selectAll("circle")
		    .data(this.setDataScatterplot(dataset))
		    .attr("cx",function(d){return that.xScale(d.timeDiff);})
		    .attr("cy",function(d){return that.yScale(d.price);})
		    .attr("r",function(d){return 2;})
		    .attr("fill", function(d){ return that.setColor(d.carrier)});
    }

    setDataScatterplot(trips){
    	var scatterplotData = [];
    	var i = 0;
    	for (i = 0; i < trips.length; i++){
    		var data = {};
    		data.price = trips[i].price;
    		data.carrier = trips[i].carrier;
    		data.timeDiff = this.timeInterval(trips[i].post, trips[i].start);
    		scatterplotData.push(data);
    	}

    	return scatterplotData;
    }

    timeInterval(datePost, dateStart){
	    var parseData = d3.timeParse("%d/%m/%Y");
	    return d3.timeDay.count(parseData(datePost), parseData(dateStart));
    }
}