<?php
$req = $_POST; // json_decode($_POST);
$seriesName = $req['seriesName'];
$reqType = $req['reqType'];
$numIntervals = $req['numIntervals'];
$startDateTm = date('Y-m-d H:i:s', $req['startDate']/1000);
$endDateTm = date('Y-m-d H:i:s', $req['endDate']/1000);
$startDate=$req['startDate']/1000;
$endDate=$req['endDate']/1000;

$diff = $endDate - startDate;
$step = $diff / $numIntervals;

$actDate = $startDate;
$a = array();
for ($i=0; $i < $numIntervals; $i++)
{
   $a[] = array('x'=>floor($actDate*1000), 'avg'=>150);
   $actDate += $step;
}

header('Content-type: application/json');
echo json_encode($a);
?>

