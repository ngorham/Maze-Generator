<?php
/**
 * Union-Find Disjoint-set forest data structure
 * unionFind.php
 * Purpose: Implement disjoint-set operations
 * 
 * @author Neil Gorham 
 * @version 1.0 07/21/2014
 */
 
 //Union Find Class Constructor
 class UnionFind{
	//Member variables
	private $numElements; //number of elements (sets)
	private $rank; //Rank structure
	private $parents; //Parent structure
	private $numSets = 0; //total number of sets

    /**
     * Constructor
     *
     * @param $num Number of total elements
     */
	function __construct($num){
		$this->numElements = $num;
		$this->rank = array($num);
		$this->parents = array($num); 
	}
	
	//Make element x into a set
	function makeSet($y){
		$x = intval($y);
		$this->parents[$x] = $x;
		$this->rank[$x] = 0;
		$this->numSets++;
	}
	
	//Find and return the set that contains element x
	function findSet($x){
		if($x != $this->parents[$x]){
			$this->parents[$x] = $this->findSet($this->parents[$x]);
		}
		return $this->parents[$x];
	}
	
	//Link sets x and y together
	function link($x, $y){
		if($x == $y) return;
		if($this->rank[$x] > $this->rank[$y]){
			$this->parents[$y] = $x;
		} else {
			$this->parents[$x] = $y;
			if($this->rank[$x] == $this->rank[$y]){ $this->rank[$y]++; }
		}
		$this->numSets--;
	}
	
	//Union sets x and y by rank
	function union($x, $y){
		$this->link($this->findSet($x), $this->findSet($y));
	}
	
	//Compare sets x and y for parent equality
	function sameSet($x, $y){
		return ($this->findSet($x) == $this->findSet($y));
	}
	
	//Return number of sets
	function getNumSets(){ return $this->numSets; }
	
	//Return rank[x]
	function getRank($x){ return $this->rank[$x]; }
	
	//Return parent[x]
	function getParent($x){ return $this->parents[$x]; }
 }
 ?>