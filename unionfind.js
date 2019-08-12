/**
 * Union-Find Disjoint-set forest data structure
 * unionfind.js
 * Purpose: Implement disjoint-set operations
 * 
 * @author Neil Gorham 
 * @version 1.0 07/13/2014
 */

//Union Find Class Constructor
function UnionFind(numElements){
	//Initialize Member Variables
	this.elements = numElements; //number of elements (sets)
	this.rank = new Array(this.elements); //Rank structure
	this.parent = new Array(this.elements); //Parent structure
	this.numSets = 0; //Number of total sets
}

//Make element x into a set
UnionFind.prototype.makeSet = function(y){
	var x = parseInt(y); //Make x int data type
	this.parent[x] = x;
	this.rank[x] = 0;
	this.numSets++;
}

//Find and return the set that contains element x
UnionFind.prototype.findSet = function(x){
	if(x != this.parent[x]){
		this.parent[x] = this.findSet(this.parent[x]);
	}
	return this.parent[x];
}

//Link sets x and y together
UnionFind.prototype.link = function(x, y){
	if(x == y) return;
	if(this.rank[x] > this.rank[y] ){
		this.parent[y] = x;
	} else {
		this.parent[x] = y;
		if(this.rank[x] == this.rank[y]){ this.rank[y]++; }
	}
	this.numSets--;
}

//Union sets x and y by rank
UnionFind.prototype.union = function(x, y){
	this.link(this.findSet(x), this.findSet(y));
}

//Compare sets x and y for parent equality
UnionFind.prototype.sameSet = function(x, y){
	return (this.findSet(x) == this.findSet(y));
}

//Return number of sets
UnionFind.prototype.getNumSets = function(){
	return this.numSets;
}

//Return rank[x]
UnionFind.prototype.getRank = function(x){
	return this.rank[x];
}

//Return parent[x]
UnionFind.prototype.getParent = function(x){
	return this.parent[x];
}