<?php

namespace App\Application\Actions\Email;

use App\Application\Actions\Action;
use App\Application\Actions\ActionPayload;
use App\Application\Support\Mailer;
use Exception;
use Psr\Http\Message\ResponseInterface as Response;

class SendEmailAction extends Action
{
    /**
     * @return Response
     * @throws \PHPMailer\PHPMailer\Exception
     */
    protected function action(): Response
    {
        //Validate data from Form
        $formData = $this->getFormData();
        if (!$this->validateForm($formData)) {
            return $this->respond(new ActionPayload(400, 'Invalid Form'));
        }

        //Create new Mail
        $mailer = new Mailer();
        $mailer->mailer->setFrom('vana4@spsejecna.cz', 'Martin Váňa');
        $mailer->mailer->addAddress($formData['to']);
        $mailer->mailer->Subject = $formData['subject'];
        $mailer->mailer->Body = $formData['body'];
        //If cc exists in the form
        if (array_key_exists('cc', $formData) && filter_var($formData['cc'], FILTER_VALIDATE_EMAIL)) {
            $mailer->mailer->addCC($formData['cc']);
        }

        try {
            //Send email & handle error
            $mailer->mailer->send();
            return $this->respond(new ActionPayload(200, ['message' => 'OK']));
        } catch (Exception) {
            return $this->respond(new ActionPayload(400, ['message' => 'ERROR']));
        }
    }

    private function validateForm(array $formData): bool
    {
        if (!array_key_exists('to', $formData) || !filter_var($formData['to'], FILTER_VALIDATE_EMAIL)) {
            return false;
        }
        if (!array_key_exists('subject', $formData)) {
            return false;
        }
        if (!array_key_exists('body', $formData)) {
            return false;
        }
        return true;
    }
}