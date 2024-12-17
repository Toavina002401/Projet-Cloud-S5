<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

class BaseController extends AbstractController
{

    protected function jsonResponse(string $status, $data = null, ?string $error = null, ?array $meta = null): JsonResponse
    {
        return $this->json([
            'status' => $status,
            'data' => $data,
            'meta' => $meta,
            'error' => $error,
        ]);
    }

    protected function arrayResponse(string $status, $data = null, ?string $error = null, ?array $meta = null): array
    {
        return [
            'status' => $status,
            'data' => $data,
            'meta' => $meta,
            'error' => $error,
        ];
    }

    #[Route('/', name: 'home')]
    public function index(): Response
    {
        return $this->render('home/index.html.twig', [
            'nom' => 'Projet-Cloud-S5',
        ]);
    }
}
