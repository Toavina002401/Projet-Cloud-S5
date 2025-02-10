package com.example.Spring_boot.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class ResponseHelper {

    public ResponseEntity<Map<String, Object>> jsonResponse(String status, Object data, String error, Map<String, Object> meta) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", status);
        response.put("data", data);
        response.put("meta", meta);
        response.put("error", error);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public Map<String, Object> arrayResponse(String status, Object data, String error, Map<String, Object> meta) {
        Map<String, Object> response = new HashMap<>();
        response.put("status", status);
        response.put("data", data);
        response.put("meta", meta);
        response.put("error", error);

        return response;
    }
}