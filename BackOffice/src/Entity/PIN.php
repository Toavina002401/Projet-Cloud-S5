<?php

namespace App\Entity;

use App\Repository\PINRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PINRepository::class)]
class PIN
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 8)]
    private ?string $code = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $date_expiration = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $date_creation = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?Utilisateur $utilisateur = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): static
    {
        $this->code = $code;

        return $this;
    }

    public function getDateExpiration(): ?\DateTimeImmutable
    {
        return $this->date_expiration;
    }

    public function setDateExpiration(\DateTimeImmutable $date_expiration): static
    {
        $this->date_expiration = $date_expiration;

        return $this;
    }

    public function getDateCreation(): ?\DateTimeImmutable
    {
        return $this->date_creation;
    }

    public function setDateCreation(\DateTimeImmutable $date_creation): static
    {
        $this->date_creation = $date_creation;

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
