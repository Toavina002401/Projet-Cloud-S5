package com.example.Spring_boot.modules;


import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.Spring_boot.repository.CryptomonnaiesRepository;

@Configuration
public class DataInitializer {
    @Bean
    public CommandLineRunner demo(CryptomonnaiesRepository repository) {
        return (args) -> {
            Cryptomonnaies bitcoin = new Cryptomonnaies();
            bitcoin.setNom("Bitcoin");
            bitcoin.setSymbole("BTC");
            bitcoin.setBaseprise(98310.00);
            repository.save(bitcoin);

            Cryptomonnaies ethereum = new Cryptomonnaies();
            ethereum.setNom("Ethereum");
            ethereum.setSymbole("ETH");
            ethereum.setBaseprise(2721.49);
            repository.save(ethereum);

            Cryptomonnaies xrp = new Cryptomonnaies();
            xrp.setNom("XRP");
            xrp.setSymbole("XRP");
            xrp.setBaseprise(2.48);
            repository.save(xrp);

            Cryptomonnaies tether = new Cryptomonnaies();
            tether.setNom("Tether");
            tether.setSymbole("USDT");
            tether.setBaseprise(1.00);
            repository.save(tether);

            Cryptomonnaies solana = new Cryptomonnaies();
            solana.setNom("Solana");
            solana.setSymbole("SOL");
            solana.setBaseprise(198.00);
            repository.save(solana);

            Cryptomonnaies bnb = new Cryptomonnaies();
            bnb.setNom("BNB");
            bnb.setSymbole("BNB");
            bnb.setBaseprise(585.28);
            repository.save(bnb);

            Cryptomonnaies chainlink = new Cryptomonnaies();
            chainlink.setNom("Chainlink");
            chainlink.setSymbole("LINK");
            chainlink.setBaseprise(19.2);
            repository.save(chainlink);

            Cryptomonnaies war = new Cryptomonnaies();
            war.setNom("Wrapped Steth");
            war.setSymbole("WSTETH");
            war.setBaseprise(3243.11);
            repository.save(war);

            Cryptomonnaies leo = new Cryptomonnaies();
            leo.setNom("LEO Token");
            leo.setSymbole("LEO");
            leo.setBaseprise(9.85);
            repository.save(leo);

            Cryptomonnaies hedera = new Cryptomonnaies();
            hedera.setNom("Hedera");
            hedera.setSymbole("HBAR");
            hedera.setBaseprise(0.242376);
            repository.save(hedera);

            // Affichage dans la console
            System.out.println("Données insérées :");
            repository.findAll().forEach(crypto -> System.out.println(crypto.getNom()));
        };
    }
}
