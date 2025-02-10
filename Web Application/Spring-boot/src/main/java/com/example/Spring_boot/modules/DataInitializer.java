package com.example.Spring_boot.modules;


import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Arrays;
import java.util.List;
import java.util.Vector;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.Spring_boot.repository.CryptomonnaiesRepository;
import com.example.Spring_boot.repository.HistoriqueFondsRepository;
import com.example.Spring_boot.repository.PortefeuilleRepository;
import com.example.Spring_boot.repository.SoldeCryptoRepository;
import com.example.Spring_boot.repository.UtilisateurRepository;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner demo(CryptomonnaiesRepository cryptoRepository,PortefeuilleRepository portefeuilleRepository, UtilisateurRepository utilisateurRepository,SoldeCryptoRepository soldeCryptoRepository,HistoriqueFondsRepository historiqueFondsRepository) {
        return (args) -> {
            Vector<Utilisateur> baseUtilisateur = new Vector<Utilisateur>();
            Vector<Cryptomonnaies> baseCryptomonnaies = new Vector<Cryptomonnaies>();
            Vector<Portefeuille> basePortefeuille = new Vector<Portefeuille>();
            Vector<HistoriqueFonds> baseHistoriqueFonds = new Vector<HistoriqueFonds>();
            Vector<SoldeCrypto> baseSoldeCrypto = new Vector<SoldeCrypto>();

            /*Save Utilisateurs */
                List<String> pseudoListe = Arrays.asList("John Doe","Jane Smith","Mark Taylor","Lucas Brown","Emily Clark","Paul Johnson","Kate White","David Williams","Trump Donal","Lisa Harris","Robert Martin","Susan Davis","Michael Lewis","Laura Thomas","Chris Moore","Daniel King");
                List<String> emailListe = Arrays.asList("john.doe@company.com","jane.smith@company.com","mark.taylor@company.com","lucas.brown@company.com","emily.clark@company.com","paul.johnson@company.com","kate.white@company.com","david.williams@company.com","donalTrump@company.com","lisa.harris@company.com","robert.martin@company.com","susan.davis@company.com","michael.lewis@company.com","laura.thomas@company.com","chris.moore@company.com","daniel.king@company.com");
                List<String> mdpListe = Arrays.asList("$2y$13$z8H24l1ZKiQ152gyfpPpWuoy7aZVp7wg7l81WT7XaEOwY5WdGGVki","$2y$13$gAdSn29L3PXmOgdfM9VnuOkItqhN7TaxtRCS8yncZLs1UrqoAGyA.","$2y$13$LhSZ35401GPfsEieTeKGauzww9yU7FiwVszSkCC1tPVTa9jAWdEfa","$2y$13$5QpHZNQipC3p6sAPRRo1/u2XVhp7DHBK/2TNSdfXdnoGwz5UHFAHK","$2y$13$/3xnju/TJrClb7nJBFtF4OdYwpDOePXjAZtMJsFlUslHejfXWFwme","$2y$13$qbQiUQnp8d/WjO/lipIXS.jT1QR0iKnajUEs8wfg5yD7Z67zDIdDe","$2y$13$qxqmSAreWdiIH05syXDNJes69JH7wejfnGvT6fPHk9YTe8GP98sKi","$2y$13$SqC1/6/0ZVQ9UV4Bw1isAeVvInlvs5bfF5QcyQlPcwP2U31Sd.c9y","$2y$13$5wRCqdLHmLTvWJlhVw2gRerB38e2cgfCeFKsRovIWuxYQIk6DVg0C","$2y$13$M8wOR.7mxuqqnqu87aQRBe62dPnh0Ryefiy01AG4SkALRV1/MKAyG","$2y$13$E5.ydM5RSgQDIXsROZEH7eML0i3lwJc0CcZLcXQi2I0e9zNAfIqVm","$2y$13$CEKbTDkFpL/.IOqeJeYBaeOI9lCUXViPORB.rFl8rhB7hb0fjKqpG","$2y$13$DKKkobsulLVZIkiuSBnchevImk3k4ub.TbdUeyTSLpBDNJkDYD9Y6","$2y$13$ok32ubH2jdUpJQiL1921hO7CPh4V4aTYXb6HjlX1z/QEcl1YmWNJK","$2y$13$NabSg/f7hW/nM7FXegChruLVGTyU/b0uLJmn1xnV6td2tGiWaasG2","$2y$13$2DTBYzoRTANeB3J1N62SeuTmL5Kv.C/L3gfG8fS3wyq9qZ3eIYmly");
                Timestamp dateCreationUti = Timestamp.valueOf("2024-12-25 09:00:00");
                List<Boolean> actifListe = Arrays.asList(true,true,true,true,true,true,true,true,false,true,true,true,true,true,true,true);
                for (int i = 0; i < pseudoListe.size(); i++) {
                    Utilisateur utilisateur = new Utilisateur();
                    utilisateur.setPseudo(pseudoListe.get(i));
                    utilisateur.setEmail(emailListe.get(i));
                    utilisateur.setDateCreation(dateCreationUti);
                    utilisateur.setActif(actifListe.get(i));
                    utilisateur.setMdp(mdpListe.get(i));
                    baseUtilisateur.add(utilisateurRepository.save(utilisateur));
                }

                System.out.println("Utilisateur ------------ Données insérées :");
            /*Fin Utilisateurs */

            /*Save Cryptomonnaies */
                List<String> noms = Arrays.asList("Bitcoin", "Ethereum", "XRP", "Tether", "Solana", "BNB", "Chainlink", "Wrapped Steth", "LEO Token", "Sui");
                List<String> symboles = Arrays.asList("BTC", "ETH", "XRP", "USDT", "SOL", "BNB", "LINK", "WSTETH", "LEO", "SUI");
                List<String> images = Arrays.asList(
                    "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
                    "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
                    "https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442",
                    "https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661",
                    "https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756",
                    "https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970",
                    "https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1696502009",
                    "https://coin-images.coingecko.com/coins/images/18834/large/wstETH.png?1696518295",
                    "https://coin-images.coingecko.com/coins/images/8418/large/leo-token.png?1696508607",
                    "https://coin-images.coingecko.com/coins/images/26375/large/sui-ocean-square.png?1727791290"
                );
                List<Double> basepriceList = Arrays.asList(98310.00,2721.49,2.48,1.00,198.00,585.28,19.2,3243.11,9.85,3.03);
                for (int i = 0; i < noms.size(); i++) {
                    Cryptomonnaies crypto = new Cryptomonnaies();
                    crypto.setNom(noms.get(i));
                    crypto.setSymbole(symboles.get(i));
                    crypto.setBaseprise(basepriceList.get(i)); 
                    crypto.setImages(images.get(i));
                    baseCryptomonnaies.add(cryptoRepository.save(crypto));
                }

                System.out.println("Crypto ------------ Données insérées :");
            /*Fin  Cryptomonnaies*/

            /*Save Portefeuille */
                List<Double> montatntListe =  Arrays.asList(47495.34,8084.19,29410.00,22674.50,10193.00,18504.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00);    

                List<Timestamp> dates = Arrays.asList(
                    Timestamp.valueOf("2025-01-01 09:00:00"),
                    Timestamp.valueOf("2025-01-02 10:15:00"),
                    Timestamp.valueOf("2025-01-03 14:30:00"),
                    Timestamp.valueOf("2025-01-04 11:45:00"),
                    Timestamp.valueOf("2025-01-05 08:00:00"),
                    Timestamp.valueOf("2025-01-06 16:20:00"),
                    Timestamp.valueOf("2025-01-07 12:10:00"),
                    Timestamp.valueOf("2025-01-08 13:25:00"),
                    Timestamp.valueOf("2025-01-09 15:40:00"),
                    Timestamp.valueOf("2025-01-10 17:50:00"),
                    Timestamp.valueOf("2025-01-11 09:05:00"),
                    Timestamp.valueOf("2025-01-12 10:30:00"),
                    Timestamp.valueOf("2025-01-13 11:55:00"),
                    Timestamp.valueOf("2025-01-14 14:00:00"),
                    Timestamp.valueOf("2025-01-15 16:10:00")
                );
                
                for (int i = 0; i < dates.size(); i++) {
                    Utilisateur utilisateur = baseUtilisateur.elementAt(i);
                    if (utilisateur != null) {
                        Portefeuille portefeuille = new Portefeuille();
                        portefeuille.setDateCreation(dates.get(i));
                        portefeuille.setSoldeFonds(montatntListe.get(i));
                        portefeuille.setUtilisateur(utilisateur);
                        basePortefeuille.add(portefeuilleRepository.save(portefeuille));
                    }
                }
                System.out.println("Portefeuille ------------ Données insérées :");
            /*Fin Portefeuille*/

            /* Save HistoriqueFonds */
                List<Object[]> transactions = Arrays.asList(
                    new Object[]{1, "2025-02-02 10:15:00", 50000.00, "DEPOT", 1},
                    new Object[]{2, "2025-02-03 10:15:00", 2000.00, "RETRAIT", 1},
                    new Object[]{3, "2025-02-04 10:15:00", 500.00, "RETRAIT", 1},
                    new Object[]{4, "2025-02-02 11:30:00", 15000.00, "DEPOT", 2},
                    new Object[]{5, "2025-02-03 14:00:00", 800.00, "RETRAIT", 2},
                    new Object[]{6, "2025-02-04 12:45:00", 1200.00, "RETRAIT", 2},
                    new Object[]{7, "2025-02-02 13:20:00", 30000.00, "DEPOT", 3},
                    new Object[]{8, "2025-02-03 15:00:00", 500.00, "RETRAIT", 3},
                    new Object[]{9, "2025-02-04 16:10:00", 1000.00, "DEPOT", 3},
                    new Object[]{10, "2025-02-02 09:45:00", 25000.00, "DEPOT", 4},
                    new Object[]{11, "2025-02-03 10:30:00", 3000.00, "RETRAIT", 4},
                    new Object[]{12, "2025-02-04 11:10:00", 800.00, "DEPOT", 4},
                    new Object[]{13, "2025-02-02 14:00:00", 10000.00, "DEPOT", 5},
                    new Object[]{14, "2025-02-03 15:30:00", 1500.00, "RETRAIT", 5},
                    new Object[]{15, "2025-02-04 13:25:00", 2000.00, "DEPOT", 5},
                    new Object[]{16, "2025-02-02 16:30:00", 20000.00, "DEPOT", 6},
                    new Object[]{17, "2025-02-03 17:00:00", 1000.00, "RETRAIT", 6},
                    new Object[]{18, "2025-02-04 12:00:00", 500.00, "DEPOT", 6}
                );

                for (Object[] t : transactions) {
                    HistoriqueFonds historique = new HistoriqueFonds();
                    historique.setDateTransaction(Timestamp.valueOf((String) t[1]));
                    historique.setMontant((double) t[2]);
                    historique.setType((String) t[3]);
                    historique.setPortefeuille(basePortefeuille.get((Integer) t[4] - 1));
                    baseHistoriqueFonds.add(historiqueFondsRepository.save(historique));
                }

                System.out.println("HistoriqueFonds ------------ Données insérées :");
            /* Fin HistoriqueFonds*/

            /* Save SoldeCrypto */
                List<Object[]> cryptoTransactions = Arrays.asList(
                    // Format: [quantite, date, prix, type, id_crypto, id_portefeuille]
                    new Object[]{"2.89", "2025-02-03 10:15:00", "2.87", "ACHETER", 10, 1},
                    new Object[]{"1.00", "2025-02-05 14:00:00", "3.14", "VENDRE", 10, 1},
                    new Object[]{"0.14", "2025-02-07 09:30:00", "3.54", "VENDRE", 10, 1},
                    new Object[]{"0.10", "2025-02-03 11:30:00", "98312.50", "ACHETER", 1, 2},
                    new Object[]{"0.05", "2025-02-05 15:20:00", "98308.75", "VENDRE", 1, 2},
                    new Object[]{"1.20", "2025-02-04 12:45:00", "2722.00", "ACHETER", 2, 3},
                    new Object[]{"0.80", "2025-02-06 16:10:00", "2720.50", "VENDRE", 2, 3},
                    new Object[]{"100.00", "2025-02-03 16:10:00", "2.49", "ACHETER", 3, 4},
                    new Object[]{"50.00", "2025-02-05 10:45:00", "2.47", "VENDRE", 3, 4},
                    new Object[]{"500.00", "2025-02-04 10:30:00", "1.01", "ACHETER", 4, 5},
                    new Object[]{"200.00", "2025-02-06 11:10:00", "0.99", "VENDRE", 4, 5},
                    new Object[]{"10.00", "2025-02-05 14:00:00", "198.50", "ACHETER", 5, 6},
                    new Object[]{"5.00", "2025-02-07 15:30:00", "197.80", "VENDRE", 5, 6}
                );

                for (Object[] ct : cryptoTransactions) {
                    SoldeCrypto solde = new SoldeCrypto();

                    // Conversion des types
                    solde.setQuantiteCrypto(new BigDecimal((String) ct[0]));
                    solde.setDernierMaj(Timestamp.valueOf((String) ct[1]));
                    solde.setPrixCrypto(new BigDecimal(((String) ct[2]).replace(",", ""))); // Enlève les virgules
                    solde.setType((String) ct[3]);

                    // Récupération des entités liées
                    Long cryptoId = ((Number) ct[4]).longValue(); // Conversion sécurisée
                    Long portefeuilleId = ((Number) ct[5]).longValue();

                    // Récupérer les entités gérées par le contexte de persistance
                    Cryptomonnaies crypto = cryptoRepository.findById(cryptoId)
                            .orElseThrow(() -> new RuntimeException("Cryptomonnaies non trouvé"));
                    Portefeuille portefeuille = portefeuilleRepository.findById(portefeuilleId)
                            .orElseThrow(() -> new RuntimeException("Portefeuille non trouvé"));

                    // Associer les entités gérées à SoldeCrypto
                    solde.setCryptomonnaies(crypto);
                    solde.setPortefeuille(portefeuille);

                    // Sauvegarder SoldeCrypto
                    baseSoldeCrypto.add(soldeCryptoRepository.save(solde));
                }

                System.out.println("SoldeCrypto ------------ Données insérées :");
            /* Fin SoldeCrypto */
        };
    }
}
