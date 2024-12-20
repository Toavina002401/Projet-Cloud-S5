<?php

namespace App\Controller;

use App\Repository\UtilisateurRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Service\ResponseHelper;
use App\Entity\PIN;
use App\Service\MailerService;
use OpenApi\Annotations as OA;


class UtilisateurController extends AbstractController
{
    private ResponseHelper $responseHelper;
    private MailerService $mailerService;

    public function __construct(ResponseHelper $responseHelper,MailerService $mailerService)
    {
        $this->responseHelper = $responseHelper;
        $this->mailerService = $mailerService;
    }

    #[Route('/api/inscription', name: 'inscription', methods: ['POST'])]
    public function inscription(Request $request, EntityManagerInterface $em, UserPasswordHasherInterface $passwordHasher, UtilisateurRepository $utilisateurRepository, MailerService $mailerService): JsonResponse 
    {
        $data = json_decode($request->getContent(), true);
        return $utilisateurRepository->inscription($data, $em, $passwordHasher, $mailerService);
    }


    #[Route('/api/validate-pin-inscription', name: 'validate_pin', methods: ['POST'])]
    public function validatePin(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['email'], $data['codePin'])) {
            return new JsonResponse(['status' => 'erreur', 'error' => 'Données invalides'], 400);
        }

        // Récupérer le code PIN correspondant
        $pinRepository = $em->getRepository(PIN::class);
        $pin = $pinRepository->findOneBy(['code' => $data['codePin']]);

        if (!$pin || $pin->getUtilisateur()->getEmail() !== $data['email']) {
            return new JsonResponse(['status' => 'erreur', 'error' => 'Code PIN incorrect'], 400);
        }

        // Vérifier la date d'expiration
        if ($pin->getDateExpiration() < new \DateTimeImmutable()) {
            return new JsonResponse(['status' => 'erreur', 'error' => 'Code PIN expiré'], 400);
        }

        // Activer l'utilisateur
        $utilisateur = $pin->getUtilisateur();
        $utilisateur->setActif(true);

        // Supprimer le code PIN
        $em->remove($pin);
        $em->flush();

        return new JsonResponse(['status' => 'succes', 'message' => 'Inscription validée']);
    }
}
