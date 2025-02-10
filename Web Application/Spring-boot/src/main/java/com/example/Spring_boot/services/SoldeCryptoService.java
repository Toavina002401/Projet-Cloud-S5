package com.example.Spring_boot.services;

import com.example.Spring_boot.modules.SoldeCrypto;
import com.example.Spring_boot.repository.SoldeCryptoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SoldeCryptoService {

    @Autowired
    private SoldeCryptoRepository soldeCryptoRepository;

    public SoldeCrypto saveSoldeCrypto(SoldeCrypto soldeCrypto) {
        return soldeCryptoRepository.save(soldeCrypto);
    }
}