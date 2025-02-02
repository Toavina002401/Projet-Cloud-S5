package com.example.FrontOffice.services;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.FrontOffice.entity.Cryptomonnaies;
import com.example.FrontOffice.entity.Portefeuille;
import com.example.FrontOffice.entity.SoldeCrypto;
import com.example.FrontOffice.repository.CryptomonnaiesRepository;
import com.example.FrontOffice.repository.SoldeCryptoRepository;

@Service
public class PortefeuilleService {

    @Autowired
    private SoldeCryptoRepository soldeCryptoRepository;

    @Autowired
    private CryptomonnaiesRepository cryptomonnaiesRepository;

    public void ajouterCryptomonnaie(Long portefeuilleId, String symbole, BigDecimal quantite) {
        Cryptomonnaies crypto = cryptomonnaiesRepository.findBySymbole(symbole)
                .orElseThrow(() -> new RuntimeException("Cryptomonnaie introuvable"));

        Optional<SoldeCrypto> soldeOpt = soldeCryptoRepository.findByPortefeuilleIdAndCryptomonnaiesId(portefeuilleId, crypto.getId());

        SoldeCrypto solde;
        if (soldeOpt.isPresent()) {
            // Si la cryptomonnaie existe déjà dans le portefeuille, on met à jour sa quantité
            solde = soldeOpt.get();
            solde.setQuantiteCrypto(solde.getQuantiteCrypto().add(quantite));
        } else {
            // Si la cryptomonnaie n'existe pas encore, on l'ajoute au portefeuille
            solde = new SoldeCrypto();
            solde.setPortefeuille(new Portefeuille());
            solde.setCryptomonnaies(crypto);
            solde.setQuantiteCrypto(quantite);
        }

        // Mise à jour du champ "dernierMaj" à la date actuelle
        solde.setDernierMaj(new Timestamp(System.currentTimeMillis()));

        // Sauvegarde du solde mis à jour ou de la nouvelle cryptomonnaie dans le portefeuille
        soldeCryptoRepository.save(solde);
    }

    public void supprimerCryptomonnaie(Long portefeuilleId, String symbole) {
        Cryptomonnaies crypto = cryptomonnaiesRepository.findBySymbole(symbole)
                .orElseThrow(() -> new RuntimeException("Cryptomonnaie introuvable"));

        Optional<SoldeCrypto> soldeOpt = soldeCryptoRepository.findByPortefeuilleIdAndCryptomonnaiesId(portefeuilleId, crypto.getId());

        if (soldeOpt.isEmpty()) {
            throw new RuntimeException("Cryptomonnaie non trouvée dans le portefeuille");
        }

        SoldeCrypto solde = soldeOpt.get();

        if (solde.getQuantiteCrypto() != null && solde.getQuantiteCrypto().compareTo(BigDecimal.ZERO) > 0) {
            throw new RuntimeException("Impossible de supprimer une cryptomonnaie avec un solde positif");
        }

        soldeCryptoRepository.delete(solde);
    }

    public BigDecimal calculerValeurMonetaire(Long portefeuilleId, String symbole) {
        Cryptomonnaies crypto = cryptomonnaiesRepository.findBySymbole(symbole)
                .orElseThrow(() -> new RuntimeException("Cryptomonnaie introuvable"));

        Optional<SoldeCrypto> soldeOpt = soldeCryptoRepository.findByPortefeuilleIdAndCryptomonnaiesId(portefeuilleId, crypto.getId());

        if (soldeOpt.isEmpty()) {
            throw new RuntimeException("Cryptomonnaie non trouvée dans le portefeuille");
        }

        SoldeCrypto solde = soldeOpt.get();

        // Simuler un prix fixe pour la cryptomonnaie
        BigDecimal prixActuel = new BigDecimal("50000.00"); // Exemple : 50,000 USD par unité
        return prixActuel.multiply(solde.getQuantiteCrypto());
    }
}
