<?php

namespace App\Repository;

use App\Entity\Utilisateur;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\Service\ResponseHelper;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\PIN;

/**
 * @extends ServiceEntityRepository<Utilisateur>
 */
class UtilisateurRepository extends ServiceEntityRepository
{
    private ResponseHelper $responseHelper;

    public function __construct(ManagerRegistry $registry,ResponseHelper $responseHelper)
    {
        parent::__construct($registry, Utilisateur::class);
        $this->responseHelper = $responseHelper;
    }

//    /**
//     * @return Utilisateur[] Returns an array of Utilisateur objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('u')
//            ->andWhere('u.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('u.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Utilisateur
//    {
//        return $this->createQueryBuilder('u')
//            ->andWhere('u.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }

    public function inscription($data, $em, $passwordHasher): JsonResponse
    {
        if (!$data || !isset($data['pseudo'], $data['email'], $data['mdp'])) {
            return $this->responseHelper->jsonResponse('erreur', null, 'Données invalides', null);
        }

        $existingUser = $em->getRepository(Utilisateur::class)->findOneBy(['email' => $data['email']]);
        if ($existingUser) {
            return $this->responseHelper->jsonResponse('erreur', null, 'Cet email est déjà utilisé', null);
        }
        $timezone = new \DateTimeZone('Europe/Paris');

        $utilisateur = new Utilisateur();
        $utilisateur->setPseudo($data['pseudo']);
        $utilisateur->setEmail($data['email']);
        $utilisateur->setMdp($passwordHasher->hashPassword($utilisateur, $data['mdp']));
        $utilisateur->setActif(false);
        $dateCreation = new \DateTimeImmutable('now', $timezone);
        $utilisateur->setDateCreation($dateCreation);

        $codePin = (string)random_int(100000, 999999);
        $dateExpiration = new \DateTimeImmutable('+90 seconds', $timezone);

        $pin = new PIN();
        $pin->setCode($codePin)
            ->setDateCreation($dateCreation)
            ->setDateExpiration($dateExpiration)
            ->setUtilisateur($utilisateur);


        $em->persist($utilisateur);
        $em->persist($pin);
        $em->flush();

        return $this->responseHelper->jsonResponse('succes', ['message' => 'Code PIN envoyé à '. $data['email']], null, null);
    }


    
    public function connexion($data, $em, $passwordHasher): JsonResponse
    {
        if (!$data || !isset($data['email'], $data['mdp'])) {
            return $this->responseHelper->jsonResponse('erreur', null, 'Données invalides', null);
        }

        $existingUser = $em->getRepository(Utilisateur::class)->findOneBy(['email' => $data['email']]);
        if (!$existingUser) {
            return $this->responseHelper->jsonResponse('erreur', null, 'Le mot de passe ou l\'email est incorrect. Veuillez réessayer.', null);
        }

        if (!$passwordHasher->isPasswordValid($existingUser->getMdp(), $data['mdp'])) {
            return $this->responseHelper->jsonResponse('erreur', null, 'Le mot de passe ou l\'email est incorrect. Veuillez réessayer.', null);
        }

        return $this->responseHelper->jsonResponse('succes', ['message' => 'Connexion réussie'], null, null);
    }



}
