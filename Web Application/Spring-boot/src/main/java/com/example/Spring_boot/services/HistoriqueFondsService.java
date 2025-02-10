package com.example.Spring_boot.services;

import com.example.Spring_boot.modules.HistoriqueFonds;
import com.example.Spring_boot.repository.HistoriqueFondsRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HistoriqueFondsService {

    @Autowired
    private HistoriqueFondsRepository historiqueFondsRepository;

    public HistoriqueFonds saveHistoriqueFonds(HistoriqueFonds historiqueFonds) {
        return historiqueFondsRepository.save(historiqueFonds);
    }

    // Récupérer l'historique des fonds pour un utilisateur donné
    public List<HistoriqueFonds> getHistoriqueByUtilisateurId(Long idUtilisateur) {
        return historiqueFondsRepository.findByUtilisateurId(idUtilisateur);
    }

}