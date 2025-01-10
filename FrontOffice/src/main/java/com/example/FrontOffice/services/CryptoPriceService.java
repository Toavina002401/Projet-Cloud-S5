package com.example.FrontOffice.services;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class CryptoPriceService {

    private static final Random random = new Random();
    private final Map<String, BigDecimal> cryptoPrices = new HashMap<>();

    public CryptoPriceService() {
        // Initialisation des prix par défaut
        cryptoPrices.put("BTC", BigDecimal.valueOf(30000));
        cryptoPrices.put("ETH", BigDecimal.valueOf(2000));
        cryptoPrices.put("LTC", BigDecimal.valueOf(150));
    }

    /**
     * Récupérer le prix actuel d'une cryptomonnaie
     */
    public BigDecimal getCurrentPrice(String symbole) {
        return cryptoPrices.getOrDefault(symbole, BigDecimal.ZERO);
    }

    /**
     * Mise à jour des prix toutes les 10 secondes
     */
    @Scheduled(fixedRate = 10000)
    public void updateCryptoPrices() {
        cryptoPrices.replaceAll((key, oldValue) -> generateRandomPrice(BigDecimal.valueOf(100), BigDecimal.valueOf(60000)));
        System.out.println("Prix mis à jour : " + cryptoPrices);
    }

    /**
     * Génération d'un prix aléatoire dans une fourchette donnée
     */
    private BigDecimal generateRandomPrice(BigDecimal minPrice, BigDecimal maxPrice) {
        return minPrice.add(BigDecimal.valueOf(random.nextDouble())
                .multiply(maxPrice.subtract(minPrice)))
                .setScale(2, RoundingMode.HALF_UP);
    }

    /**
     * Récupérer tous les prix
     */
    public Map<String, BigDecimal> getAllPrices() {
        return Collections.unmodifiableMap(cryptoPrices);
    }
}
