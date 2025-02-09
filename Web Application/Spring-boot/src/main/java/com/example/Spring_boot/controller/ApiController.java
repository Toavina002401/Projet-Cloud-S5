package com.example.Spring_boot.controller;

import com.example.Spring_boot.modules.Cryptomonnaies;
import com.example.Spring_boot.modules.HistoriqueFonds;
import com.example.Spring_boot.modules.Portefeuille;
import com.example.Spring_boot.modules.SoldeCrypto;
import com.example.Spring_boot.modules.StockCrypto;
import com.example.Spring_boot.modules.TransactionCryptoRequest;
import com.example.Spring_boot.modules.TransactionRequest;
import com.example.Spring_boot.modules.Utilisateur;
import com.example.Spring_boot.repository.CryptomonnaiesRepository;
import com.example.Spring_boot.repository.HistoriqueFondsRepository;
import com.example.Spring_boot.repository.PortefeuilleRepository;
import com.example.Spring_boot.repository.SoldeCryptoRepository;
import com.example.Spring_boot.repository.UtilisateurRepository;
import com.example.Spring_boot.services.HistoriqueFondsService;
import com.example.Spring_boot.services.PortefeuilleService;
import com.example.Spring_boot.services.ResponseHelper;
import com.example.Spring_boot.services.SoldeCryptoService;

