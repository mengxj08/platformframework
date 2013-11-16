var frac = 1;
var size = 200 * frac;
var padding = 30 * frac;
var point_w = 8 * frac;
var line_w = 1;
var line_h_w = 2 * frac;
var cross_s = 25 * frac;
var tick_w = 4 * frac;

var position = pv.dict(traits, function(t) pv.Scale.linear().domain
		(
			Math.min(0,pv.min(data.filter(function(d) !isNaN(d[t])), function(d) d[t])),
			pv.max(x_range.filter(function(d) !isNaN(d[t])), function(d) d[t])
		).range(0, size));

function get_highlight()
{
	var return_string = "highlighted: ";
 	for(var i = 0; i < sample_size; i++)
	{
	 	if(i == highlight)
		{
		 	for(var dim = 0; dim < traits.length; dim++)
			{
			 		var j = traits[dim];
			 		var target = data[i][j];
					return_string = return_string + "\t" + j + ": " + target.toString();
			}
			return return_string;
		}
	}
}

function draw_PCP()
{	/* The root panel. */
		var vis = new pv.Panel()
            			.width(size * traits.length)
            			.height(size)
            			.margin(30);
			
		/* The cell for P-plots and S-plots */
		var cell = vis.add(pv.Panel)
						.data(traits.filter(function(m) traits.indexOf(m) != traits.length - 1))
						.top(0)
						.left(function(d) traits.indexOf(d) * size);	
						
		//show the left axis for each cell
		var rule = cell.add(pv.Rule)
				.left(0)
				.lineWidth(line_w);

						
		//show the label for each left axis
		rule.anchor("top").add(pv.Label)
			.textMargin(10)
			.font("bold 12px sans-serif");
			
		//show the ticks for each left axis
		var ticks = cell.add(pv.Rule)
						.data(function(t) position[t].ticks())
						.left(-tick_w/2)
						.top(function(t,d) position[d] (t))
						.width(tick_w)
						.lineWidth(line_w);

		
		//show the tick number for each left axis
		ticks.add(pv.Label)
				.left(-20)
				.textBaseline("middle")
				.text(pv.Format.number().fractionDigits(0,2));
						
		
		//highlight the start X1 value
		cell.add(pv.Panel)
			.data(data)
			.add(pv.Dot)
				.top(function(m,t,d) position[d] (t[d]))
				.left(0)
				.size(cross_s)
				.fillStyle("red")
				.strokeStyle("red")
				.shape("cross")
				.angle(Math.PI /2)
				.lineWidth(line_h_w)
				.visible(function(m,t,d) (traits.indexOf(d) == 0 && data.indexOf(t) == highlight));

		
		// Parallel coordinates.	
		cell.add(pv.Panel)
			.data(data)
			.add(pv.Line)
				.data([0,1])
				.left(function(m) m * size)
				.top(function(m,t,d) position[traits[traits.indexOf(d) + m]] (t[traits[traits.indexOf(d) + m]]))
				.lineWidth(line_w)
				.strokeStyle("steelblue");
			//	.title(function(m,t,d) "(" + t[d].toFixed(1) + ", " + t[traits[traits.indexOf(d) + 1]].toFixed(1) + ")"); 
				
		////////////////////////////////////////////////////////////		
		//show the right axis for the last cell!
		var cell_last = vis.add(pv.Panel)
							.top(0)
							.left((traits.length - 1) * size);
							
		var rule_last = cell_last.add(pv.Rule)
							.left(0)
							.strokeStyle("red")
							.lineWidth(line_h_w);
												
		//show the label for the last right axis
		rule_last.anchor("top").add(pv.Label)
				.text(traits[traits.length - 1])
				.textMargin(10)
				.font("bold 12px sans-serif")
				.textStyle("red");
		
		//show the ticks for the last right axis
		var ticks_last = cell_last.add(pv.Rule)
							.data(position[traits[traits.length - 1]].ticks())
							.top(function(t) position[traits[traits.length - 1]] (t))
							.left(-tick_w/2)
							.width(tick_w)
							.lineWidth(line_w);
		
		ticks_last.add(pv.Label)
				.left(-20)
				.textBaseline("middle")
				.text(pv.Format.number().fractionDigits(0,2));							
		
		
		
		vis.render();
}	

