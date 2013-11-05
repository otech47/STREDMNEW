<?php

$con = mysqli_connect("localhost", "otech47_sc", "soundcloud1","otech47_soundcloud");

if (!$con)
{
	die('Could not connect: ' . mysql_error());
}

$url = $_POST['url'];
$resultArray = array();
$sql = "SELECT tracklist FROM sets WHERE url='$url'";
$result = mysqli_query($con, $sql);
$i = 0;
while($row = mysqli_fetch_array($result))
{
	$resultArray[$i] = $row[0];
	$i++;
}
if(!empty($resultArray))
{
	$returnResult = "<iframe id='current-result' width='100%' height='100%' scrolling='no' frameborder='no' src=".stripslashes($resultArray[0])."&amp;auto_play=true&amp;show_user=false"."></iframe>";
	echo $returnResult;
}
else
{
	$returnResult = "No tracklist found";
	echo $returnResult;
}

?>