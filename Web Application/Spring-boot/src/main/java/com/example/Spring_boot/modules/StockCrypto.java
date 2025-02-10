package com.example.Spring_boot.modules;

public class StockCrypto {
    private Long id;
    private String nom;
    private double stock;

    public StockCrypto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public double getStock() {
        return stock;
    }
    
    public void setStock(double stock) {
        this.stock = stock;
    }
    
}
