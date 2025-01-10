package com.example.FrontOffice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.FrontOffice.entity.HistoriqueFonds;

@Repository
public interface HistoriqueFondsRepository extends JpaRepository<HistoriqueFonds, Long> {
}
