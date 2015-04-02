<?php
session_start();

$session_name = "recordedData";
$session_subject = "subjectID";
$session_betweenIV = "betweenIV";
$File = "ResultOfParticipant-".$_SESSION[$session_subject].".csv";
header("Content-Disposition: attachment; filename=\"" . basename($File) . "\"");
header("Content-Type: application/force-download");
header("Connection: close");

if(!isset($_SESSION[$session_name]) && !isset($_SESSION[$session_subject]) && !isset($_SESSION[$session_betweenIV])){
    echo "The result is not set successfully!";
} else {
	$DVArray = array();
	if (strpos($_SESSION[$session_betweenIV],'(') !== false) {
		$DVpieces = explode(",", $_SESSION[$session_betweenIV]);
		for($i = 0; $i < sizeof($DVpieces); $i++){
			if($i == 0){
				$IV = explode("(", $DVpieces[$i])[1];
				$IV = explode(")", $IV)[0];
				$IV = trim($IV);
				if($IV != ""){
					$IV_name = "IV".$i;
					$DVArray[$IV_name] = $IV;
				}
			}
			elseif($i == sizeof($DVpieces) - 1){
				$IV = explode(")", $DVpieces[$i])[0];
				$IV = trim($IV);
				$IV_name = "IV".$i;
				$DVArray[$IV_name] = $IV;
			}
			else{
				$IV = $DVpieces[$i];
				$IV = trim($IV);
				$IV_name = "IV".$i;
				$DVArray[$IV_name] = $IV;
			}
		}
	}
	$NumOfBetweenIV = sizeof($DVArray);
	$resultArray = array();
	foreach($_SESSION[$session_name] as $block){
		foreach($block["children"] as $condition){
			foreach($condition["children"] as $trial){
				$tmp = array("ParticipantID" => $_SESSION[$session_subject]);
				$tmp['BlockNo'] = $block["name"];
				
				for($i = 0; $i < $NumOfBetweenIV; $i++){
					$IV_name = "IV".$i;
					$tmp[$IV_name] = $DVArray[$IV_name];
				}
				$pieces = explode(",",$condition["name"]);
				for($i = 0; $i < sizeof($pieces); $i++){
					if($i == 0){
						$IV = explode("(", $pieces[$i])[1];
						$IV = explode(")", $IV)[0];
						$IV = trim($IV);
						if($IV != ""){
							$IV_name = "IV".($i + $NumOfBetweenIV);
							$tmp[$IV_name] = $IV;
						}
					}
					elseif($i == sizeof($pieces) - 1){
						$IV = explode(")", $pieces[$i])[0];
						$IV = trim($IV);
						$IV_name = "IV".($i + $NumOfBetweenIV);
						$tmp[$IV_name] = $IV;
					}
					else{
						$IV = $pieces[$i];
						$IV = trim($IV);
						$IV_name = "IV".($i + $NumOfBetweenIV);
						$tmp[$IV_name] = $IV;
					}
				}
				$tmp['TrialNo'] = $trial["name"];
				$tmp['Time'] = $trial["time"];

				array_push($resultArray, $tmp);
			}
		}
	}

	$firstLineKeys = false;
	foreach($resultArray as $line){
		if(empty($firstLineKeys)){
			$firstLineKeys = array_keys($line);
			//echo json_encode($firstLineKeys);
			echo implode(",",$firstLineKeys);
			echo "\r\n";
		}
		echo implode(",",$line);
		echo "\r\n";
	}
    //echo json_encode($resultArray);
    //echo json_encode($_SESSION[$session_name]);
}
?>
