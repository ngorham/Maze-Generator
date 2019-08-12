/**
 * Vertex of a graph
 * vertex.js
 * Purpose: Implement breadth-first search operations
 * 
 * @author Neil Gorham 
 * @version 1.0 07/28/2014
 */

 //Vertex Constructor
 function Vertex(){
	//Member variables
	var dist = Math.max();
	var parent = null;
	var color = "w";
	
	return{
		setDistance: function(newDist){ dist = newDist; },
		getDistance: function(){ return dist; },
		setParent: function(newParent){ parent = newParent; },
		getParent: function(){ return parent; },
		setColor: function(newColor){ color = newColor; },
		getColor: function(){ return color; }
	};
 }