<?php

$con = mysqli_connect("localhost", "otech47_sc", "soundcloud1","otech47_soundcloud");

if (!$con)
{
	die('Could not connect: ' . mysql_error());
}

$selection = $_POST['select'];
$resultArray = array();
$sql = "SELECT url FROM sets WHERE event='$selection'";
$result = mysqli_query($con, $sql);
$i = 0;
while($row = mysqli_fetch_array($result))
{
	$resultArray[$i] = $row[0];
	$i++;
}
if(empty($resultArray))
{
	$sql = "SELECT url FROM sets WHERE artist='$selection'";
	$result = mysqli_query($con, $sql);
	$i = 0;
	while($row = mysqli_fetch_array($result))
	{
		$resultArray[$i] = $row[0];
		$i++;
	}
}
if(!empty($resultArray))
{
	$j = rand(0, count($resultArray)-1);
	$returnResult = "<iframe id='current-result' width='100%' height='100%' scrolling='no' frameborder='no' src=".stripslashes($resultArray[$j])."&amp;auto_play=true&amp;show_user=false"."></iframe>";
	echo $returnResult;
}
else
{
	$returnResult = "<p>No results found";
	echo $returnResult;
}

?>