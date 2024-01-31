<?php

namespace App\Application\Support;

use PHPMailer\PHPMailer\PHPMailer;

class Mailer
{
    public PHPMailer $mailer;

    public function __construct()
    {
        $this->mailer = new PHPMailer(true);
        $this->mailer->CharSet = 'UTF-8';
        $this->mailer->isHTML();
        $this->mailer->isSMTP();
        $this->mailer->Host = 'smtp.office365.com';
        $this->mailer->SMTPSecure = 'tls';
        $this->mailer->SMTPAuth   = true;
        $this->mailer->Username = 'vana4@spsejecna.cz';
        $this->mailer->Password = 'MikuNato12';
        $this->mailer->Port = 587;
        $this->mailer->SMTPOptions = [
            'ssl' => [
                'verify_peer'       => false,
                'verify_peer_name'  => false,
                'allow_self_signed' => true
            ]
        ];
    }
}