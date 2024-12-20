<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SwaggerController extends AbstractController
{
    #[Route('/donnee', name: 'swagger_json', methods: ['GET'])]
    public function apiDocJson(): Response
    {
        $json = file_get_contents($this->getParameter('kernel.project_dir') . '/swagger/swagger.json');
        return new Response($json, 200, ['Content-Type' => 'application/json']);
    }



    #[Route('/doc', name: 'swagger_doc', methods: ['GET'])]
    public function apiDoc(): Response
    {
        return $this->render('swagger.html.twig'); // Affiche la page Swagger UI
    }
}
