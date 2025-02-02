package com.example.FrontOffice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// import com.example.FrontOffice.entity.Cryptomonnaies;
import com.example.FrontOffice.entity.SoldeCrypto;

@Repository
public interface SoldeCryptoRepository extends JpaRepository<SoldeCrypto, Long> {
     Optional<SoldeCrypto> findByPortefeuilleIdAndCryptomonnaiesId(Long portefeuilleId, Long cryptomonnaiesId);
     List<SoldeCrypto> findByPortefeuilleId(Long portefeuilleId);
    //  SoldeCrypto findByPortefeuilleIdAndCryptoId(Long portefeuilleId, Cryptomonnaies cryptoId);
}


