package com.example.FrontOffice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.FrontOffice.entity.Cryptomonnaies;

@Repository
public interface CryptomonnaiesRepository extends JpaRepository<Cryptomonnaies, Long> {

    Optional<Cryptomonnaies> findBySymbole(String symbole);
    
}
