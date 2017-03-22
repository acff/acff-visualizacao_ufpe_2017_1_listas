var mySVG;
var xScale;
var yScale;
var cScale = d3.scaleLinear().domain([0,100]).range(["gray", "blue"]);

window.onload = function() {
  var margin = {top: 50, right: 50, bottom:50, left: 50};

  var width = 500- margin.left - margin.right;
  var height = 500 - margin.top - margin.bottom;

  xScale = d3.scaleLinear().domain([0,100]).range([0,width]);
  yScale = d3.scaleLinear().domain([0,100]).range([height, 0]);

  mySVG = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right) 
        .attr("height", height + margin.top + margin.bottom) 
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);

  var mySVGAxisGroupX = mySVG.append("g").attr("transform", "translate(" + 0 + "," + height + ")");
  var mySVGAxisGroupY = mySVG.append("g");

  mySVGAxisGroupX.call(xAxis);
  mySVGAxisGroupY.call(yAxis);

  generateData();
};

function getRandom(min,max)
{
  return Math.floor(Math.random()*(max - min + 1)) + min;
}

function generateData(){
  mySVG.selectAll("circle").remove()
  var dataset = [];
  var datasetLength = getRandom(1, 50);

  for(i = 0; i < datasetLength; i++){
    var x = getRandom(1, 100);
    var y = getRandom(1, 100);
    var z = getRandom(1, 100)/10;//radius
    var w = getRandom(1, 100);//color
   
    dataset = dataset.concat([[x ,y, z, w]]);
  }

  d3
    .select("h3")
    .html('Data length > ' + datasetLength);

  mySVG
  .selectAll("circle")
  .data(dataset)
  .enter()
  .append("circle")
  .attr("r",function(d){return xScale(d[2]/5)})
  .attr("cx",function(d){return xScale(d[0]);})   
  .attr("cy",function(d){return yScale(d[1]);})
  .attr("fill", function(d){return cScale(d[3])});  
}
