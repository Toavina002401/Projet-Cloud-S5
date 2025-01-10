package com.example.FrontOffice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Controller
@RequestMapping("/api")
public class ApiController {

    @Autowired
    private RestTemplate restTemplate;


    // @GetMapping("/login")
    // public String login(Model model) {
    //     // Appel à l'API externe
    //     String url = "https://external-api.com/login"; // Remplacez par l'URL réelle
    //     ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

    //     // Traitement de la réponse
    //     String apiResponse = response.getBody();
    //     model.addAttribute("apiResponse", apiResponse);

    //     return "loginView"; // Le nom de votre vue Thymeleaf
    // }


    @PostMapping("/login")
public String handleLogin(
        @RequestParam("email") String email,
        @RequestParam("password") String password,
        Model model) {
    String symfonyEndpoint = "http://localhost:8080/api/login"; // URL de l'API Symfony

    try {
        // Construire les données de connexion
        var body = new java.util.HashMap<String, String>();
        body.put("email", email);
        body.put("password", password);

        // Envoyer la requête POST au backend Symfony
        HttpEntity<Object> request = new HttpEntity<>(body);
        ResponseEntity<String> response = restTemplate.postForEntity(symfonyEndpoint, request, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            // Ajout de la réponse de Symfony au modèle
            model.addAttribute("response", response.getBody());
            return "verification"; // Afficher la page "verification.html"
        } else {
            // En cas d'erreur de login
            model.addAttribute("errorMessage", "Email ou mot de passe incorrect.");
        }
    } catch (Exception e) {
        // Gestion des exceptions (ex: API Symfony indisponible)
        model.addAttribute("errorMessage", "Erreur lors de la connexion au backend : " + e.getMessage());
    }

    return "verification"; // Retourner la page de vérification avec le message d'erreur
}



    @PostMapping("/inscription")
    public String handleInscription(
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            Model model) {
        String symfonyEndpoint = "http://localhost:8080/api/inscription"; // Remplacez avec l'URL de votre backend Symfony

        try {
            // Construire les données d'inscription
            var body = new java.util.HashMap<String, String>();
            body.put("email", email);
            body.put("mdp", password);

            // Envoyer la requête POST au backend Symfony
            HttpEntity<Object> request = new HttpEntity<>(body);
            ResponseEntity<String> response = restTemplate.postForEntity(symfonyEndpoint, request, String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                model.addAttribute("successMessage", "Inscription réussie !");
                return "login"; // Rediriger vers la page de connexion
            } else {
                model.addAttribute("errorMessage", "Erreur lors de l'inscription. Veuillez réessayer.");
            }
        } catch (Exception e) {
            model.addAttribute("errorMessage", "Erreur lors de la connexion au backend : " + e.getMessage());
        }

        return "inscription"; // Retourner à la page d'inscription avec le message d'erreur 
    }
}
