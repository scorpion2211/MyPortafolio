<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    $method = $_SERVER['REQUEST_METHOD'];
    if($method == "OPTIONS") {
        die();
    }

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    require 'PHPMailer-5_2/PHPMailerAutoload.php';


    $logUsuario_smtp = 'pruebas_nacho@gmail.com';
    $passUsuario_smtp = '123456';

/*
    $_POST['name'] = "el pepe";
    $_POST['mail'] = "nacho_utn@hotmail.com";
    $_POST['reason'] = "prueba";
    $_POST['message'] = "asdadsada";
*/
    $de = $_POST['mail'];
    $nombreDe = $_POST['name'];

    $asunto = $_POST['reason'];
    $para = 'nacho.mambo@gmail.com';
    $nombrePara = "Ignacio Arias";

    $cuerpo_mail = "Mensaje de: $de<br>" . $_POST['message'];
////////////////////////////////////////////////////////////////////////////////////////////////


        $mail = new PHPMailer();

    try 
    {

        $mail->IsSMTP(); //Defino el uso del servicio SMTP en la clase
        $mail->Host = "smtp.gmail.com";
        $mail->SMTPDebug = 2;
        $mail->SMTPAuth = true;  //Habilita autenticacion
        //$mail->AuthType = $autenticacion;
        $mail->SMTPSecure = "tls";
        $mail->Port = 587;     //Puerto de conexion
        $mail->Username = $logUsuario_smtp; //Usuario
        $mail->Password = $passUsuario_smtp; //Clave
        $mail->CharSet = 'UTF-8';

        
//        $mail->SMTPOptions = array(
 // 'ssl' => array(
 // 'verify_peer' => false,
 // 'verify_peer_name' => false,
 // 'allow_self_signed' => true
 // ));

        


        $mail->setFrom($para, $nombrePara);
        $mail->addAddress($para, "$nombrePara");     // Add a recipient
        //$mail->addAddress($de);               // Name is optional
        //$mail->addReplyTo($de);
        //$mail->addCC($mail_responsable);
        //$mail->addCC($para2);
        //$mail->addBCC($sistemas);
        
        
        $mail->isHTML(true);                                  // Set email format to HTML
        $mail->Subject = $asunto;
        $mail->Body    = $cuerpo_mail;
     
	        $mail->send(); 

        }
        catch(Exception $e)
        {
            //echo "0";
            echo $mail->ErrorInfo;
        }

?>
