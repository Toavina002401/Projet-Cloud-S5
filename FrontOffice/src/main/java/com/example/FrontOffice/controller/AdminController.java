package com.example.FrontOffice.controller;

import com.example.FrontOffice.services.CryptoPriceService;
import com.example.FrontOffice.services.PortefeuilleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@Controller
public class AdminController {

    @Autowired
    private PortefeuilleService portefeuilleService;

    @Autowired
    private CryptoPriceService cryptoPriceService;

    // Page d'accueil
    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("nom", "Projet-Cloud-S5");
        return "index";
    }

    @GetMapping("/login")
    public String login(Model model) {
        return "login";
    }

    // Page d'inscription
    @GetMapping("/inscription")
    public String inscription(Model model) {
        return "inscription";
    }

    // Ajouter une cryptomonnaie au portefeuille
    @PostMapping("/portefeuille/{portefeuilleId}/ajouter")
    public String ajouterCryptomonnaie(@PathVariable Long portefeuilleId,
                                       @RequestParam String symbole,
                                       @RequestParam BigDecimal quantite,
                                       Model model) {
        if (quantite.compareTo(BigDecimal.ZERO) <= 0) {
            model.addAttribute("error", "Quantité invalide.");
            return "result";
        }
        try {
            portefeuilleService.ajouterCryptomonnaie(portefeuilleId, symbole, quantite);
            model.addAttribute("message", "Cryptomonnaie ajoutée avec succès.");
        } catch (RuntimeException e) {
            model.addAttribute("error", "Erreur : " + e.getMessage());
        }
        return "result";
    }

    // Supprimer une cryptomonnaie du portefeuille
    @PostMapping("/portefeuille/{portefeuilleId}/supprimer")
    public String supprimerCryptomonnaie(@PathVariable Long portefeuilleId,
                                         @RequestParam String symbole,
                                         Model model) {
        try {
            portefeuilleService.supprimerCryptomonnaie(portefeuilleId, symbole);
            model.addAttribute("message", "Cryptomonnaie supprimée avec succès.");
        } catch (RuntimeException e) {
            model.addAttribute("error", "Erreur : " + e.getMessage());
        }
        return "result";
    }

    // Calculer la valeur monétaire actuelle
    @GetMapping("/portefeuille/{portefeuilleId}/valeur")
    public String calculerValeurMonetaire(@PathVariable Long portefeuilleId,
                                          @RequestParam String symbole,
                                          Model model) {
        BigDecimal valeur = cryptoPriceService.getCurrentPrice(symbole);
        model.addAttribute("valeur", valeur);
        model.addAttribute("symbole", symbole);
        return "result";
    }

    // API : Récupérer le prix d'une cryptomonnaie
    @GetMapping("/api/crypto-price")
    @ResponseBody
    public BigDecimal getCryptoPrice(@RequestParam String symbole) {
        return cryptoPriceService.getCurrentPrice(symbole);
    }

    // API : Récupérer tous les prix
    @GetMapping("/api/crypto-prices")
    @ResponseBody
    public Map<String, BigDecimal> getAllCryptoPrices() {
        return cryptoPriceService.getAllPrices();
    }

    // Page des graphiques
    @GetMapping("/portefeuille/{portefeuilleId}/graphique")
    public String afficherGraphique(@PathVariable Long portefeuilleId, Model model) {
        model.addAttribute("portefeuilleId", portefeuilleId);
        return "graphique";
    }
}
