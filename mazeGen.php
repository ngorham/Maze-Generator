<?php
/**
 * Hexidecimal Maze Generator: implements disjoint-set forests using Union-Find structure
 * mazeGen.js
 * Purpose: Implement Union-Find operations
 * 
 * @author Neil Gorham 
 * @version 1.0 07/21/2014
 */
 
include_once "unionFind.php";
//Maze Generator Class Constructor
class MazeGen extends UnionFind{
	//Member variables
	private $RIGHT = 1;
	private $BOTTOM = 2;
	private $LEFT = 4;
	private $TOP = 8;
	private $START = 11;
	private $END = 14;
	private $INIT = 15;
	private $row;
	private $size;
	private $maze;
	private $indices;
	
    /**
     * Constructor
     *
     * @param $n Number of elements in a single row in the maze
     */
	function __construct($n){
		//Initialize member variables
		$this->row = $n;
		$this->size = $n * $n;
		$this->maze = array($this->size);
		$this->indices = array($this->size);
		parent::__construct($this->size);
		$this->maze[0] = $this->START;
		$this->maze[$this->size - 1]= $this->END;
		for($i = 1; $i < $this->size - 1; $i++){
			$this->maze[$i] = $this->INIT;
		}
		for($i = 0; $i < $this->size; $i++){
			$this->makeSet($i);
			$this->indices[$i] = $i;
		}
		for($i = 0; $i < $this->size; $i++){
			$rand = mt_rand(0, $this->size - 1);
			$this->swap($this->indices, $i, $rand);
		}
		$this->genMaze();
	}
	
	//Generator single path random maze
	function genMaze(){
		$set1 = 0;
		$set2 = 0;
		while($this->getNumSets() != 1){
			$rand = mt_rand(0, $this->size - 1);
			$set1 = $this->indices[$rand];
			$set2 = $this->pickAdjacent($set1, $this->setRandWall($set1));
			if(!$this->sameSet($set1, $set2)){
				$this->union($set1, $set2);
				$this->breakWalls($set1, $set2);
			}
		}
		
	}
	
	//Print maze contents
	function mPrint(){
		for($i = 0; $i < $this->size; $i++){
			if(($i + 1) % $this->row == 0){
				echo $this->intToChar($this->maze[$i]) . "<br >";
			} else {
				echo $this->intToChar($this->maze[$i]);
			}
		}
	}
	
	//Print maze contents as graphic directories
	function displayGrid(){
		for($i = 0; $i < $this->size; $i++){
			if(($i + 1) % $this->row == 0){
				echo "<img src=\"images/grid" . $this->maze[$i] . ".svg\" alt=\"" . $this->maze[$i] . "\" class=\"img-responsive inline-block\" ><br >";
			} else { 
				echo "<img src=\"images/grid" . $this->maze[$i] . ".svg\" alt=\"" . $this->maze[$i] . "\" class=\"img-responsive inline-block\" >";
			}
		}
	}
	
	//Convert int to ascii for print
	function intToChar($x){
		$alpha = 87;
		$digit = 48;
		if((($x == 10 || $x == 11) ||($x == 12 || $x == 13))
			|| ($x == 14 || $x == 15)){
			return chr($x + $alpha);
		}
		return chr($x + $digit);
	}
	
	//Swap values i and j in array a
	function swap($a, $i, $j){
		$temp = $a[$i];
		$a[$i] = $a[$j];
		$a[$j] = $temp;	
	}
	
	//Check right wall return true if breakable
	function checkRight($x){ return (($x + 1) % $this->row > 0); }
	
	//Check bottom wall return true if breakable
	function checkBottom($x){ return (($x + $this->row) < ($this->row * $this->row)); }
	
	//Check left wall return true if breakable
	function checkLeft($x){ return ($x % $this->row > 0); }
	
	//Check top wall return true if breakable
	function checkTop($x){ return ($x - $this->row >= 0); }
	
