<?php
if (isset($_SERVER['HTTP_COOKIE'])) {
    $cookies = explode(';', $_SERVER['HTTP_COOKIE']);
    foreach($cookies as $cookie) {
        $parts = explode('=', $cookie);
        $name = trim($parts[0]);
        setcookie($name, '', time()-1000);
        setcookie($name, '', time()-1000, '/');
    }
}
?>
<html>
<head>
<title>Experiment Run Template</title>
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
		

		<tr style="text-align:center">
			<div> Please input your personal informational below.</div>
			<br />
		</tr>
		<form action="analyze1.php" method="post">
		<tr height="35px">
			<td style="width:auto" align="left">
				<font style="font-weight:bold">Name: </font>
			</td>
			<td>
				<input type="text" class="Inputtext" name="name" value="XXX">
			</td>
		</tr>
		
		<tr height="35px">
		<td style="width:auto" align="left">
			<font style="font-weight:bold">Sex: </font>
		</td>
		<td>	
			<select name="sex" style="width:auto">
					<option value="female">Female</option>
					<option value="male">Male</option>
			</select>		
		</td>
		</tr>
		
		<tr height="35px">
		<td style="width:auto" align="left">
			<font style="font-weight:bold">Age: </font>
		</td>	
		<td>	
			<select name="age" style="width:auto">
					<option value="< 20"> < 20 </option>			
					<option value="20-25"> 20-25</option>
					<option value="26-30"> 26-30</option>
					<option value="31-35"> 31-35</option>
					<option value="36-40"> 36-40</option>
					<option value="> 40"> > 40</option>
			</select>	
		</td>
		</tr>
		
		<tr height="35px">
			<td>
				<font style="font-weight:bold">Department: &nbsp </font>
			</td>
			<td>
				<input type="text" class="Inputtext" name="department" name="txt_input" value="XXX">
			</td>
		</tr>

	
		<tr height="35px">
			<td>
				<font style="font-weight:bold">Subject ID: &nbsp </font>
			</td>
			<td>
				<select id="subject_id" name="user" style="width:auto">
					<script language="javascript">
            			for(i = 0; i < 50; i++)
            				document.getElementById("subject_id").add(new Option(i.toString(),i));
            		</script>
				</select>&nbsp;		
			</td>
		</tr>
		<table>
		<br />
		<br />
		<tr>
		<input type="submit" style="width:100px; height:30px; font-weight:bold; font-size:20px" value="Start!">
		</table>
		</tr>
		</form>		
	</table>
	
</body>
</html>



















