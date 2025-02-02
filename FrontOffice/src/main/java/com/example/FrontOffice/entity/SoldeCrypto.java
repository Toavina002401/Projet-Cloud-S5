package com.example.FrontOffice.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

import org.hibernate.annotations.UpdateTimestamp;

@Entity
public class SoldeCrypto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "quantite_crypto", precision = 20, scale = 6, nullable = false)
    
    private BigDecimal quantiteCrypto;

    @Column(name = "dernier_maj", updatable = false)
    @UpdateTimestamp
    private Timestamp dernierMaj;

    @ManyToOne
    @JoinColumn(name = "id_cryptomonnaies", nullable = false)
    private Cryptomonnaies cryptomonnaies;

    @ManyToOne
    @JoinColumn(name = "id_portefeuille", nullable = false)
    private Portefeuille portefeuille;

    public SoldeCrypto() {
        // Constructeur par défaut requis par JPA
    }

    // Getters et Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getQuantiteCrypto() {
        return quantiteCrypto;
    }

    public void setQuantiteCrypto(BigDecimal quantiteCrypto) {
        this.quantiteCrypto = quantiteCrypto;
    }

    public Timestamp getDernierMaj() {
        return dernierMaj;
    }

    public void setDernierMaj(Timestamp dernierMaj) {
        this.dernierMaj = dernierMaj;
    }

    public Cryptomonnaies getCryptomonnaies() {
        return cryptomonnaies;
    }

    public void setCryptomonnaies(Cryptomonnaies cryptomonnaies) {
        this.cryptomonnaies = cryptomonnaies;
    }

    public Portefeuille getPortefeuille() {
        return portefeuille;
    }

    public void setPortefeuille(Portefeuille portefeuille) {
        this.portefeuille = portefeuille;
    }
}
