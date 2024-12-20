<?php

namespace App\Repository;

use App\Entity\Utilisateur;
use App\Entity\TentativesConnexion;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use App\Service\ResponseHelper;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Mime\Email;
use App\Entity\PIN;
use App\Service\MailerService;

/**
 * @extends ServiceEntityRepository<Utilisateur>
 */
class UtilisateurRepository extends ServiceEntityRepository
{
    private ResponseHelper $responseHelper;
    private MailerService $mailerService;

    public function __construct(ManagerRegistry $registry,ResponseHelper $responseHelper,MailerService $mailerService)
    {
        parent::__construct($registry, Utilisateur::class);
        $this->responseHelper = $responseHelper;
        $this->mailerService = $mailerService;
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

    public function inscription($data, $em, $passwordHasher, MailerService $mailerService): JsonResponse
    {
        if (!$data || !isset($data['pseudo'], $data['email'], $data['mdp'])) {
            return $this->responseHelper->jsonResponse('erreur', null, 'Données invalides', null);
        }

        $existingUser = $em->getRepository(Utilisateur::class)->findOneBy(['email' => $data['email']]);
        if ($existingUser) {
            if ($existingUser->isActif()) {
                return $this->responseHelper->jsonResponse('erreur', null, 'Cet email est déjà associé à un compte actif.', null);
            }
            try {
                $em->remove($existingUser);
                $em->flush();
            } catch (\Exception $e) {
                return $this->responseHelper->jsonResponse('erreur', null, 'Impossible de supprimer le compte inactif : ' . $e->getMessage(), null);
            }
        }
        $timezone = new \DateTimeZone('Europe/Moscow');

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

        try {
            $mailerService->sendEmailActivation($data['email'],'Activation de votre compte', $codePin, '90 secondes');
            $em->persist($utilisateur);
            $em->persist($pin);
            $em->flush();
            return $this->responseHelper->jsonResponse('succes', ['message' => 'Code PIN envoyé à '. $data['email']], null, null);
        } catch (\Exception $e) {
            return $this->responseHelper->jsonResponse('erreur', null, 'Erreur lors de l\'envoi de l\'email : ' . $e->getMessage(), null);
        }
    }

    public function validationPinInscription($data, $em): JsonResponse
    {
        $timezone = new \DateTimeZone('Europe/Moscow');
    
        if (!isset($data['email'], $data['codePin'])) {
            return $this->responseHelper->jsonResponse('erreur', null, 'Données invalides', null);
        }
    
        $pinRepository = $em->getRepository(PIN::class);
        $pin = $pinRepository->findOneBy(['code' => $data['codePin']]);
    
        if (!$pin) {
            return $this->responseHelper->jsonResponse('erreur', null, 'Code PIN incorrect', null);
        }
    
        if ($pin->getUtilisateur()->getEmail() !== $data['email']) {
            return $this->responseHelper->jsonResponse('erreur', null, 'Email incorrect pour ce code PIN', null);
        }
    
        $currentDateTime = new \DateTimeImmutable('now', $timezone);
        $expirationDate = $pin->getDateExpiration();
    
        // Conserver la même heure mais changer le fuseau horaire
        if ($expirationDate->getTimezone()->getName() !== $timezone->getName()) {
            // Conserver l'heure et changer seulement le fuseau horaire
            $expirationDate = \DateTimeImmutable::createFromFormat(
                'Y-m-d H:i:s.u',
                $expirationDate->format('Y-m-d H:i:s.u'),
                $timezone
            );
        }
    
        if ($expirationDate < $currentDateTime) {
            $em->remove($pin);
            $em->flush();
            return $this->responseHelper->jsonResponse('erreur', null, 'Code PIN expiré', null);
        }
    
        $utilisateur = $pin->getUtilisateur();
        $utilisateur->setActif(true);
    
        $em->remove($pin);
        $em->flush();
    
        return $this->responseHelper->jsonResponse('succes', ['message' => 'Inscription validée'], null, null);
    }
    
    public function update($id,$request,$em, $passwordHasher):JsonResponse
    {
        $utilisateur = $em->getRepository(Utilisateur::class)->find($id);
        if (!$utilisateur) {
            return $this->responseHelper->jsonResponse('erreur', null, 'Utilisateur non trouvé', null);
        }

        $data = json_decode($request->getContent(), true);

        if (isset($data['pseudo'])) {
            $utilisateur->setPseudo($data['pseudo']);
        }

        if (isset($data['mdp'])) {
            $utilisateur->setMdp($passwordHasher->hashPassword($utilisateur, $data['mdp']));
        }

        $em->flush();
        return $this->responseHelper->jsonResponse('succes', ['message' => 'Utilisateur modifié'], null, null);
    }
    
    public function delete($id,$em):JsonResponse
    {
        $utilisateur = $em->getRepository(Utilisateur::class)->find($id);
        if (!$utilisateur) {
            return $this->responseHelper->jsonResponse('erreur', null, 'Utilisateur non trouvé', null);
        }

        $em->remove($utilisateur);
        $em->flush();
        return $this->responseHelper->jsonResponse('succes', ['message' => 'Utilisateur supprimé'], null, null);
    }
    
    public function getOneUtilisateur($id,$em):JsonResponse
    {
        $utilisateur = $em->getRepository(Utilisateur::class)->find($id);

        if (!$utilisateur) {
            return $this->responseHelper->jsonResponse('erreur', null, 'Utilisateur non trouvé', null);
        }
        $data = [
            'id' => $utilisateur->getId(),
            'pseudo' => $utilisateur->getPseudo(),
            'email' => $utilisateur->getEmail(),
            'date_creation' => $utilisateur->getDateCreation()->format('Y-m-d H:i:s'),
            'actif' => $utilisateur->isActif(),
        ];

        return $this->responseHelper->jsonResponse('succes', ['data' => $data], null, null);
    }

    public function getListeUtilisateur($em):JsonResponse
    {
        $utilisateurs = $em->getRepository(Utilisateur::class)->findAll();

        if (empty($utilisateurs)) {
            return $this->responseHelper->jsonResponse('erreur', null, 'Aucun utilisateur trouvé', null);
        }

        $data = [];
        foreach ($utilisateurs as $utilisateur) {
            $data[] = [
                'id' => $utilisateur->getId(),
                'pseudo' => $utilisateur->getPseudo(),
                'email' => $utilisateur->getEmail(),
                'date_creation' => $utilisateur->getDateCreation()->format('Y-m-d H:i:s'),
                'actif' => $utilisateur->isActif(),
            ];
        }
        return $this->responseHelper->jsonResponse('succes', ['data' => $data], null, null);
    }


    public function login($data,$entityManager,$max):JsonResponse
    {
        $timezone = new \DateTimeZone('Europe/Moscow');
        $maintenant = new \DateTimeImmutable('now', $timezone);
        $email = $data['email'] ?? null;
        $password = $data['mdp'] ?? null;

        if (!$email || !$password) {
            return $this->responseHelper->jsonResponse('erreur', null, 'Email et mot de passe requis', null);
        }

        $utilisateurRepo = $entityManager->getRepository(Utilisateur::class);
        $utilisateur = $utilisateurRepo->findOneBy(['email' => $email]);

        if (!$utilisateur) {
            return $this->responseHelper->jsonResponse('erreur', null, 'Utilisateur introuvable', null);
        }

        if (!$utilisateur->isActif()) {
            return $this->responseHelper->jsonResponse('erreur', null, 'Votre compte est désactivé. Veuillez contacter l\'administrateur.', null);
        }

        $tentativesRepo = $entityManager->getRepository(TentativesConnexion::class);
        $tentative = $tentativesRepo->findOneBy(['utilisateur' => $utilisateur]);

        if (!$tentative) {
            $tentative = new TentativesConnexion();
            $tentative->setUtilisateur($utilisateur)
                      ->setNbTentatives(0)
                      ->setDerniereTentative($maintenant);
            $entityManager->persist($tentative);
        }

        // Vérifier si l'utilisateur est bloqué
        if ($tentative->getNbTentatives() >= $max) {
            $tentativeDernier = $tentative->getDerniereTentative();
            if ($tentativeDernier->getTimezone()->getName() !== $timezone->getName()) {
                $tentativeDernier = \DateTimeImmutable::createFromFormat(
                    'Y-m-d H:i:s.u',
                    $tentativeDernier->format('Y-m-d H:i:s.u'),
                    $timezone
                );
            }
            $diff = ($maintenant)->getTimestamp() - $tentativeDernier->getTimestamp();

            // Exemple : Bloquer pendant 15 minutes (900 secondes)
            if ($diff < 900) {
                return $this->responseHelper->jsonResponse('erreur', null, 'Compte temporairement bloqué. Réessayez plus tard.', null);
            }

            $tentative->setNbTentatives(0);
        }

        if (!password_verify($password, $utilisateur->getPassword())) {
            $tentative->setNbTentatives($tentative->getNbTentatives() + 1)
                      ->setDerniereTentative($maintenant);
            $entityManager->flush();

            if ($tentative->getNbTentatives() >= $max) {
                //envoyer mail
            }

            return $this->responseHelper->jsonResponse('erreur', null, 'Mot de passe incorrect , il vous reste '. ($max - $tentative->getNbTentatives()) .' tentatives a faire', null);
        }

        $tentative->setNbTentatives(0);
        $entityManager->flush();

        $data = [
            'message' => 'Connexion réussie',
            'utilisateur' => [
                'id' => $utilisateur->getId(),
                'pseudo' => $utilisateur->getPseudo(),
                'email' => $utilisateur->getEmail(),
            ],
        ];
        return $this->responseHelper->jsonResponse('succes', ['data' => $data], null, null);
    }
}
