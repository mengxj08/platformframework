<?php
if (!empty($_POST)) {
    $arrangement = $_POST["arrangement"];
    //echo "hello";
} else {
    header("Location: index.php");
    /* Make sure that code below does not get executed when we redirect. */
    exit;
}

setcookie("arrangement", $arrangement, time()+(3600*3)); // time of expiration is 3 hours

if (!isset($_COOKIE["user"])){
    $message = "Please use a username";
    header("Location: index.php?message=".$message);
    exit;
}

$user = $_COOKIE["user"];

/*
	Read the xml file
*/

//$xml = simplexml_load_file("design/AutoComPaste.xml");
//echo $xml->variables->independent_variable->name;
/*
foreach ($xml->variables->children() as $child)
{
	echo $child->name . "<br/>";
}
*/
/*
	Read the json file
*/
$json = json_decode(file_get_contents("design/Arrangement.json"), true);

$arrangementNum = sizeof($json["children"]);
$blockNum = sizeof($json["children"][0]["children"]);
$conditionNum = sizeof($json["children"][0]["children"][0]["children"]);
$trialNum = sizeof($json["children"][0]["children"][0]["children"][0]["children"]);

$TrialsperBlock = $conditionNum * $trialNum;
/*
echo $arrangementNum; echo "\n";
echo $blockNum; echo "\n";
echo $conditionNum; echo "\n";
echo $trialNum; echo "\n";
*/

// SET FOR BLOCKS HERE!!!

$max_blocks = $blockNum;

setcookie("max_blocks", strval($max_blocks), time()+(3600*3));

setcookie("block", strval(0), time()+(3600*3));

setcookie("condition", strval(0),time()+(3600*3));

setcookie("max_conditions", $conditionNum,time()+(3600*3));

setcookie("trial", strval(0), time()+(3600*3));

setcookie("max_trials", $trialNum, time()+(3600*3));

setcookie("CurrentTrial", strval(1), time()+(3600*3));

setcookie("TrialsperBlock", $TrialsperBlock, time()+(3600*3));


$msgArray = array ();

for($i = 0; $i < $arrangementNum; $i ++)
{
    $Automsg = null;
    $Automsg = $Automsg . $json["children"][$i]["name"];
    $Automsg = $Automsg . "<br />";
    $Autojson = $json["children"][$i]["children"][0]["children"];
    foreach($Autojson as $Autovalue)
    {
        $Automsg = $Automsg . $Autovalue["name"] . " : " . $trialNum . " trials";
        $Automsg = $Automsg . "<br />";
    }
    $Automsg = $Automsg . "<br />";
    $Automsg .= "The number of block is : " . $blockNum . ". You need to repeat the process above for " . $blockNum . " times.";
    array_push($msgArray, $Automsg);
}
$js_array = json_encode($msgArray);
//echo $js_array;
if($arrangement == "Automatic")
{
    $Automsg = null;
    $task = $user % $arrangementNum;
    /*
    if($task < $arrangementNum / 2)
    {
    	$interface = "acp";
    }
    else
    {
    	$interface = "xwindow";
    }
    */
    $Automsg = $msgArray[$task];
}
else
{
    $task = 0;
    $Automsg = $msgArray[$task];
}

$taskNum = $task;
?>

<html>
<head>
    <title>Experiment Run Template 1</title>
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
    <script>
        $(document).ready(function(){
            var jsMsg = <?php echo $js_array ?> ;
            $("select").change(function(){
            	$('input[name="taskNum"]').val($("select").val());
                $("#arrangementContent").html( jsMsg[$("select").val()]);
            });
        });
    </script>
</head>
<body>
<div align="center">
    <form action="task.php" method="post">
    <div align="center">
       <a href=""><img src="image/yourlogo.png"></a>
            <hr/>
    </div>
    <div align="center">
       <font size="+2" color="#FF0033" face="Georgia, Times New Roman, Times, serif"> Welcome to the XXX vs YYY experiment! </font>
       <br /><br />
       <br /><br />
       <font size="+1" color="#FF0033" face="Georgia, Times New Roman, Times, serif"> You have chosen the condition: </font>
       <br /><br />
    </div>
    <?php
	if($arrangement == "Manual")
	{
	?>
	<table>
		<tr height="35px">
		<td style="width:auto" align="left">
			<font style="font-weight:bold; font-size: 15pt">Arrangement: </font>
		</td>	
		<td>	
			<select name="tasks" style="width:auto">
				<?php
					for($i = 0; $i < $arrangementNum; $i++):
				?>
						<option value="<?php echo $i; ?>"> <?php echo $i; ?> </option>
				<?php endfor; ?>
			</select>	
		</td>
		</tr>
	</table>
	<?php
	}
	else
	{
	}
	?>
    <table>
        <br /><br />
            <td>
                <p id="arrangementContent" style="font-size: 14pt">
                    <?php echo $Automsg ?>
                </p>
            </td>
    </table>
	<table>
		<br /><br />
		<td>
			<input name="taskNum" type="hidden" value="<?php echo $taskNum; ?>" >		
			<input id="submit" type="submit" style="width:100px; height:30px; font-weight:bold; font-size:20px" value="submit">
		</td>
	</table>
    </form>
</div>
</body>
</html>