package com.example.Spring_boot.modules;

import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
public class HistoriqueFonds {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_transaction")
    private Timestamp dateTransaction;

    private Double montant;

    private String type;

    @ManyToOne
    @JoinColumn(name = "id_portefeuille", referencedColumnName = "id")
    private Portefeuille portefeuille;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Timestamp getDateTransaction() {
        return dateTransaction;
    }

    public void setDateTransaction(Timestamp dateTransaction) {
        this.dateTransaction = dateTransaction;
    }

    public Double getMontant() {
        return montant;
    }

    public void setMontant(Double montant) {
        this.montant = montant;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Portefeuille getPortefeuille() {
        return portefeuille;
    }

    public void setPortefeuille(Portefeuille portefeuille) {
        this.portefeuille = portefeuille;
    }
}
