package com.example.Spring_boot.modules;

public class TransactionCryptoRequest {

    private double quantiteCrypto;
    private double prixCrypto;
    private String type;
    private Long idCrypto;
    private Long idPorteFeuille;

    // Getters et Setters

    public double getQuantiteCrypto() {
        return quantiteCrypto;
    }

    public void setQuantiteCrypto(double quantiteCrypto) {
        this.quantiteCrypto = quantiteCrypto;
    }

    public double getPrixCrypto() {
        return prixCrypto;
    }

    public void setPrixCrypto(double prixCrypto) {
        this.prixCrypto = prixCrypto;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getIdCrypto() {
        return idCrypto;
    }

    public void setIdCrypto(Long idCrypto) {
        this.idCrypto = idCrypto;
    }

    public Long getIdPorteFeuille() {
        return idPorteFeuille;
    }

    public void setIdPorteFeuille(Long idPorteFeuille) {
        this.idPorteFeuille = idPorteFeuille;
    }

    // Constructeur sans arguments
    public TransactionCryptoRequest() {}

    // Constructeur avec paramètres pour initialiser les champs
    public TransactionCryptoRequest(double quantiteCrypto, double prixCrypto, String type, Long idCrypto, Long idPorteFeuille) {
        this.quantiteCrypto = quantiteCrypto;
        this.prixCrypto = prixCrypto;
        this.type = type;
        this.idCrypto = idCrypto;
        this.idPorteFeuille = idPorteFeuille;
    }
}