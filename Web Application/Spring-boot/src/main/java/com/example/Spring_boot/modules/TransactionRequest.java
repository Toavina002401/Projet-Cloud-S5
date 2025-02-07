package com.example.Spring_boot.modules;

public class TransactionRequest {
    private Long idUtilisateur;
    private Double solde;

    // Getters et setters
    public Long getIdUtilisateur() {
        return idUtilisateur;
    }

    public void setIdUtilisateur(Long idUtilisateur) {
        this.idUtilisateur = idUtilisateur;
    }

    public Double getSolde() {
        return solde;
    }

    public void setSolde(Double solde) {
        this.solde = solde;
    } 

    public TransactionRequest(){}
}
