package com.example.demo.services;

import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.entity.Offer;
import com.example.demo.repository.OfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class OfferServices {

    @Autowired
    private OfferRepository offerRepository;

    public void saveImage(MultipartFile file) throws IOException {
        byte[] imageBytes = file.getBytes();
        Offer offer = new Offer();
        offer.setImage(imageBytes);
        offerRepository.save(offer);
    }

    public List<Offer> getAllOffers() {
        return offerRepository.findAll();
    }
}
