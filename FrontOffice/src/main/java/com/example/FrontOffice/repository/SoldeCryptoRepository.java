package com.example.FrontOffice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.FrontOffice.entity.SoldeCrypto;

@Repository
public interface SoldeCryptoRepository extends JpaRepository<SoldeCrypto, Long> {
}
