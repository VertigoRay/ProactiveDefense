<?php
header('Access-Control-Allow-Origin: http://www.proactivedefense.net');

$start = ($_REQUEST['start'] ? date('Y-m-d', strtotime($_REQUEST['start'])) : date('Y-m-d'));
$end = ($_REQUEST['end'] ? date('Y-m-d', strtotime($_REQUEST['end'])) : date('Y-m-d', strtotime('today + 30 days')));

require_once 'mindbody-php-api/MB_API.php'; // FROM: https://github.com/devincrossman/mindbody-php-api.git
$mb = new MB_API(json_decode(file_get_contents("mindbody-sourceCredentials.json"), true));

$data = $mb->GetClasses(array('StartDateTime'=>$start, 'EndDateTime'=>$end));

if(!empty($data['GetClassesResult']['Classes']['Class'])) {
	$classes = $mb->makeNumericArray($data['GetClassesResult']['Classes']['Class']);
	if ($_GET['print_r']) {
		echo '<pre>';
		print_r($classes);
		echo '</pre>';
	} else {
		$json = array();
		foreach($classes as $class) {
			$sDate = date('m/d/Y', strtotime($class['StartDateTime']));
			$sLoc = $class['Location']['ID'];
			$sTG = $class['ClassDescription']['Program']['ID'];
			$sType = -7;
			$sclassid = $class['ClassScheduleID'];
			$studioid = $class['Location']['SiteID'];


			array_push($json, array(
			    "title" => $class['ClassDescription']['Name'],
			    "start" => date('Y-m-d H:i:s', strtotime($class['StartDateTime'])),
			    "end" => date('Y-m-d H:i:s', strtotime($class['EndDateTime'])),
			    "url" => "https://clients.mindbodyonline.com/ws.asp?sDate={$sDate}&sLoc={$sLoc}&sTG={$sTG}&sType={$sType}&sclassid={$sclassid}&studioid={$studioid}",
			    "className" => ($class['IsCanceled'] ? "class_canceled" : "")
			));
		}
		echo json_encode($json);
	}
} else {
	if(!empty($data['GetClassesResult']['Message'])) {
		echo $data['GetClassesResult']['Message'];
	} else {
		echo "Error getting classes<br />";
		echo '<pre>'.print_r($data,1).'</pre>';
	}
}
?>