function draw_SCP_staircase()
{
 		 /* The root panel. */
		var vis = new pv.Panel()
			.width((Math.sqrt(2) * size + padding) * traits.length / 2)
			.height((size + padding) * 2)
			.left(20);
		
		var first_row = traits.filter(function(x) { return !(traits.indexOf(x) % 2) && traits.indexOf(x) != traits.length - 1; });
		var second_row = traits.filter(function(x) { return !(traits.indexOf(x) % 2) && traits.indexOf(x) != 0; });
		
		
		var cell = vis.add(pv.Panel)
						.add(pv.Dot)
							.data(first_row.map(function(y) { return {x:traits[traits.indexOf(y) + 1], y:y}; }))
							.shape("diamond")
							.radius(size / 2)
							.top(size / Math.sqrt(2))
							.left(function() this.index * (Math.sqrt(2) * size + padding) + size / Math.sqrt(2))	
							.lineWidth(0);
		
		//the X and Y axis					
		cell.add(pv.Panel)
				.add(pv.Line)				
					.data([0,1])
					.top(function(x,t) x * size / Math.sqrt(2))
					.left(function(x) (x - 1) *	size / Math.sqrt(2))
					.lineWidth(line_w)
					.strokeStyle("black")	
				.add(pv.Line)
					.top(function(x) (1 - x) * size / Math.sqrt(2))
					.left(function(x) x * size / Math.sqrt(2))
					.lineWidth(function(x,t) t.x == traits[traits.length - 1] ? line_h_w : line_w)
					.strokeStyle(function(x,t) t.x == traits[traits.length - 1] ? "red":"black");
					
		// Y axis ticks
		cell.add(pv.Panel)
				 .add(pv.Dot)
					.data(function(t) position[t.y].ticks())
						.shape("tick")
						.size(tick_w)
						.strokeStyle("black")
						.angle(Math.PI / 4)
						.left(function(d, t) -(position[t.y](d))/Math.sqrt(2))
						.top(function(d, t) (size -(position[t.y] (d)))/Math.sqrt(2))
						.add(pv.Label)
							.text(pv.Format.number().fractionDigits(0,2))
							.textAngle(Math.PI / 4)
							.textBaseline("top")
							.textAlign("center");
						
		// X axis ticks
		cell.add(pv.Panel)
				 .add(pv.Dot)
					.data(function(t) position[t.x].ticks())
						.shape("tick")
						.size(tick_w)
						.strokeStyle("black")
						.angle( - Math.PI / 4)
						.left(function(d, t) position[t.x](d)/Math.sqrt(2))
						.top(function(d, t) (size -(position[t.x] (d)))/Math.sqrt(2))
						.add(pv.Label)
						.text(pv.Format.number().fractionDigits(0,2))
						.textAngle(- Math.PI / 4)
						.textBaseline("top")
						.textAlign("center");	
		
		// Y axis Label				
		cell.add(pv.Panel)
			.add(pv.Label)
			.top(-5)
			.left(function() -size / Math.sqrt(2))
			.text(function(t) t.y)
			.font("bold 12px sans-serif");
		
		//X axis Label	
		cell.add(pv.Panel)
			.add(pv.Label)
			.top(-5)
			.left(function() size / Math.sqrt(2) - 0.5 * padding)
			.text(function(t) t.x)
			.font("bold 12px sans-serif")
			.textStyle(function(t) t.x == traits[traits.length - 1] ? "red":"black");
		
		
		//The highlighted start point	
		cell.add(pv.Panel)
			.add(pv.Panel)
				.data(data)
			.add(pv.Dot)
				.left(function(m,d,t) -position[t.y](d[t.y])/Math.sqrt(2))
				.top(function(m,d,t) (size - position[t.y](d[t.y]))/Math.sqrt(2))
				.size(cross_s)
				.fillStyle("red")
				.strokeStyle("red")
				.shape("cross")
				.lineWidth(line_h_w)
				.angle(Math.PI /4)
				.visible(function(m,d,t) (traits.indexOf(t.x) == 1 && traits.indexOf(t.y) == 0 && data.indexOf(m) == highlight));	
		
		//The Scatter Plot data
		cell.add(pv.Panel)
			.add(pv.Panel)
				.data(data)
			.add(pv.Dot)
			.left(function(m,d,t) (position[t.x](d[t.x]) - position[t.y](d[t.y]))/Math.sqrt(2))
			.top(function(m,d,t) (size - position[t.x](d[t.x]) - position[t.y](d[t.y]))/Math.sqrt(2))
			.size(point_w)
			.strokeStyle(null)
			.fillStyle("steelblue");	 
		//	.title(function(m,d,t) "(" + d[t.x].toFixed(1)+ ", " + d[t.y].toFixed(1) + ")");	
			
		/////////////////////////////////////////////////////////////////////////////	
		//The second row of the staircase SCP
		var cell_2 = vis.add(pv.Panel)
						.add(pv.Dot)
							.data(second_row.map(function(y) { return {x:traits[traits.indexOf(y) - 1], y:y}; }))
							.shape("diamond")
							.radius(size / 2)
							.top(size * Math.sqrt(2) + 0.5 * padding)
							.left(function() this.index * (Math.sqrt(2) * size + padding) + size * Math.sqrt(2) + 0.5 * padding)	
							.lineWidth(0);
		
		//the X and Y axis					
		cell_2.add(pv.Panel)
				.add(pv.Line)				
					.data([0,1])
					.top(function(x) x * size / Math.sqrt(2))
					.left(function(x) (x - 1) *	size / Math.sqrt(2))
					.lineWidth(function(x,t) t.y == traits[traits.length - 1] ? line_h_w : line_w)
					.strokeStyle(function(x,t) t.y == traits[traits.length - 1] ? "red":"black")	
				.add(pv.Line)
					.top(function(x) (1 - x) * size / Math.sqrt(2))
					.left(function(x) x * size / Math.sqrt(2))
					.lineWidth(line_w)
					.strokeStyle("black");
					
		// Y axis ticks
		cell_2.add(pv.Panel)
				 .add(pv.Dot)
					.data(function(t) position[t.y].ticks())
						.shape("tick")
						.size(tick_w)
						.strokeStyle("black")
						.angle(Math.PI / 4)
						.left(function(d, t) -(position[t.y](d))/Math.sqrt(2))
						.top(function(d, t) (size -(position[t.y] (d)))/Math.sqrt(2))
						.add(pv.Label)
						.text(pv.Format.number().fractionDigits(0,2))
						.textAngle(Math.PI / 4)
						.textBaseline("top")
						.textAlign("center");
						
		// X axis ticks
		cell_2.add(pv.Panel)
				 .add(pv.Dot)
					.data(function(t) position[t.x].ticks())
						.shape("tick")
						.size(tick_w)
						.strokeStyle("black")
						.angle( - Math.PI / 4)
						.left(function(d, t) position[t.x](d)/Math.sqrt(2))
						.top(function(d, t) (size -(position[t.x] (d)))/Math.sqrt(2))
						.add(pv.Label)
						.text(pv.Format.number().fractionDigits(0,2))
						.textAngle(- Math.PI / 4)
						.textBaseline("top")
						.textAlign("center");	
		
		// Y axis Label				
		cell_2.add(pv.Panel)
				.add(pv.Label)
				.top(-5)
				.left(function() -size / Math.sqrt(2))
				.text(function(t) t.y)
				.font("bold 12px sans-serif")
				.textStyle(function(t) t.y == traits[traits.length - 1] ? "red":"black");
				
		
		//X axis Label	
		cell_2.add(pv.Panel)
				.add(pv.Label)
				.top(-5)
				.left(function()  size / Math.sqrt(2) - padding/2)
				.text(function(t) t.x)
				.font("bold 12px sans-serif");
		
		
		//The Scatter Plot data
		cell_2.add(pv.Panel)
			.add(pv.Panel)
			.data(data)
			.add(pv.Dot)
			.left(function(m,d,t) ( position[t.x](d[t.x]) - position[t.y](d[t.y]))/Math.sqrt(2))
			.top(function(m,d,t) (size - position[t.x](d[t.x]) - position[t.y](d[t.y]))/Math.sqrt(2))
			.size(point_w)
			.strokeStyle(null)
			.def("fillStyle", "steelblue");
		//	.title(function(m,d,t) "(" + d[t.x].toFixed(1)+ ", " + d[t.y].toFixed(1) + ")");
		
		vis.render();

}

