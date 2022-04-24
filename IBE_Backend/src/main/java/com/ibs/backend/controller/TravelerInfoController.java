package com.ibs.backend.controller;

import com.ibs.backend.entityDto.BookingGuestDto;
import com.ibs.backend.entityDto.ConfirmationPageDto;
import com.ibs.backend.entityDto.TravelerInfoDto;
import com.ibs.backend.entityDto.TravelerPayBookingDto;
import com.ibs.backend.service.travelerinfo.TravelerInfoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/travelerInfo")
public class TravelerInfoController {
    @Autowired
    TravelerInfoService travelerInfoService;

    @Value("${spring.application.name}")
    private static String applicationName;

    private final Logger logger = LoggerFactory.getLogger(TravelerInfoController.class);

    /**
     * @param travelerPayBookingDto object that needed to be added to DB.
     * @return if the object is entered in the DB return a ResponseEntity that contains the same travelerInfoDto.
     */
    @PostMapping
    @CrossOrigin
    private ResponseEntity<BookingGuestDto> addTraveler(@RequestBody TravelerPayBookingDto travelerPayBookingDto) {
        logger.info("Received a Request to add {} traveler", travelerPayBookingDto);
        return Optional.ofNullable(new ResponseEntity(travelerInfoService
                .addTraveler(travelerPayBookingDto), HttpStatus.OK)).orElse(
                new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @GetMapping("/{id}")
    @CrossOrigin
    private ResponseEntity<ConfirmationPageDto> getTravelerInfo(@PathVariable Integer id) {
        logger.info("Received a request to fetch traveler for booking id : {}", id);
        return Optional.ofNullable(new ResponseEntity(travelerInfoService.getTravelerInfoFromBookingId(id)
                , HttpStatus.OK)).orElse(new ResponseEntity(null, HttpStatus.NOT_FOUND));
    }

    @PostMapping("/cancel")
    @CrossOrigin
    private ResponseEntity<BookingGuestDto> cancelBooking(@RequestBody BookingGuestDto bookingGuestDto) {
        logger.info("Received a Request to add {} traveler", bookingGuestDto);
        return Optional.ofNullable(new ResponseEntity(travelerInfoService
                .cancelBooking(bookingGuestDto), HttpStatus.OK)).orElse(
                new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }
}
