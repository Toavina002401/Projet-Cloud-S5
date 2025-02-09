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
            bitcoin.setImages("https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400");
            repository.save(bitcoin);

            Cryptomonnaies ethereum = new Cryptomonnaies();
            ethereum.setNom("Ethereum");
            ethereum.setSymbole("ETH");
            ethereum.setBaseprise(2721.49);
            ethereum.setImages("https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628");
            repository.save(ethereum);

            Cryptomonnaies xrp = new Cryptomonnaies();
            xrp.setNom("XRP");
            xrp.setSymbole("XRP");
            xrp.setBaseprise(2.48);
            xrp.setImages("https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442");
            repository.save(xrp);

            Cryptomonnaies tether = new Cryptomonnaies();
            tether.setNom("Tether");
            tether.setSymbole("USDT");
            tether.setBaseprise(1.00);
            tether.setImages("https://coin-images.coingecko.com/coins/images/325/large/Tether.png?1696501661");
            repository.save(tether);

            Cryptomonnaies solana = new Cryptomonnaies();
            solana.setNom("Solana");
            solana.setSymbole("SOL");
            solana.setBaseprise(198.00);
            solana.setImages("https://coin-images.coingecko.com/coins/images/4128/large/solana.png?1718769756");
            repository.save(solana);

            Cryptomonnaies bnb = new Cryptomonnaies();
            bnb.setNom("BNB");
            bnb.setSymbole("BNB");
            bnb.setBaseprise(585.28);
            bnb.setImages("https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970");
            repository.save(bnb);

            Cryptomonnaies chainlink = new Cryptomonnaies();
            chainlink.setNom("Chainlink");
            chainlink.setSymbole("LINK");
            chainlink.setBaseprise(19.2);
            chainlink.setImages("https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png?1696502009");
            repository.save(chainlink);

            Cryptomonnaies war = new Cryptomonnaies();
            war.setNom("Wrapped Steth");
            war.setSymbole("WSTETH");
            war.setBaseprise(3243.11);
            war.setImages("https://coin-images.coingecko.com/coins/images/18834/large/wstETH.png?1696518295");
            repository.save(war);

            Cryptomonnaies leo = new Cryptomonnaies();
            leo.setNom("LEO Token");
            leo.setSymbole("LEO");
            leo.setBaseprise(9.85);
            leo.setImages("https://coin-images.coingecko.com/coins/images/8418/large/leo-token.png?1696508607");
            repository.save(leo);

            Cryptomonnaies hedera = new Cryptomonnaies();
            hedera.setNom("Sui");
            hedera.setSymbole("SUI");
            hedera.setBaseprise(3.03);
            hedera.setImages("https://coin-images.coingecko.com/coins/images/26375/large/sui-ocean-square.png?1727791290");
            repository.save(hedera);

            // Affichage dans la console
            System.out.println("Données insérées :");
            repository.findAll().forEach(crypto -> System.out.println(crypto.getNom()));
        };
    }
}