function draw_SCP_rotate()
{
 		/* Root panel. */
		var vis = new pv.Panel()
			.width((size + padding) * (traits.length - 1))
			.height(size)
			.margin(30);
		
		
		/* One cell per trait pair. */
		var cell = vis.add(pv.Panel)
					 .data(traits.filter(function(x) traits.indexOf(x) != traits.legnth -1))
					 .top(0)
					 .height(size)
				  .add(pv.Panel)
				     .data(function(y) traits.map(function(x) { return {x:traits[traits.indexOf(y) + 1], y:y}; }))
					 .left(function() (this.index - 1) * (size + padding))
					 .width(size);
			
		  
		// The X and Y axis for each cell  
		var rule_x = cell.add(pv.Rule)
        			.bottom(0)
					.lineWidth(function(t) t.x == traits[traits.length - 1] ? line_h_w:line_w)
					.strokeStyle(function(t) t.x == traits[traits.length - 1] ? "red":"black")
        			.visible(function() cell.index == cell.parent.index + 1);
		
		rule_x.add(pv.Label)
				.right(0)
				.text(function(t) t.x)
				.textStyle(function(t) t.x == traits[traits.length - 1] ? "red":"black")
				.font("bold 12px sans-serif");
		
		
		var rule_y = cell.add(pv.Rule)
			.left(0)
			.lineWidth(line_w)
			.visible(function()  cell.index == cell.parent.index + 1);
		
		rule_y.add(pv.Label)
				.top(0)
				.text(function(t) t.y)
				.font("bold 12px sans-serif");
		
		/* Xiaole's comments: Framed only the first row of the cells */
		var plot = cell.add(pv.Panel)
			.visible(function() cell.index == cell.parent.index + 1);
		
		// X-axis ticks. 
		var xtick = plot.add(pv.Rule)
			.data(function(t) position[t.x].ticks())
			.left(function(d, t) position[t.x](d))
			.bottom(-tick_w/2)
			.height(tick_w)
			.lineWidth(line_w);
		
		// Bottom labels. 
		xtick.anchor("bottom").add(pv.Label)
			.text(pv.Format.number().fractionDigits(0,2))
			.visible(function() ( cell.index == cell.parent.index + 1));
		
		// Y-axis ticks.
		var ytick = plot.add(pv.Rule)
			.data(function(t) position[t.y].ticks())
			.bottom(function(d, t) position[t.y](d))
			.left(-tick_w/2)
			.width(tick_w)
			.lineWidth(line_w)
			.textMargin(5);
		
		// Left labels. 
		ytick.anchor("left").add(pv.Label)
			.text(pv.Format.number().fractionDigits(0,2))
			.visible(function() cell.index == cell.parent.index + 1);
			
			
				
		//highlight the start X1 value
		plot.add(pv.Panel)
			.data(data)
			.add(pv.Dot)
				.left(0)
				.bottom(function(m,d,t) position[t.y](d[t.y]))
				.size(cross_s)
				.fillStyle("red")
				.strokeStyle("red")
				.shape("cross")
				.lineWidth(line_h_w)
				.visible(function(m,d,t) (traits.indexOf(t.x) == 1 && traits.indexOf(t.y) == 0 && data.indexOf(m) == highlight));	
		
		/* Frame and dot plot. */
		plot.add(pv.Panel)
			.data(data)
			.add(pv.Dot)
			.left(function(m,d,t) position[t.x](d[t.x]))
			.bottom(function(m,d,t) position[t.y](d[t.y]))
			.size(point_w)
			.strokeStyle(null)
			.fillStyle("steelblue");
		//	.title(function(m,d,t) "(" + d[t.x].toFixed(1)+ ", " + d[t.y].toFixed(1) + ")");	

		vis.render();
}


