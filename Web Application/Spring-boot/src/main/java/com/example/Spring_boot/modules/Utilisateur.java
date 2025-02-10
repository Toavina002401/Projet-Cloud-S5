package com.example.Spring_boot.modules;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
public class Utilisateur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String pseudo;
    private String email;
    private String mdp;
    @Column(name = "date_creation")
    private Timestamp dateCreation;
    private Boolean actif;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getPseudo() {
        return pseudo;
    }
    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getMdp() {
        return mdp;
    }
    public void setMdp(String mdp) {
        this.mdp = mdp;
    }
    public Timestamp getDateCreation() {
        return dateCreation;
    }
    public void setDateCreation(Timestamp dateCreation) {
        this.dateCreation = dateCreation;
    }
    public Boolean getActif() {
        return actif;
    }
    public void setActif(Boolean actif) {
        this.actif = actif;
    }
    public Utilisateur(){}
}
