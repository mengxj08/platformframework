<?php
	$config = json_decode(file_get_contents("config/config.json"), true);
?>
<html>
<head>
<title>Experiment Run Template</title>
<script>
</script>
</head>

<body>

	<center>
	<table align="center">
		<tr id="image"> 
			<a href="http://hci.comp.nus.edu.sg/index.html"><img src="image/yourlogo.png"></a> 
			<hr/>
		</tr>
		<tr id="introduction">
			<div>
			<font size="+2" color="#FF0033" face="Georgia, Times New Roman, Times, serif"> Welcome to the XXX vs YYY experiment! </font>
			</div>	
			<br /><br />	
		</tr>
<?php
    if($config['post-questionnaire'] && trim($config['post-questionnaire']) != ""){
?>
			<div align="center">
			<h4>Please fill in the post-questionnaire:</h4>
			<iframe src="<?php echo $config['post-questionnaire']; ?>" width="760" height="500" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>
			</div>
<?php
    }
?>
		<tr style="text-align:center">
			<br />
		    <hr />
			<div> <font size="+1">The experiment is over. Thanks for your participating!</font></div>
			<br />
			<div><a href="download.php">Download</a> the resulting data.</div>
		</tr>
	</table>
	
</body>
</html>



















