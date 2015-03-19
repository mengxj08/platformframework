<?php

if(!isset($_GET['taskTime'])){
    $message = "No taskTime passed";
    header("Location: task.php?message=".$message);
    exit;
}

$taskTime = $_GET['taskTime'];


if (!isset($_COOKIE["user"])){
    $message = "Please use a participant ID";
    header("Location: index.php?message=".$message);
    exit;
}

$user = $_COOKIE["user"];

if (!isset($_COOKIE["block"])){
    $message = "No block in the cookie";
    header("Location: index.php?message=".$message);
    exit;
}
$block = $_COOKIE["block"];
$block_tmp = $block;

if (!isset($_COOKIE["max_blocks"])){
    $message = "No max_blocks in the cookie";
    header("Location: index.php?message=".$message);
    exit;
}
$max_blocks = $_COOKIE["max_blocks"];

if (!isset($_COOKIE["trial"])){
    $message = "No trial in the cookie";
    header("Location: index.php?message=".$message);
    exit;
}
$trial = $_COOKIE["trial"];
$trial_tmp = $trial;

if (!isset($_COOKIE["max_trials"])){
    $message = "No max_trials in the cookie";
    header("Location: index.php?message=".$message);
    exit;
}
$max_trials = $_COOKIE["max_trials"];

if (!isset($_COOKIE["condition"])){
    $message = "No condition in the cookie";
    header("Location: index.php?message=".$message);
    exit;
}
$condition = $_COOKIE["condition"];
$condition_tmp = $condition;

if (!isset($_COOKIE["max_conditions"])){
    $message = "No max_conditions in the cookie";
    header("Location: index.php?message=".$message);
    exit;
}
$max_conditions = $_COOKIE["max_conditions"];

if (!isset($_COOKIE["CurrentTrial"])){
    $message = "No CurrentTrial in the cookie";
    header("Location: index.php?message=".$message);
    exit;
}
$CurrentTrial = $_COOKIE["CurrentTrial"];
$CurrentTrial_tmp = $CurrentTrial;

if (!isset($_COOKIE["TrialsperBlock"])){
    $message = "No TrialsperBlock in the cookie";
    header("Location: index.php?message=".$message);
    exit;
}
$TrialsperBlock = $_COOKIE["TrialsperBlock"];

//-----------Session start--------------
session_start();
$session_name = "recordedData";
if(!isset($_SESSION[$session_name])) {
    $message = "No session in the storage";
    header("Location: task.php?message=".$message);
    exit;
}
else{
    $_SESSION[$session_name][$block]["children"][$condition]["children"][$trial]["time"] = $taskTime;
}
//


$trial ++;
$CurrentTrial ++;
if($trial >= $max_trials)
{
	$trial = 0;
	$condition ++;
	if($condition >= $max_conditions)
	{
		$condition = 0;
		$CurrentTrial = 1;
		$block ++;
		if($block >= $max_blocks)
		{
			header("Location: final.php");
		}
	}
}
setcookie("block", $block, time()+(3600*3));
setcookie("condition", $condition,time()+(3600*3));
setcookie("trial", $trial, time()+(3600*3));
setcookie("CurrentTrial", $CurrentTrial, time()+(3600*3));

?>
<html>
<head>
<title>Experiment Run Template</title>

<script type ="text/javascript" src ="image/index.js"></script>
<script type="text/javaScript" src="js/count_time.js"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script>
	function jump(next_page){
        location.href = next_page;
    }
			

	function show_image()
    {
		var i = Math.round(Math.random() * (image.length - 1));
        document.getElementById("mask").setAttribute('src', "image/" + image[i]);
    }
 
    $(document).ready(function(){
    	//show_image();

		var name = prompt("Any request or problem to the participant?", "null");
		if(name != "null")
			jump("task.php");

    });	
</script> 
</head>

<body>
	  <table>
		<b>Subject ID: </b> 
			   <?php echo $user ?>
		&nbsp; Trial: <?php echo $CurrentTrial_tmp ?>/<?php echo $TrialsperBlock ?>
		&nbsp;
		&nbsp; Block: <?php echo ($block + 1) ?>/<?php echo $max_blocks ?>
		&nbsp;
		<hr />	
	</table>
	<div align = "left">
		 <image id = "mask">
  		 </image>
	</div>
</body>
</html>

