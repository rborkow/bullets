// Chart design for T scores based on original bullet chart by Mike Bostock:
// http://bl.ocks.org/mbostock/4061961
// with d3.chart.js (0.1.2)
// http://misoproject.com/d3-chart/
d3.chart("BulleT", {
	initialize: function() {
    var chart = this; 
		this.xScale = d3.scale.linear();
		this.base.classed("BulleT", true);
		this.titleGroup = this.base.append("g");
		this.title = this.titleGroup.append("text")
			.attr("class", "title"); 
		this.dimension = this.titleGroup.append("text")
			.attr("class", "subtitle s2");
		this.subtitle = this.titleGroup.append("text")
			.attr("class", "subtitle s2");
		// Default configuration
		this._margin = { top: 0, right: 0, bottom: 0, left: 0 };
		this.orientation("");
		this.duration(0);
		this.markers(function(d) {
			return d.markers;
		});
		this.measures(function(d) {
			return d.measures;
		});
		this.width(100);
		this.height(100);
		this.tickFormat(this.xScale.tickFormat(d3.format("+.0d")));
    	this.reverse(true);
		this.orient("left");
		this.terjedelem(function(d) {
			return d.terjedelem;
		});
		this.ranges(function(d) {
			return d.ranges;
		});
		this.rangesLine(function(d) {
			return d.rangesLine;
		});

		this.layer("ranges", this.base.append("g").classed("ranges", true), {
			dataBind: function(data) {
      var data_ranges = new Array();
				// @CodeXmonk: a bit of hack too - ToDo later. This layer operates on "ranges" data, ranges[2] not needed
				data_ranges[0] = data.ranges[0];
				data_ranges[1] = data.ranges[1];
				data_ranges[2] = data.ranges[2];
				data_ranges[3] = data.ranges[3];
        terjedelem = data.terjedelem;
        data_ranges.unshift(terjedelem[1]);
        
				return this.selectAll("rect.range").data(data_ranges);
			},
			insert: function() {
				  return this.append("rect");
			},
			events: {
				enter: function(d, i) {
          var orientation = chart.orientation();
          var terjedelem = chart.terjedelem;
            this.attr("class", function(d, i) { return "range s" + i; })
						  .attr("width", chart.xScale)
						  .attr("height", function(){
                if( orientation == "vertical" ){ 
                  return chart.width();
                }else{
                  return chart.height();
                }   
              })
						  .attr("x", this.chart()._reverse ? chart.xScale :  terjedelem[0]); //Usage: condition ? value-if-true : value-if-false
				},
				"merge:transition": function() {
          var terjedelem = chart.terjedelem;
					this.duration(chart.duration())
						.attr("width", chart.xScale)
						.attr("x", chart._reverse ? chart.xScale :  terjedelem[0]);
				},
				exit: function() {
					this.remove();
				}
			}
		});
/******************************************************************************/
		this.layer("rangesLine", this.base.append("g").classed("rangesLine", true), {
			dataBind: function(data) {
				// @CodeXmonk: This layer operates on "ranges" data
				data_rangesLine = data.rangesLine;
				
        return this.selectAll("line.range").data(data_rangesLine);
			},
			insert: function() {
				  return this.append("line");
			},
			events: {
				enter: function(d, i) {  
          var orientation = chart.orientation();
            this.attr("class", function(d, i) { return "range line"; })
              .attr("x1", chart.xScale)
              .attr("x2", chart.xScale)
              .attr("y1", 0)
              .attr("y2", function(){
                if( orientation == "vertical" ){
                  return chart.width();
                }else{
                  return chart.height();
                }   
              });
				},
				"merge:transition": function() {
          var orientation = chart.orientation();
            this.attr("class", function(d, i) { return "range line"; })
              .attr("x1", chart.xScale)
              .attr("x2", chart.xScale)
              .attr("y1", 0)
              .attr("y2", function(){
                if( orientation == "vertical" ){
                  return chart.width();
                }else{
                  return chart.height();
                }   
              });
              
				},
				exit: function() {
					this.remove();
				}
			}
		});
/******************************************************************************/
		this.layer("measures", this.base.append("g").classed("measures", true), {
			dataBind: function(data) {
				// @CodeXmonk: This layer operates on "measures" data
				data_measures = data.measures;
        var terjedelem = data.terjedelem;
        data_measures.unshift(terjedelem[1]);

				return this.selectAll("rect.measure").data(data_measures);
			},
			insert: function() {
				return this.append("rect");
			},
			events: {
				enter: function() {
          var orientation = chart.orientation();
					var hy;
          if( orientation == "vertical" ){
            hy = chart.width() / 2;
          }else{
            hy = chart.height() / 2;
          }
          var terjedelem = chart.terjedelem();
					this.attr("class", function(d, i) { return "measure s" + i; })
						.attr("width", chart.xScale)
						.attr("height", hy)
						.attr("x", terjedelem[0])
						.attr("y", hy/2);
				},
				"merge:transition": function() {
          var terjedelem = chart.terjedelem;
					this.duration(chart.duration())
						.attr("width", chart.xScale)
						.attr("x", terjedelem[0])
				}
			}
		});
/******************************************************************************/
		this.layer("markerSample", this.base.append("g").classed("markerSample", true), {
			dataBind: function(data) {
				// @CodeXmonk: This layer operates on "markerSample" datum
				data = data.markers;
				return this.selectAll("line.marker").data(data.slice(0,1));
			},
			insert: function() {
				return this.append("line");
			},
			events: {
				enter: function() {
          var orientation = chart.orientation();
          var whichOne;
          if( orientation == "vertical" ){
            whichOne = chart.width();
          }else{
            whichOne = chart.height();
          }
            this.attr("class", "marker Sample")
						  .attr("x1", chart.xScale)
						  .attr("x2", chart.xScale)
						  .attr("y1", whichOne / 4)
						  .attr("y2", whichOne - (whichOne/4) );
				},
				"merge:transition": function() {
          var orientation = chart.orientation();
          var whichOne;
          if( orientation == "vertical" ){
            whichOne = chart.width();
          }else{
            whichOne = chart.height();
          }
            this.duration(chart.duration())
						  .attr("x1", chart.xScale)
						  .attr("x2", chart.xScale)
						  .attr("y1", whichOne / 4)
						  .attr("y2", whichOne - (whichOne/4) );
				}
			}
		});
/******************************************************************************/
		this.layer("markerSubject", this.base.append("g").classed("markerSubject", true), {
			dataBind: function(data) {
				// @CodeXmonk: This layer operates on "markerSubject" datum
				data = data.markers;
				  return this.selectAll("rect.marker").data(data.slice(1,2));
			},
			insert: function() {
				  return this.append("rect");
			},
			events: {
				enter: function() {
          var orientation = chart.orientation();
          var whichOne;
          if( orientation == "vertical" ){
            whichOne = chart.width();
          }else{
            whichOne = chart.height();
          }
            this.attr("class", "marker Subject")
              .attr("width", 6)
              .attr("y", -(whichOne/10)) 
              .attr("height",function(d) {return whichOne+(whichOne/5);})
              .attr("x", chart.xScale)
              .attr("transform", "translate(-3,0)");
				},
				"merge:transition": function() {
          var orientation = chart.orientation();
          var whichOne;
          if( orientation == "vertical" ){
            whichOne = chart.width();
          }else{
            whichOne = chart.height();
          }
            this.duration(chart.duration())
              .attr("width", 6)
              .attr("y", -(whichOne/10))
              .attr("height",function(d) {return whichOne+(whichOne/5);})
              .attr("x", chart.xScale)
              .attr("transform", "translate(-3,0)");
				}
			}
		});
/******************************************************************************/
		this.layer("ticks", this.base.append("g").classed("ticks", true), {
			dataBind: function() {
				var format = this.chart().tickFormat();
				return this.selectAll("g.tick").data(this.chart().xScale.ticks(8), function(d) {
					return this.textContent || format(d);
				});
			},
			insert: function() {
          var orientation = chart.orientation();
          var whichOne;
          if( orientation == "vertical" ){
            whichOne = chart.width();
          }else{
            whichOne = chart.height();
          }
				var tick = this.append("g").attr("class", "tick");
				var height = whichOne;
				var format = chart.tickFormat();

				tick.append("line")
					.attr("y1", whichOne)
					.attr("y2", whichOne * 7 / 6);
          
				tick.append("text")
					.attr("text-anchor", "middle")
					.attr("dy", "1em")
					.attr("y", whichOne * 7 / 6)
          .attr("transform", function(){
            if( orientation == "vertical" ){
              return "translate("+(whichOne+whichOne/2)+","+(whichOne+whichOne/2)+")rotate(90)";
            } /* @CodeXmonk: if vertical BUT its not exact yet - ToDo */   
          })
					.text(format);

				return tick;
			},
			events: {
				enter: function() {
					this.attr("transform", function(d) {
							return "translate(" + chart.xScale(d) + ",0)";
						})
						.style("opacity",1);
				},
				"merge:transition": function() { 
          var orientation = chart.orientation();
          var whichOne;
          if( orientation == "vertical" ){
            whichOne = chart.width();
          }else{
            whichOne = chart.height();
          }

					this.duration(chart.duration())
						.attr("transform", function(d) {
							return "translate(" + chart.xScale(d) + ",0)";
						})
						.style("opacity", 1);
					this.select("line")
						.attr("y1", whichOne)
						.attr("y2", whichOne * 7 / 6);
					this.select("text")
						.attr("y", whichOne * 7 / 6);
				},
				"exit:transition": function() {
					this.duration(chart.duration())
						.attr("transform", function(d) {
							return "translate(" + chart.xScale(d) + ",0)";
						})
						.style("opacity", 1e-6)
						.remove();
				}
			}
		});

		d3.timer.flush();
	},                                                                     

	transform: function(data) {
    var orientation = this.orientation(); 
    var height = this.height();
    if( orientation == "vertical" ){
      this.base.attr("transform","translate(15," + ( height + 10 ) + ")rotate(-90)");
    }
		// misoproject: Copy data before sorting
		var newData = {
			title: data.title,
			dimension: data.dimension,
			randomizer: data.randomizer,
			terjedelem: data.terjedelem.slice(),
			ranges: data.ranges.slice().sort(d3.descending),
			rangesLine: data.rangesLine.slice(),
			measures: data.measures.slice().sort(d3.descending),
			markers: data.markers.slice()
		};
		this.xScale.domain([newData.terjedelem[0], newData.terjedelem[1]]);
    this.titleGroup
      .style("text-anchor", function(){
        if( orientation == "vertical" ){
          return "middle";
        }else{
          return "end";
        }   
      } );
    if( orientation == "vertical" ){
      this.titleGroup.attr("transform", function(){ return "translate(-15,10)rotate(90)"});
    }   
    this.dimension
      .attr("dy", function(){
        if( orientation == "vertical" ){
          return "12px";
        }else{
          return "1.2em";
        }   
      });
    this.subtitle
      .attr("dy", function(){
        if( orientation == "vertical" ){
          return "26px";
        }else{
          return "2.4em";
        }   
      });
		this.title.text(data.title);
		this.dimension.text(data.dimension);
		//this.subtitle.text(data.markers[1]);

		this.subtitle.attr("class",function(d) {
          switch (true)
          {
            case ( (data.markers[1] < 30) || (70 < data.markers[1]) ): 
              return "subtitle s04";
              break;
              break;
            case ( (30 <= data.markers[1]) && (data.markers[1] < 40) ):
              return "subtitle s13";
              break;
            case ( (40 <= data.markers[1]) && (data.markers[1] <= 60) ):
              return "subtitle s2";
              break;
            case ( (60 < data.markers[1]) && (data.markers[1] <= 70) ):
              return "subtitle s13";
              break;
          }
        }
      )
		return newData;
	},

	// misoproject: reverse or not
	reverse: function(x) {
		if (!arguments.length) return this._reverse;
		this._reverse = x;
		return this;
	},

	// misoproject: left, right, top, bottom
	orient: function(x) {
		if (!arguments.length) return this._orient;
		this._orient = x;
		this._reverse = this._orient == "right" || this._orient == "bottom";
		return this;
	}, 

	// @CodeXmonk: terjedelem (20,80)
	terjedelem: function(x) {
		if (!arguments.length) return this._terjedelem;
		this._terjedelem = x;
		return this;
	},

	// misoproject: ranges (bad, satisfactory, good)
	ranges: function(x) {
		if (!arguments.length) return this._ranges;
		this._ranges = x;
		return this;
	}, 

	// @CodeXmonk: for sample mean
	rangesLine: function(x) {
		if (!arguments.length) return this._ranges;
		this._ranges = x;
		return this;
	},

	// misoproject: markers (previous, goal)
	markers: function(x) {
		if (!arguments.length) return this._markers;
		this._markers = x;
		return this;
	},

	// misoproject: measures (actual, forecast)
	measures: function(x) {
		if (!arguments.length) return this._measures;
		this._measures = x;
		return this;
	},
  
	width: function(x) {
		var margin, width_tmp;
		if (!arguments.length) {
			return this._width;
		}
		margin = this.margin(); 
    width_tmp = x[0];
		width_tmp = width_tmp - (margin.left + margin.right);
		this._width = width_tmp;
    if (x.length == 1){ /* @CodeXmonk: Scale needs to be put here when it's horizontal */ 
		  this.xScale.range(this._reverse ? [width_tmp, 0] : [0, width_tmp]);
    }
		this.base.attr("width", width_tmp);
		return this;
	},
  
	height: function(x) {
		var margin, height_tmp;
		if (!arguments.length) {
			return this._height;
		}
		margin = this.margin();
    height_tmp = x[0];
		height_tmp = height_tmp - (margin.top + margin.bottom);
		this._height = height_tmp;
    if (x.length != 1){ /* @CodeXmonk: Scale needs to be put here when it's vertical */
		  this.xScale.range(this._reverse ? [height_tmp, 0] : [0, height_tmp]);
    }
		this.base.attr("height", height_tmp);
		this.titleGroup.attr("transform", "translate(-16," + height_tmp / 3 + ")");
		return this;
	},
  
	margin: function(margin) {
		if (!margin) {
			return this._margin;
		}
    var margin_tmp = margin;
		["top", "right", "bottom", "left"].forEach(function(dimension) {
			if (dimension in margin_tmp) {
				this._margin[dimension] = margin_tmp[dimension];
			}
		}, this);

		this.base.attr("transform", "translate(" + this._margin.left + "," + this._margin.top + ")");

		return this;
	},

	tickFormat: function(x) {
		if (!arguments.length) return this._tickFormat;
		this._tickFormat = x;
		return this;
	},  

	orientation: function(x) {
		if (!arguments.length) return this._orientation;
		this._orientation = x;
		return this;
	},

	duration: function(x) {
		if (!arguments.length) return this._duration;
		this._duration = x;
		return this;
	}
});
