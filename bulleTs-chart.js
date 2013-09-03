// Chart design for T scores based on original bullet chart by Mike Bostock:
// http://bl.ocks.org/mbostock/4061961
// with d3.chart.js (0.1.2)
// http://misoproject.com/d3-chart/
d3.chart("BulleTs", {
	initialize: function(options) {
		var mixins = this.mixins = [];
		var idx, len, mixin;

		if (options && options.seriesCount) {
			for (idx = 0, len = options.seriesCount; idx < len; ++idx) {
				this._addSeries(idx);
			}
		}
	},
	_addSeries: function(idx) {
		var mixin = this.mixin("BulleT", this.base.append("svg").append("g"));
    // misoproject:
		// Cache the prototype's implementation of `transform` so that it may
		// be invoked from the overriding implementation. This is admittedly a
		// bit of a hack, and it may point to a future improvement for d3.chart
		var t = mixin.transform;

		mixin.transform = function(data) {
			return t.call(mixin, data[idx]);
		};

		this.mixins.push(mixin);
	},
	orientation: function(orientation) { 
		if (!arguments.length) {
			return this._orientation;
		}
		this.mixins.forEach(function(mixin) {
			mixin.orientation(orientation);
		});
		return this;
	},
	width: function(width) {
    var width, width_tmp;
		if (!arguments.length) {
			return this._width;
		}
    if (width.length == 1){ /* @CodeXmonk: now its horizontal */
      width_tmp = width[0];
    }else{ /* @CodeXmonk: a little more space needed for titles when it's vertical */
      width_tmp = width[0]+10;
    }
		this._width = width_tmp; 
		this.base.attr("width", width_tmp);
		this.base.selectAll("svg").attr("width", width_tmp);
		this.mixins.forEach(function(mixin) {
			mixin.width(width);
		});
		return this;
	},
	height: function(height) {
    var height, height_tmp;
		if (!arguments.length) {
			return this._height;
		}
    if (height.length == 1){ /* @CodeXmonk: now its horizontal */
      height_tmp = height[0];
    }else{ /*@CodeXmonk:  only needed when it's vertical */
      height_tmp = height[0]-100;
    }
		this._height = height_tmp; 
		this.base.selectAll("svg").attr("height", height_tmp );
    if( (height.length != 1) ){ /*@CodeXmonk:  there are more elements? then its vertical */
      this.base.selectAll("svg").attr("transform", function(){ return "rotate(-90)";});
    }   
		this.mixins.forEach(function(mixin) {
			mixin.height(height);
		});
		return this;
	},
	duration: function(duration) {
		if (!arguments.length) {
			return this._duration;
		}
		this._duration = duration;
		this.mixins.forEach(function(mixin) {
			mixin.duration(duration);
		});
	},
	margin: function(margin) {
		this.mixins.forEach(function(mixin) {
			mixin.margin(margin);
		});
		return this;
	}
});