import java.math.BigDecimal;
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
    private CryptomonnaiesRepository cryptomonnaiesRepository;

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
    private SoldeCryptoService soldeCryptoService;

    @Autowired
    private SoldeCryptoRepository soldeCryptoRepository;

    @Autowired
    private ResponseHelper responseHelper;

    @GetMapping("/api/portefeuille/{idUtilisateur}")
    public ResponseEntity<?> getPortefeuille(@PathVariable Long idUtilisateur) {
        try {
            Portefeuille portefeuille = portefeuilleService.getPortefeuille(idUtilisateur);
            if (portefeuille == null) {
                Optional<Utilisateur> uti = utilisateurRepository.findById(idUtilisateur);
                
                if (!uti.isPresent()) {
                    return responseHelper.jsonResponse("error", null, "Utilisateur non trouvé", null);
                }

                portefeuille = new Portefeuille();
                portefeuille.setSoldeFonds(0.00);
                portefeuille.setDateCreation(new Timestamp(System.currentTimeMillis()));
                portefeuille.setUtilisateur(uti.get());
                portefeuille = portefeuilleRepository.save(portefeuille);
            }

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

    @GetMapping("/api/getAllCrypto")
    public ResponseEntity<?> getAllCrypto() {
        try {
            List<Cryptomonnaies> cryptomonnaiesList = cryptomonnaiesRepository.findAll();
            return responseHelper.jsonResponse("success", cryptomonnaiesList, null, null);
        } catch (Exception e) {
            return responseHelper.jsonResponse("error", null, e.getMessage(), null);
        }
    }

    @GetMapping("/api/getStock/{idUtilisateur}/{idCrypto}")
    public ResponseEntity<?> getStock(@PathVariable Long idUtilisateur,@PathVariable Long idCrypto) {
        try {
            Cryptomonnaies crypto = cryptomonnaiesRepository.findById(idCrypto).orElseThrow(() -> new RuntimeException("Cryptomonnaies non trouvé"));
            Portefeuille portefeuille = portefeuilleService.getPortefeuille(idUtilisateur);

            if (portefeuille == null) {
                Optional<Utilisateur> uti = utilisateurRepository.findById(idUtilisateur);
                
                if (!uti.isPresent()) {
                    return responseHelper.jsonResponse("error", null, "Utilisateur non trouvé", null);
                }

                portefeuille = new Portefeuille();
                portefeuille.setSoldeFonds(0.00);
                portefeuille.setDateCreation(new Timestamp(System.currentTimeMillis()));
                portefeuille.setUtilisateur(uti.get());
                portefeuille = portefeuilleRepository.save(portefeuille);
            }

            BigDecimal quantAcheter = soldeCryptoRepository.getQuantite(idCrypto, portefeuille.getId(), "ACHETER").orElse(BigDecimal.ZERO);
            BigDecimal quantVendue = soldeCryptoRepository.getQuantite(idCrypto, portefeuille.getId(), "VENDRE").orElse(BigDecimal.ZERO);
            BigDecimal stock = quantAcheter.subtract(quantVendue);
            double stockDouble = stock.doubleValue(); 

            StockCrypto valiny = new StockCrypto();
            valiny.setId(idCrypto);
            valiny.setNom(crypto.getNom());
            valiny.setStock(stockDouble);
            return responseHelper.jsonResponse("success", valiny, null, null);
        } catch (Exception e) {
            return responseHelper.jsonResponse("error", null, e.getMessage(), null);
        }
    }

    @GetMapping("/api/transactionCrypto/{idUtilisateur}")
    public ResponseEntity<?> getAlltransactionCryptoById(@PathVariable Long idUtilisateur) {
        try {
            Portefeuille portefeuille = portefeuilleService.getPortefeuille(idUtilisateur);
            List<SoldeCrypto> soldeCryptoList = soldeCryptoRepository.findByPortefeuilleId(portefeuille.getId());
            return responseHelper.jsonResponse("success", soldeCryptoList, null, null);
        } catch (Exception e) {
            return responseHelper.jsonResponse("error", null, e.getMessage(), null);
        }
    }

    @PostMapping("/api/transactionCrypto")
    public ResponseEntity<?> transactionCrypto(@RequestBody TransactionCryptoRequest trans) {
        try {
            SoldeCrypto soldeCrypto = new SoldeCrypto();
            soldeCrypto.setQuantiteCrypto(BigDecimal.valueOf(trans.getQuantiteCrypto())); 
            soldeCrypto.setPrixCrypto(BigDecimal.valueOf(trans.getPrixCrypto()));
            soldeCrypto.setType(trans.getType());
            soldeCrypto.setDernierMaj(new Timestamp(System.currentTimeMillis()));
                  
            Cryptomonnaies crypto = cryptomonnaiesRepository.findById(trans.getIdCrypto()).orElseThrow(() -> new RuntimeException("Cryptomonnaies non trouvé"));
            Portefeuille portefeuille = portefeuilleRepository.findById(trans.getIdPorteFeuille()).orElseThrow(() -> new RuntimeException("Portefeuille non trouvé"));
        
            soldeCrypto.setCryptomonnaies(crypto);
            soldeCrypto.setPortefeuille(portefeuille);

            double prixCrypQuant = soldeCrypto.getQuantiteCrypto().doubleValue() * soldeCrypto.getPrixCrypto().doubleValue();

            if (soldeCrypto.getType().equals("ACHETER")) {
                if (prixCrypQuant <= portefeuille.getSoldeFonds()) {
                    portefeuille.setSoldeFonds(portefeuille.getSoldeFonds() - prixCrypQuant);
                    portefeuilleRepository.save(portefeuille);
                    SoldeCrypto sol = soldeCryptoService.saveSoldeCrypto(soldeCrypto);
                    return responseHelper.jsonResponse("success", sol, null, null);
                }else{
                    throw new Exception("Le solde de votre portefeuille est insuffisant pour couvrir ce montant "+ prixCrypQuant);
                }
            }else{
                BigDecimal quantAcheter = soldeCryptoRepository.getQuantite(trans.getIdCrypto(), portefeuille.getId(), "ACHETER").orElse(BigDecimal.ZERO);
                BigDecimal quantVendue = soldeCryptoRepository.getQuantite(trans.getIdCrypto(), portefeuille.getId(), "VENDRE").orElse(BigDecimal.ZERO);
                BigDecimal stock = quantAcheter.subtract(quantVendue);
                double stockdouble = stock.doubleValue(); 

                if (stockdouble >= soldeCrypto.getQuantiteCrypto().doubleValue()) {
                    portefeuille.setSoldeFonds(portefeuille.getSoldeFonds() + prixCrypQuant);
                    portefeuilleRepository.save(portefeuille);
                    SoldeCrypto sol = soldeCryptoService.saveSoldeCrypto(soldeCrypto);
                    return responseHelper.jsonResponse("success", sol, null, null); 
                }else{
                    throw new Exception("Stock insuffisant : vous disposez de "+ stockdouble +" unités de cette crypto.");
                }
            }
        } catch (Exception e) {
            return responseHelper.jsonResponse("error", null, e.getMessage(), null);
        }
    }


}