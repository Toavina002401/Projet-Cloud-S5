<?php

namespace App\Controller;

use App\Service\FirebaseService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class FirebaseController extends AbstractController
{
    private FirebaseService $firebaseService;

    public function __construct(FirebaseService $firebaseService)
    {
        $this->firebaseService = $firebaseService;
    }

    #[Route('/firebase/test', name: 'firebase_test', methods: ['GET'])]
    public function testFirebase(): JsonResponse
    {
        try {
            $user = $this->firebaseService->createUser('test@example.com', 'password123');
            return $this->json(['message' => 'Utilisateur créé', 'uid' => $user->uid]);
        } catch (\Throwable $e) {
            return $this->json(['error' => $e->getMessage()], 500);
        }
    }
}
