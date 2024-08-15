package com.example.demo.controller;

import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.entity.Offer;
import com.example.demo.services.OfferServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "http://localhost")
@RestController
@RequestMapping("/api/offer")
public class OfferController {

    @Autowired
    private OfferServices offerService;

    @PostMapping
    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file) {
        try {
            offerService.saveImage(file);
            return ResponseEntity.ok().body("{\"message\":\"Image saved successfully\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"message\":\"Failed to save image\"}");
        }
    }

    @GetMapping
    public ResponseEntity<List<Offer>> getOffers() {
        List<Offer> offers = offerService.getAllOffers();
        return ResponseEntity.ok(offers);
    }
}