function draw_SCP_standard()
{
	var vis = new pv.Panel()
			.width((size + padding) * (traits.length - 1))
			.height(size)
			.margin(30);
		
		/* One cell per trait pair. */
	var cell = vis.add(pv.Panel)
				 .data(traits.filter(function(x) traits.indexOf(x) == 1))
				 .top(0)
				 .height(size)
			  .add(pv.Panel)
				 .data(
					   function(y) traits.filter(function(x) traits.indexOf(x) != 1)
					   					   .map(function(x) { return {x:x, y:y}; })
					   )
				 .left(function() (this.index)* (size + padding))
				 .width(size);
	
	// The X and Y axis for each cell  
	var rule_x = cell.add(pv.Rule)
					  .bottom(0)
					  .lineWidth(function(t) t.x == traits[traits.length - 1] ? line_h_w:line_w)
					  .strokeStyle(function(t) t.x == traits[traits.length - 1] ? "red":"black");
	
	rule_x.add(pv.Label)
			.right(0)
			.font("bold 12px sans-serif")
			.text(function(t) t.x)
			.textStyle(function(t) t.x == traits[traits.length - 1] ? "red":"black");
	
	var rule_y = cell.add(pv.Rule)
					 .left(0)
					 .lineWidth(function(t) t.y == traits[traits.length - 1] ? line_h_w: line_w)
					 .strokeStyle(function(t) t.y == traits[traits.length - 1] ? "red":"black");
	
	rule_y.add(pv.Label)
			.top(0)
			.font("bold 12px sans-serif")
			.text(function(t) t.y)
			.textStyle(function(t) t.y == traits[traits.length - 1] ? "red":"black");
				
	/* Framed dot plots not along the diagonal. */
	/* Xiaole's comments: Framed only half of the cells */
	var plot = cell.add(pv.Panel);
	
	// X-axis ticks. 
	var xtick = plot.add(pv.Rule)
		.data(function(t) position[t.x].ticks(5))
		.left(function(d, t) position[t.x](d))
		.bottom(-tick_w/2)
		.height(tick_w)
		.lineWidth(line_w);
	
	// Bottom labels. 
	xtick.anchor("bottom").add(pv.Label)
		.text(pv.Format.number().fractionDigits(0,2));
	
	// Y-axis ticks.
	var ytick = plot.add(pv.Rule)
		.data(function(t) position[t.y].ticks(5))
		.bottom(function(d, t) position[t.y](d))
		.left(-tick_w/2)
		.width(tick_w)
		.lineWidth(line_w)
		.textMargin(5);
	
	// Left labels. 
	ytick.anchor("left").add(pv.Label)
		.text(pv.Format.number().fractionDigits(0,2));
		
		
	/* highlight the start X1 value */
	plot.add(pv.Panel)
			.data(data)
		.add(pv.Dot)
		.left(function(m,d,t) position[t.x] (d[t.x]))
		.bottom(0)
		.size(cross_s)
		.fillStyle("red")
		.strokeStyle("red")
		.shape("cross")
		.lineWidth(line_h_w)
		.visible(function(m,d,t) (traits.indexOf(t.x) == 0 && data.indexOf(m) == highlight));
	
	/* Frame and dot plot. */
	plot.add(pv.Panel)
			.data(data)
		.add(pv.Dot)
		.left(function(m,d,t) position[t.x](d[t.x]))
		.bottom(function(m,d,t) position[t.y](d[t.y]))
		.size(point_w)
		.strokeStyle(null)
		.fillStyle("steelblue");
	
	vis.render();
}
		
						
		