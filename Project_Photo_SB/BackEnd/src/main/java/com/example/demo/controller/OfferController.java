package com.example.demo.controller;

import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.entity.Offer;
import com.example.demo.services.OfferServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost")
@RestController
@RequestMapping("api/offer")
public class OfferController {

    @Autowired
    private OfferServices offerService;

    @PostMapping
    public ResponseEntity<Offer> createOffer(@RequestBody Offer offerRequest) {
        Offer offer = new Offer();
        offer.setUrl(offerRequest.getUrl());

        // Guardamos la oferta en la base de datos.
        Offer savedOffer = offerService.saveOffer(offer);
        System.out.println("Se subio la oferta");
        return ResponseEntity.ok(savedOffer);
    }

    @GetMapping //Get all Users
    public List<Offer> getAll() {
        return offerService.getAllOffers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Offer> getOfferById(@PathVariable Long id) {
        Optional<Offer> offer = offerService.getOfferById(id);
        if (offer.isPresent()) {
            return ResponseEntity.ok(offer.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Offer> updateOffer(@PathVariable Long id, @RequestBody Offer offerDetails) {
        try {
            System.out.println("Updating offer with id: " + id);
            System.out.println("Offer details: " + offerDetails);
            Offer updatedOffer = offerService.updateOffer(id, offerDetails);
            return ResponseEntity.ok(updatedOffer);
        } catch (ResourceNotFoundException e) {
            System.out.println("Offer not found with id: " + id);
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOffer(@PathVariable Long id) {
        offerService.deleteOffer(id);
        return ResponseEntity.noContent().build();
    }
}
