(function() {

"use strict";

//todo: Range should specify genetic contribution upper and lower limit. terjdelem will identify the bounds of the graph. One value for a measurement, assume that 0 will always be ticked off as average. Use whitepaper guidelines to determine range for "typical".

/*
Range values: [R0, R1, R2, R3]
	R0: Lower bound of genetic contribution.
	R1: Lower bound of "typical" genetic contribution range.
	R2: Upper bound of "typical" genetic contribution range. [NB: R1 & R2 should be determined using whitepaper guidelines for typical risk for now.]
	R3: Upper bound of genetic contribution.
*/
function Data(){
  this.original = [
    {"title":"BMI","dimension":"BMI Units","terjedelem":[-4,4],"ranges":[-2,-0.5,0.5,3],"rangesLine":[0,1.21],"measures":[1.21],"markers":[0]},
    {"title":"LDL Cholesterol","dimension":"mg/dL","terjedelem":[-10,10],"ranges":[-4,-1.5,1.5,7],"rangesLine":[0, -3.2],"measures":[-3.2],"markers":[0]},
    {"title":"Weight","dimension":"lbs","terjedelem":[-6,8],"ranges":[-3,-0.5,0.5,7],"rangesLine":[0,4],"measures":[4],"markers":[0]},
  ]
}
var getData = new Data();
var data = getData.original;

// take care! my english is terrible...
// I need the whole path on my local server, I don't know why - must be something with Kohana 3.3
//d3.json("/assets/js/D3_Chart/D3.chart/examples_joey_GitHub/06_horizontal_vertical/scripts/bulleTs-data.json", function(error, data) {

// this one was the original d3.json version for start - when bulleTs-data.json is in the same directory
//d3.json("bulleTs-data.json", function(error, data) {
// and this is mine for getting data from the above function Data() but it needs to be called again, as it is done below: bulleT();
function bulleT() {
  
	var myChartHorizontal = d3.select("#BulleT_horizontal").chart("BulleTs", {
		seriesCount: data.length
	});
	myChartHorizontal.margin({ top: 5, right: 40, bottom: 20, left: 120 })
		.orientation("horizontal")
		.width([350])/* as writen before. now array.length == 1, so it is for horizontal */
		.height([45])
		.duration(1000);
	myChartHorizontal.draw(data);
	
	/*var myChartVertical = d3.select("#BulleT_vertical").chart("BulleTs", {
		seriesCount: data.length
	});
	myChartVertical.margin({ top: 40, right: 20, bottom: 120, left: 5 })
		.orientation("vertical")
		.width([45,"vertical"]) /* bit of a hack too. if array.length > 1 it means */                        
	//	.height([350,"vertical"])/* that it is for vertical chart*/
	//	.duration(1000);
	//myChartVertical.draw(data);
  
}

bulleT();

})();