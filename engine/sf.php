<?php
	$sendto   = "siisgoo@mail.ru";
	$usermail = $_POST['email'];
	$username = $_POST['name'];
	$userphone = $_POST['phone'];
	$content  = nl2br($_POST['msg']);

	// msg header
	$subject  = "Новое сообщение";
	$headers  = "From: " . strip_tags($usermail) . "\r\n";
	$headers .= "Reply-To: ". strip_tags($usermail) . "\r\n";
	$headers .= "MIME-Version: 1.0\r\n";
	$headers .= "Content-Type: text/html;charset=utf-8 \r\n";

	// msg body
	$msg  = "<html><body style='font-family:Arial,sans-serif;'>";
	$msg .= "<h2 style='font-weight:bold;border-bottom:1px dotted #ccc;'>Новое сообщение</h2>\r\n";
	$msg .= "<p><strong>Имя:</strong> ".$username."</p>\r\n";
	$msg .= "<p><strong>Номер телефона:</strong> ".$userphone."</p>\r\n";
	$msg .= "<p><strong>Почта:</strong> ".$usermail."</p>\r\n";
	$msg .= "<p><strong>Сообщение:</strong> ".$content."</p>\r\n";
	$msg .= "</body></html>";

	if(@mail($sendto, $subject, $msg, $headers)) {
		echo "true";
	} else {
		echo "false";
	}
?>
