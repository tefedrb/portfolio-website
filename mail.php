
<?php
    //Takes raw data from request
    // $json = file_get_contents('php://input');

    //Converts it into a PHP object
    // $data = json_decode($json);
    /*
    $headers = $data->email;
    $subject = $data->subject;
    $message = $data->body; */
    $to_email = 'tefebell@gmail.com';
    $headers = $_POST["email"];
    $subject = "Sent from mail.php";
    $message = "From: ".$_POST["message"];
    mail($to_email,$subject,$message,$headers);
?>