<?php

namespace App\Service;

use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Twig\Environment;

class MailerService
{
    private MailerInterface $mailer;
    private Environment $twig;

    public function __construct(MailerInterface $mailer, Environment $twig)
    {
        $this->mailer = $mailer;
        $this->twig = $twig;
    }

    public function sendEmailActivation($to = 'you@example.com', $subject = 'Activation de votre compte', $pinCode = '123456', $duration = 30): void
    {
        // Diviser le PIN en un tableau de chiffres
        $pinCodeArray = str_split($pinCode);
    
        $content = $this->twig->render('emails/activation.html.twig', [
            'pinCode' => $pinCodeArray,
            'duration' => $duration,
        ]);
    
        $email = (new Email())
            ->from('toavinawukeys@gmail.com')
            ->to($to)
            ->subject($subject)
            ->html($content);
    
        $this->mailer->send($email);
    }
    
}
