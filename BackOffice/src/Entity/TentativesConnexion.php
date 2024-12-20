<?php

namespace App\Entity;

use App\Repository\TentativesConnexionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TentativesConnexionRepository::class)]
class TentativesConnexion
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $nb_tentatives = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $derniere_tentative = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Utilisateur $utilisateur = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNbTentatives(): ?int
    {
        return $this->nb_tentatives;
    }

    public function setNbTentatives(int $nb_tentatives): static
    {
        $this->nb_tentatives = $nb_tentatives;

        return $this;
    }

    public function getDerniereTentative(): ?\DateTimeImmutable
    {
        return $this->derniere_tentative;
    }

    public function setDerniereTentative(\DateTimeImmutable $derniere_tentative): static
    {
        $this->derniere_tentative = $derniere_tentative;

        return $this;
    }

    public function getUtilisateur(): ?Utilisateur
    {
        return $this->utilisateur;
    }

    public function setUtilisateur(?Utilisateur $utilisateur): static
    {
        $this->utilisateur = $utilisateur;

        return $this;
    }
}
