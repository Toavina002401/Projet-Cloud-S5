package com.example.Spring_boot.repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.Spring_boot.modules.*;

@Repository
public interface SoldeCryptoRepository extends JpaRepository<SoldeCrypto, Long> {
    List<SoldeCrypto> findByPortefeuilleId(Long idPortefeuille);

    // Ajouter la méthode getQuantite avec une requête personnalisée
    @Query("SELECT s.quantiteCrypto FROM SoldeCrypto s WHERE s.cryptomonnaies.id = :idCrypto AND s.portefeuille.id = :idPortefeuille AND s.type = :type")
    Optional<BigDecimal> getQuantite(@Param("idCrypto") Long idCrypto, @Param("idPortefeuille") Long idPortefeuille, @Param("type") String type);
}