package com.ibs.backend.controller;

import com.ibs.backend.entityDto.ReviewDto;
import com.ibs.backend.service.Review.ReviewService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/Review")
public class ReviewController {
    @Autowired
    ReviewService reviewService;

    @Value("${spring.application.name}")
    private static String applicationName;

    private final Logger logger = LoggerFactory.getLogger(TenantController.class);

    @PostMapping
    @CrossOrigin
    private ResponseEntity<ReviewDto> updateReview(@RequestBody ReviewDto reviewDto){
        return Optional.ofNullable(new ResponseEntity(
                reviewService.saveReview(reviewDto), HttpStatus.OK))
                .orElse(new ResponseEntity<>(null,HttpStatus.NOT_FOUND));
    }
}
