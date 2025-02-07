package com.example.Spring_boot.controller;

import com.example.Spring_boot.modules.HistoriqueFonds;
import com.example.Spring_boot.modules.Portefeuille;
import com.example.Spring_boot.modules.TransactionRequest;
import com.example.Spring_boot.modules.Utilisateur;
import com.example.Spring_boot.repository.HistoriqueFondsRepository;
import com.example.Spring_boot.repository.PortefeuilleRepository;
import com.example.Spring_boot.repository.UtilisateurRepository;
import com.example.Spring_boot.services.HistoriqueFondsService;
import com.example.Spring_boot.services.PortefeuilleService;
import com.example.Spring_boot.services.ResponseHelper;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

@CrossOrigin(origins = "http://localhost:8082")
@RestController
public class ApiController {

    @Autowired
    private PortefeuilleService portefeuilleService;

    @Autowired
    private HistoriqueFondsService historiqueFondsService;

    @Autowired
    private PortefeuilleRepository portefeuilleRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private HistoriqueFondsRepository historiqueFondsRepository;

    @Autowired
    private ResponseHelper responseHelper;

    @GetMapping("/api/portefeuille/{idUtilisateur}")
    public ResponseEntity<?> getPortefeuille(@PathVariable Long idUtilisateur) {
        try {
            Portefeuille portefeuille = portefeuilleService.getPortefeuille(idUtilisateur);
            return responseHelper.jsonResponse("success", portefeuille, null, null);
        } catch (Exception e) {
            return responseHelper.jsonResponse("error", null, e.getMessage(), null);
        }
    }

    @GetMapping("/api/historiqueFonds/{idUtilisateur}")
    public ResponseEntity<?> getHistoriqueFonds(@PathVariable Long idUtilisateur) {
        try {
            List<HistoriqueFonds> historiqueFonds = historiqueFondsService.getHistoriqueByUtilisateurId(idUtilisateur);
            return responseHelper.jsonResponse("success", historiqueFonds, null, null);
        } catch (Exception e) {
            return responseHelper.jsonResponse("error", null, e.getMessage(), null);
        }
    }

    @PostMapping("/api/depot")
    public ResponseEntity<?> depot(@RequestBody TransactionRequest transaction) {
        try {
            Long idUtilisateur = transaction.getIdUtilisateur();
            Double solde = transaction.getSolde();
            Portefeuille portefeuille = portefeuilleService.getPortefeuille(idUtilisateur);

            if (portefeuille != null) {
                Double soldeActuel = portefeuille.getSoldeFonds() != null ? portefeuille.getSoldeFonds() : 0;
                portefeuille.setSoldeFonds(soldeActuel + solde);
                portefeuilleRepository.save(portefeuille);
            } else {
                Optional<Utilisateur> uti = utilisateurRepository.findById(idUtilisateur);
                
                if (!uti.isPresent()) {
                    return responseHelper.jsonResponse("error", null, "Utilisateur non trouvé", null);
                }

                portefeuille = new Portefeuille();
                portefeuille.setSoldeFonds(solde);
                portefeuille.setDateCreation(new Timestamp(System.currentTimeMillis()));
                portefeuille.setUtilisateur(uti.get());
                portefeuilleRepository.save(portefeuille);
            }

            HistoriqueFonds historiqueFonds = new HistoriqueFonds();
            historiqueFonds.setDateTransaction(new Timestamp(System.currentTimeMillis()));
            historiqueFonds.setMontant(solde);
            historiqueFonds.setType("DEPOT");
            historiqueFonds.setPortefeuille(portefeuille);
            historiqueFondsRepository.save(historiqueFonds);

            return responseHelper.jsonResponse("success", portefeuille, "Depot successfully processed", null);
        } catch (Exception e) {
            return responseHelper.jsonResponse("error", null, e.getMessage(), null);
        }
    }

    @PostMapping("/api/retrait")
    public ResponseEntity<?> retrait(@RequestBody TransactionRequest transaction) {
        try {
            Long idUtilisateur = transaction.getIdUtilisateur();
            Double solde = transaction.getSolde();
            Portefeuille portefeuille = portefeuilleService.getPortefeuille(idUtilisateur);

            if (portefeuille != null) {
                Double soldeActuel = portefeuille.getSoldeFonds() != null ? portefeuille.getSoldeFonds() : 0;
                double newSolde = soldeActuel - solde;
                if (newSolde < 0) {
                    return responseHelper.jsonResponse("error", null, "Solde insuffisant pour une retrait de "+ solde, null);
                }else{
                    portefeuille.setSoldeFonds(newSolde);
                    portefeuilleRepository.save(portefeuille);
                }
            } else {
                return responseHelper.jsonResponse("error", null, "Utilisateur non trouvé", null);
            }

            HistoriqueFonds historiqueFonds = new HistoriqueFonds();
            historiqueFonds.setDateTransaction(new Timestamp(System.currentTimeMillis()));
            historiqueFonds.setMontant(solde);
            historiqueFonds.setType("RETRAIT");
            historiqueFonds.setPortefeuille(portefeuille);
            historiqueFondsRepository.save(historiqueFonds);

            return responseHelper.jsonResponse("success", portefeuille, "Retrait successfully processed", null);
        } catch (Exception e) {
            return responseHelper.jsonResponse("error", null, e.getMessage(), null);
        }
    }


}