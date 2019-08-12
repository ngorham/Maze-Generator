<?php
/**
 * Portfolio
 * getMaze.php
 * Purpose: Maze output page of Portfolio
 * 
 * @author Neil Gorham
 * @version 1.0 07/20/2014
 */
 
include_once "mazeGen.php";

//Object Instantiation
$m = new MazeGen($_REQUEST["mazeSize"]);

sleep(.5); // delay .5 second to simulate lag
echo $m->displayGrid();
?>
