package com.example.FrontOffice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.FrontOffice.entity.Portefeuille;

@Repository
public interface PortefeuilleRepository extends JpaRepository<Portefeuille, Long> {
    Portefeuille findByUtilisateurId(Long utilisateurId);
}
