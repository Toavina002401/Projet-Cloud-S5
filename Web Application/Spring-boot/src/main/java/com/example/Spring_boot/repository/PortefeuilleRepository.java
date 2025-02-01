package com.example.Spring_boot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.Spring_boot.modules.*;

@Repository
public interface PortefeuilleRepository extends JpaRepository<Portefeuille, Long> {
}