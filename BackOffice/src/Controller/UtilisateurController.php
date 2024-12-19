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

    public function __construct(ResponseHelper $responseHelper)
    {
        $this->responseHelper = $responseHelper;
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
     *             @OA\Property(property="mdp", type="string", example="password123"),
     *             @OA\Property(property="pseudo", type="string", example="user"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Inscription réussie",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="succes"),
     *             @OA\Property(property="data", type="object", 
     *                 @OA\Property(property="message", type="string", example="Code PIN envoyé à user@example.com")
     *             ),
     *             @OA\Property(
     *                 property="meta", 
     *                 type="array",
     *                 example=null,
     *                 nullable=true,
     *                 @OA\Items(  
     *                     type="string",
     *                     example="null"
     *                 )
     *             ),
     *             @OA\Property(property="error", type="string", nullable=true, example=null)
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Données invalides"
     *     )
     * )
     */
    #[Route('/api/inscription', name: 'inscription', methods: ['POST'])]
    public function inscription(Request $request, EntityManagerInterface $em, UserPasswordHasherInterface $passwordHasher, UtilisateurRepository $utilisateurRepository): JsonResponse 
    {
        $data = json_decode($request->getContent(), true);
        return $utilisateurRepository->inscription($data, $em, $passwordHasher);
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
     *         description="Inscription réussie",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="succes"),
     *             @OA\Property(property="data", type="object", 
     *                 @OA\Property(property="message", type="string", example="Code PIN envoyé à user@example.com")
     *             ),
     *             @OA\Property(
     *                 property="meta", 
     *                 type="array",
     *                 example=null,
     *                 nullable=true,
     *                 @OA\Items(  
     *                     type="string",
     *                     example="null"
     *                 )
     *             ),
     *             @OA\Property(property="error", type="string", nullable=true, example=null)
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Données invalides"
     *     )
     * )
     */
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



    /**
     * @OA\Post(
     *     path="/api/connexion",
     *     summary="Connexion utilisateur",
     *     tags={"Utilisateur"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email", "password"},
     *             @OA\Property(property="email", type="string", example="user@example.com"),
     *             @OA\Property(property="mdp", type="string", example="password123")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Connexion réussie",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="succes"),
     *             @OA\Property(property="data", type="object", 
     *                 @OA\Property(property="message", type="string", example="Code PIN envoyé à user@example.com")
     *             ),
     *             @OA\Property(
     *                 property="meta", 
     *                 type="array",
     *                 example=null,
     *                 nullable=true,
     *                 @OA\Items(  
     *                     type="string",
     *                     example="null"
     *                 )
     *             ),
     *             @OA\Property(property="error", type="string", nullable=true, example=null)
     *         )
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Données invalides"
     *     )
     * )
     */
    #[Route('/api/connexion', name: 'connexion', methods: ['POST'])]
    public function connexion(Request $request, EntityManagerInterface $em, UserPasswordHasherInterface $passwordHasher, UtilisateurRepository $utilisateurRepository): JsonResponse 
    {
        $data = json_decode($request->getContent(), true);
        return $utilisateurRepository->login($data, $em, $passwordHasher);
    }
}
