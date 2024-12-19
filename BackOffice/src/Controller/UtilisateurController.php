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
use App\Entity\Utilisateur;
use OpenApi\Annotations as OA;


/**
 * @OA\Info(
 *     title="Documentation API Projet-Cloud-S5",
 *     description="Documentation de tous les APIs de notre projet",
 *     version="1.0.0"
 * )
 * @OA\Tag(name="Utilisateur", description="Opérations liées au contrôleur pour l'utilisateur")
 */
class UtilisateurController extends AbstractController
{
    private ResponseHelper $responseHelper;
    private MailerService $mailerService;

    public function __construct(ResponseHelper $responseHelper,MailerService $mailerService)
    {
        $this->responseHelper = $responseHelper;
        $this->mailerService = $mailerService;
    }

    /**
     * @OA\Post(
     *     path="/api/inscription",
     *     summary="Inscription de l'utilisateur",
     *     tags={"Utilisateur"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email", "password"},
     *             @OA\Property(property="email", type="string", example="user@example.com"),
     *             @OA\Property(property="password", type="string", example="password123")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Inscription réussie",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="succes"),
     *             @OA\Property(property="message", type="string", example="Utilisateur créé")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Données invalides"
     *     )
     * )
     */
    #[Route('/api/inscription', name: 'inscription', methods: ['POST'])]
    public function inscription(Request $request, EntityManagerInterface $em, UserPasswordHasherInterface $passwordHasher, UtilisateurRepository $utilisateurRepository, MailerService $mailerService): JsonResponse 
    {
        $data = json_decode($request->getContent(), true);
        return $utilisateurRepository->inscription($data, $em, $passwordHasher, $mailerService);
    }

    /**
     * @OA\Post(
     *     path="/api/validate-pin-inscription",
     *     summary="Valider le code PIN d'inscription",
     *     tags={"Utilisateur"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email", "codePin"},
     *             @OA\Property(property="email", type="string", example="user@example.com"),
     *             @OA\Property(property="codePin", type="string", example="123456")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Inscription validée",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="succes"),
     *             @OA\Property(property="message", type="string", example="Inscription validée")
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Données invalides ou code PIN incorrect"
     *     )
     * )
     */
    #[Route('/api/validate-pin-inscription', name: 'validate_pin', methods: ['POST'])]
    public function validatePin(Request $request, EntityManagerInterface $em, UtilisateurRepository $utilisateurRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        return $utilisateurRepository->validationPinInscription($data,$em);
    }


    #[Route('/api/utilisateur/{id}', name: 'update_utilisateur', methods: ['PUT'])]
    public function updateUtilisateur(int $id, Request $request, EntityManagerInterface $em,UtilisateurRepository $utilisateurRepository, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        return $utilisateurRepository->update($id,$request,$em,$passwordHasher);
    }


    #[Route('/api/utilisateur/{id}', name: 'delete_utilisateur', methods: ['DELETE'])]
    public function deleteUtilisateur(int $id, EntityManagerInterface $em,UtilisateurRepository $utilisateurRepository): JsonResponse
    {
        return $utilisateurRepository->delete($id,$em);
    }


    #[Route('/api/utilisateur/{id}', name: 'get_utilisateur', methods: ['GET'])]
    public function getUtilisateur(int $id, EntityManagerInterface $em,UtilisateurRepository $utilisateurRepository): JsonResponse
    {
        return $utilisateurRepository->getOneUtilisateur($id,$em);
    }

    #[Route('/api/utilisateurs', name: 'get_liste_utilisateurs', methods: ['GET'])]
    public function getListeUtilisateurs(EntityManagerInterface $em,UtilisateurRepository $utilisateurRepository): JsonResponse
    {
        return $utilisateurRepository->getListeUtilisateur($em);
    }


}
