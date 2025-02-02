package com.example.FrontOffice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.client.RestTemplate;

@Controller
@RequestMapping("/api")
public class ApiController {

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/login")
    public String login(Model model) {
        // Appel à l'API externe
        String url = "https://external-api.com/login"; // Remplacez par l'URL réelle
        ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);

        // Traitement de la réponse
        String apiResponse = response.getBody();
        model.addAttribute("apiResponse", apiResponse);

        return "loginView"; // Le nom de votre vue Thymeleaf
    }
}
