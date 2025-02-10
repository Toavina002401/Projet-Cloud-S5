package com.example.Spring_boot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.Spring_boot.modules.*;


@Repository
public interface HistoriqueFondsRepository extends JpaRepository<HistoriqueFonds, Long> {
    @Query("SELECT h FROM HistoriqueFonds h WHERE h.portefeuille.utilisateur.id = :idUtilisateur")
    List<HistoriqueFonds> findByUtilisateurId(@Param("idUtilisateur") Long idUtilisateur);
}
