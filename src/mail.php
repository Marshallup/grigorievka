<?php

use phpMailer\PHPMailer\PHPMailer;

$name = $_POST['up'];
$nameSite = "Григорьевка сайт";

require_once('phpmailer/PHPMailer.php');
require_once('phpmailer/SMTP.php');
require_once('phpmailer/Exception.php');
$mail = new PHPMailer();

$mail->isSMTP();
$mail->Host = "smtp.mail.ru";
$mail->SMTPAuth = true;
$mail->Username = "mikhail.teslya22@mail.ru";
$mail->Password = "123890tesL";
$mail->Port = 465;
$mail->SMTPSecure = "ssl";
$mail->CharSet = 'utf-8';

$mail->isHTML(true);
$mail->setFrom("mikhail.teslya22@mail.ru", adopt($nameSite));
$mail->addAddress("spk.grigorevka@mail.ru");

foreach ($_POST as $key => $value) {
    if ($key != 'up' && $value != '') {
        $message .= "
        " . (($c = !$c) ? '<tr>' : '<tr style="background-color: #f8f8f8;">') . "
            <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$key</b></td>
            <td style='padding: 10px; border: #e9e9e9 1px solid;'>$value</td>
        </tr>
        ";
    }
}


// $message = "
// " . '<tr>' . '<tr style="background-color: #f8f8f8;">' . "
//     <td style='padding: 10px; border: #e9e9e9 1px solid;'><b>$name</b></td>
//     <td style='padding: 10px; border: #e9e9e9 1px solid;'>$text</td>
// </tr>
// ";
function adopt($text)
{
    return '=?UTF-8?B?' . Base64_encode($text) . '?=';
}
$mail->Subject = adopt($name);
$mail->Body = "<table style='width: 100%;'>$message</table>";

if ($mail->send()) {
    print 'hello';
} else {
    print "Нет";
}
