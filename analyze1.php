<?php

// Process your information here

if (!empty($_POST)) {
	$demodata = $_POST;
    foreach ($_POST as $key => $value) {
        setcookie("demodata_".$key, $value, time()+(3600*3));
    }

    $user = $_POST['user'];

    // save $user as cookie as a carry on data for the next pages
    setcookie("user", $user, time()+(3600*3)); // time of expiration is 3 hours
    
} else {
	//echo "hello";
    if (!isset($_COOKIE["user"])){
    $message = "Please use a participant ID";
    header("Location: index.php?message=".$message);
    exit;
    }
}

$config = json_decode(file_get_contents("config/config.json"), true);
?>
<html>
<head>
    <title>Experiment Run Template</title>
    <script type = "text/javascript" >
      history.pushState(null, null, 'analyze1.php');
      window.addEventListener('popstate', function(event) {
      history.pushState(null, null, 'analyze1.php');
      });
    </script>
</head>
<body>
<div align="center">
		<a href=""><img src="image/yourlogo.png"></a>
		<hr/>	
	</div>
	<div align="center">
		<font size="+2" color="#FF0033" face="Georgia, Times New Roman, Times, serif"> Welcome to the XXX vs YYY experiment! </font>
		<br /><br />
		<br /><br />
</div>
<?php
    if($config['pre-questionnaire'] && trim($config['pre-questionnaire']) != ""){
?>
    <div align="center">
    <h4>Please fill in the pre-questionnaire:</h4>
    <iframe src="<?php echo $config['pre-questionnaire']; ?>" width="760" height="500" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>
    </div>
<?php
    }
?>
<div style="font-size: 16pt">
    <hr />
    <p><b>Below is for experimental conductors only:</b></p>
    <p>    
	This part of the interface makes you choose which Interface do you want to do first. You can also modify the arrangement to whatever you want.
    </p>
    <p>
        In the framework, You have two choices: </br>
        1. Automaic: the arrangement is dependeing on the participant ID</br>
        2. Manual: you can choose any arrangement you want for the current participant</br>
    </p>
    <p>
</div>
<div style="font-size: 16pt">
    <p>Which type of arrangements should participant <?php echo $user; ?> do?</p>
<form action="analyze2.php" method="post">

    <span>Interface</span><br/>
    <input type="radio" name="arrangement" value="Automatic" style="font-size:20px">Automatic<br/>
    <input type="radio" name="arrangement" value="Manual" style="font-size:20px">Manual<br/>
    <br/><br/>
    <input id="submit" type="submit" style="width:100px; height:30px; font-weight:bold; font-size:20px" value="submit">
</form>
</div>

</body>
</html>