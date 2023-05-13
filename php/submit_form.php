<?php
$name = $_POST['name'];
$email = $_POST['list'];
// $message = $_POST['message'];
$file = $_FILES['chooseFile'];

$to = 'beketovekb@gmail.com';
$subject = 'Feedback Form Submission';
$headers = 'From: beketovekb@gmail.com' . "\r\n" .
           'Reply-To: ' . 'skimaksss@gmail.com' . "\r\n" .
           'Content-Type: text/plain; charset=utf-8' . "\r\n";

$fileContent = file_get_contents($file['tmp_name']);
$fileAttachment = chunk_split(base64_encode($fileContent));

$body = "Имя: $name\nДолжность: $email";

$multipartBoundary = md5(time());
$headers .= 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-Type: multipart/mixed; boundary="' . $multipartBoundary . '"';

$multipartMessage = "--" . $multipartBoundary . "\r\n" .
                    "Content-Type: text/plain; charset=utf-8\r\n" .
                    "Content-Transfer-Encoding: 8bit\r\n\r\n" .
                    $body . "\r\n\r\n" .
                    "--" . $multipartBoundary . "\r\n" .
                    "Content-Type: application/octet-stream\r\n" .
                    "Content-Transfer-Encoding: base64\r\n" .
                    "Content-Disposition: attachment; filename=\"" . $file['name'] . "\"\r\n\r\n" .
                    $fileAttachment . "\r\n\r\n" .
                    "--" . $multipartBoundary . "--";

if (mail($to, $subject, $multipartMessage, $headers)) {
    http_response_code(200);
} else {
    http_response_code(500);
}
?>