package com.example.Spring_boot.modules;


import jakarta.persistence.*;

@Entity
public class Cryptomonnaies {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String symbole;
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
    public String getSymbole() {
        return symbole;
    }
    public void setSymbole(String symbole) {
        this.symbole = symbole;
    }
    public Cryptomonnaies(){}
}