	//Randomly pick an available wall from set1
	function setRandWall($set1){
		$wCount = 0;
		$w = 0;
		//Walls in set1
		$sr = false;
		$sb = false;
		$sl = false; 
		$st = false;
		if($this->checkRight($set1)){
			$wCount++;
			$sr = true;
		}
		if($this->checkBottom($set1)){
			$wCount++;
			$sb = true;
		}
		if($this->checkLeft($set1)){
			$wCount++;
			$sl = true;
		}
		if($this->checkTop($set1)){
			$wCount++;
			$st = true;
		}
		//evaluate available walls
		if(($sr && $sb) && ($sl && $st)) //4 walls - r,b,l,t
			$w = mt_rand(0, $wCount - 1); //0 - 3
		if((!$sr && $sb) && ($sl && $st)) //3 walls - b,l,t
			$w = mt_rand(1, $wCount); //1 - 3
		if(($sr && !$sb) && ($sl && $st)){ //3 walls - r,l,t
			$w = mt_rand(0, $wCount); //0 2 3
			if($w == 1) $w--;
		}
		if(($sr && $sb) && (!$sl && $st)){ //3 walls - r,b,t
			$w = mt_rand(0, $wCount); //0 1 3
			if($w == 2) $w++;
		}
		if(($sr && $sb) && ($sl && !$st)) //3 walls - r,b,l
			$w = mt_rand(0, $wCount - 1); //0 - 2
		if(!($sr || $sb) && ($sl && $st)) //2 walls - l,t
			$w = mt_rand(1, $wCount) + 1; //2 3
		if(!($sb || $sl) && ($sr && $st)) //2 walls - r,t
			$w = mt_rand(0, $wCount - 1) * 3; //0 3
		if(!($sl || $st) && ($sr && $sb)) //2 walls - r,b
			$w = mt_rand(0, $wCount - 1); //0 1
		if(!($sr || $st) && ($sb && $sl)) //2 walls - b,l
			$w = mt_rand(1, $wCount); //1 2
		if(!(($sb || $sl) || $st) && $sr) //1 wall - r
			$w = 0;
		if(!(($sr || $sl) || $st) && $sb) //1 wall - b
			$w = 1;
		if(!(($sr || $sb) || $st) && $sl) //1 wall - l
			$w = 2;
		if(!(($sr || $sb) || $sl) && $st) //1 wall - t
			$w = 3;
		return $w;
	}
	
	//Return adjacent set to set1
	function pickAdjacent($set1, $w){
		if(pow(2, $w) == $this->RIGHT) return $set1 + 1;
		else if(pow(2, $w) == $this->BOTTOM) return $set1 + $this->row;
		else if(pow(2, $w) == $this->LEFT) return $set1 - 1;
		else if(pow(2, $w) == $this->TOP) return $set1 - $this->row;
		return $set1;	
	}
	
	//Break walls of set1 and set2
	function breakWalls($set1, $set2){
		if($set2 - $set1 == 1){ //break x.right y.left
			$this->maze[$set1] -= $this->RIGHT;
			$this->maze[$set2] -= $this->LEFT;
		} else if($set2 - $set1 == $this->row){ //break x.bottom y.top
			$this->maze[$set1] -= $this->BOTTOM;
			$this->maze[$set2] -= $this->TOP;
		} else if($set1 - $set2 == 1){ //break x.left y.right
			$this->maze[$set1] -= $this->LEFT;
			$this->maze[$set2] -= $this->RIGHT;
		} else if($set1 - $set2 == $this->row){ //break x.top y.bottom
			$this->maze[$set1] -= $this->TOP;
			$this->maze[$set2] -= $this->BOTTOM;
		}
		if($this->maze[$set1] < 0) $this->maze[$set1] = 0; //negation check
		if($this->maze[$set2] < 0) $this->maze[$set2] = 0; //negation check
	}
 }
 ?>