package com.example.Spring_boot.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Spring_boot.modules.Portefeuille;
import com.example.Spring_boot.repository.PortefeuilleRepository;

@Service
public class PortefeuilleService {

    @Autowired
    private PortefeuilleRepository portefeuilleRepository;

    public Portefeuille getPortefeuille(Long idUtilisateur) {
        return portefeuilleRepository.findByUtilisateurId(idUtilisateur).orElse(null);
    }

    public Portefeuille savePortefeuille(Portefeuille portefeuille) {
        return portefeuilleRepository.save(portefeuille);
    }
}

