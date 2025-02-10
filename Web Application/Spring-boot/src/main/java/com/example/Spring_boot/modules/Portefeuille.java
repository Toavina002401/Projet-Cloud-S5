package com.example.Spring_boot.modules;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
public class Portefeuille {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_creation")
    private Timestamp dateCreation;

    @Column(name = "solde_fonds")
    private Double soldeFonds;

    @ManyToOne
    @JoinColumn(name = "id_utilisateur", referencedColumnName = "id")
    private Utilisateur utilisateur;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Timestamp getDateCreation() {
        return dateCreation;
    }

    public void setDateCreation(Timestamp dateCreation) {
        this.dateCreation = dateCreation;
    }

    public Double getSoldeFonds() {
        return soldeFonds;
    }

    public void setSoldeFonds(Double soldeFonds) {
        this.soldeFonds = soldeFonds;
    }

    public Utilisateur getUtilisateur() {
        return utilisateur;
    }

    public void setUtilisateur(Utilisateur utilisateur) {
        this.utilisateur = utilisateur;
    }
}