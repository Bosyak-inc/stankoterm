<?php
if (isset($_POST['name']) &amp;&amp; $_POST['name'] != "")
	$name = $_POST['name'];
else die ("Не заполнено поле \"Имя\"");

if (isset($_POST['email']) &amp;&amp; $_POST['email'] != "")
	$email = $_POST['email'];
else die ("Не заполнено поле \"Email\"");

if (isset($_POST['subjects']) &amp;&amp; $_POST['subjects'] != "") 
	$sub = $_POST['subjects'];
else die ("Не заполнено поле \"Тема\"");

if (isset($_POST['message']) &amp;&amp; $_POST['message'] != "") 
	$body = $_POST['message'];
else die ("Не заполнено поле \"Сообщение\"");

$address = "siisgoo@mail.ru";
$mes  = "Имя: $name \n";
$mes .= "E-mail: $email \n";
$mes .= "Тема: $sub \n";
$mes .= "Текст: $body"; 
$send = mail($address,$sub,$mes,"Content-type:text/plain; charset = UTF-8\r\nFrom:$email");

if ($send)
	echo "Сообщение отправлено успешно! Перейти на <a href='https://stankoterm.ru'>stankoterm.ru</a>, если вас не перенаправило вручную.";
else 
	echo "Ошибка, сообщение не отправлено! Возможно, проблемы на сервере";
?>
