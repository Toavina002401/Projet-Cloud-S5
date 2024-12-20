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
use App\Entity\TentativesConnexion;
use Symfony\Component\Mailer\MailerInterface;
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
    private const MAX_TENTATIVES = 3; 
    private const MAX_SESSION = 300; 

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
     *             @OA\Property(property="mdp", type="string", example="password123"),
     *             @OA\Property(property="pseudo", type="string", example="user"),
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Code pin envoyer avec succes",
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
     *         description="Inscription réussie avec succes",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="succes"),
     *             @OA\Property(property="data", type="object", 
     *                 @OA\Property(property="message", type="string", example="Inscription validée")
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
    public function validatePin(Request $request, EntityManagerInterface $em, UtilisateurRepository $utilisateurRepository): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        return $utilisateurRepository->validationPinInscription($data,$em);
    }



    /**
     * @OA\Put(
     *     path="/api/utilisateur/{id}",
     *     summary="Modification information utilisateurr",
     *     tags={"Utilisateur"},
     * *   @OA\Parameter(
     *         in="path",
     *         name="id",
     *         required=true,
     *         @OA\Schema(type="integer", example=1),
     *         description="L'id de l'utilisateur à modifier"
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Utilisateur modifié avec succes",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="succes"),
     *             @OA\Property(property="data", type="object", 
     *                 @OA\Property(property="message", type="string", example="Utilisateur modifié")
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
    #[Route('/api/utilisateur/{id}', name: 'update_utilisateur', methods: ['PUT'])]
    public function updateUtilisateur(int $id, Request $request, EntityManagerInterface $em,UtilisateurRepository $utilisateurRepository, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        return $utilisateurRepository->update($id,$request,$em,$passwordHasher);
    }




    /**
     * @OA\Delete(
     *     path="/api/utilisateur/{id}",
     *     summary="Suppression utilisateur",
     *     tags={"Utilisateur"},
     * *   @OA\Parameter(
     *         in="path",
     *         name="id",
     *         required=true,
     *         @OA\Schema(type="integer", example=1),
     *         description="L'id de l'utilisateur à supprimer"
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Utilisateur supprimer avec succes",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="succes"),
     *             @OA\Property(property="data", type="object", 
     *                 @OA\Property(property="message", type="string", example="Utilisateur supprimer")
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
    #[Route('/api/utilisateur/{id}', name: 'delete_utilisateur', methods: ['DELETE'])]
    public function deleteUtilisateur(int $id, EntityManagerInterface $em,UtilisateurRepository $utilisateurRepository): JsonResponse
    {
        return $utilisateurRepository->delete($id,$em);
    }



    /**
     * @OA\Get(
     *     path="/api/utilisateur/{id}",
     *     summary="Selection par id utilisateur",
     *     tags={"Utilisateur"},
     * *   @OA\Parameter(
     *         in="path",
     *         name="id",
     *         required=true,
     *         @OA\Schema(type="integer", example=1),
     *         description="L'id de l'utilisateur à sélectionner"
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Get id réussie avec succes",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="succes"),
     *             @OA\Property(property="data", type="object", 
     *                 @OA\Property(property="data", type="object", 
     *                     @OA\Property(property="id", type="integer", example=3),
     *                     @OA\Property(property="pseudo", type="string", example="user"),
     *                     @OA\Property(property="email", type="string", example="user@example.com"),
     *                     @OA\Property(property="date_creation", type="string", format="date-time", example="2024-12-20 02:07:07"),
     *                     @OA\Property(property="actif", type="boolean", example=false)
     *                 )
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
    #[Route('/api/utilisateur/{id}', name: 'get_utilisateur', methods: ['GET'])]
    public function getUtilisateur(int $id, EntityManagerInterface $em,UtilisateurRepository $utilisateurRepository): JsonResponse
    {
        return $utilisateurRepository->getOneUtilisateur($id,$em);
    }



    /**
     * @OA\Get(
     *     path="/api/utilisateurs",
     *     summary="Selection de tous les utilisateurs",
     *     tags={"Utilisateur"},
     *     @OA\Response(
     *         response=200,
     *         description="Get All réussie avec succes",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="succes"),
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="data", type="array",
     *                     @OA\Items(
     *                         type="object",
     *                         @OA\Property(property="id", type="integer", example=3),
     *                         @OA\Property(property="pseudo", type="string", example="user"),
     *                         @OA\Property(property="email", type="string", example="user@example.com"),
     *                         @OA\Property(property="date_creation", type="string", format="date-time", example="2024-12-20 02:07:07"),
     *                         @OA\Property(property="actif", type="boolean", example=false)
     *                     ),
     *                     @OA\Items(
     *                         type="object",
     *                         @OA\Property(property="id", type="integer", example=4),
     *                         @OA\Property(property="pseudo", type="string", example="example"),
     *                         @OA\Property(property="email", type="string", example="example@example.com"),
     *                         @OA\Property(property="date_creation", type="string", format="date-time", example="2024-12-20 02:15:31"),
     *                         @OA\Property(property="actif", type="boolean", example=false)
     *                     )
     *                 )
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
    #[Route('/api/utilisateurs', name: 'get_liste_utilisateurs', methods: ['GET'])]
    public function getListeUtilisateurs(EntityManagerInterface $em,UtilisateurRepository $utilisateurRepository): JsonResponse
    {
        return $utilisateurRepository->getListeUtilisateur($em);
    }





    /**
     * @OA\Post(
     *     path="/api/login",
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
     *         description="Connexion réussie avec succes",
     *         @OA\JsonContent(
     *             @OA\Property(property="status", type="string", example="succes"),
     *             @OA\Property(property="data", type="object", 
     *                 @OA\Property(property="message", type="string", example="Mila mbola amboarina")
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
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(Request $request,EntityManagerInterface $entityManager,UtilisateurRepository $utilisateurRepository, MailerService $mailerService): JsonResponse 
    {
        $data = json_decode($request->getContent(), true);
        $maximum =self::MAX_TENTATIVES;
        $session = self::MAX_SESSION;
        return $utilisateurRepository->login($data,$entityManager,$maximum,$mailerService,$session);
    }

    #[Route('/api/reinitialise', name: 'api_reinitialiser', methods: ['POST'])]
    public function resetTentative(Request $request,EntityManagerInterface $entityManager,UtilisateurRepository $utilisateurRepository): JsonResponse 
    {
        $data = json_decode($request->getContent(), true);
        return $utilisateurRepository->resetTentatives($data,$entityManager);
    }




}
