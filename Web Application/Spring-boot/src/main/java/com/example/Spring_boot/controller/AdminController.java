package com.example.Spring_boot.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;

@Controller
public class AdminController {

    @GetMapping("/")
    public String hello(Model model) {
        String projet = "Projet-Cloud-S5";
        model.addAttribute("nom", projet);
        return "index";
    }
}