package com.example.Spring_boot.modules;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
public class SoldeCrypto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;  // Changer Long à Integer pour correspondre à SERIAL en base de données
    
    @Column(name = "quantite_crypto", precision = 20, scale = 6)
    private BigDecimal quantiteCrypto;
    
    @Column(name = "dernier_maj")
    private Timestamp dernierMaj;
    
    @Column(name = "prix_crypto", precision = 18, scale = 2)
    private BigDecimal prixCrypto;
    
    @Column(name = "type", length = 50)
    private String type; 
    
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_cryptomonnaies", nullable = false)
    private Cryptomonnaies cryptomonnaies;
    
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_portefeuille", nullable = false)
    private Portefeuille portefeuille;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

    public BigDecimal getPrixCrypto() {
        return prixCrypto;
    }

    public void setPrixCrypto(BigDecimal prixCrypto) {
        this.prixCrypto = prixCrypto;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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

    public SoldeCrypto() {}
}
