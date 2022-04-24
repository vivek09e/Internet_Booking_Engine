package com.ibs.backend.controller;

import com.ibs.backend.entityDto.PromoCodeDto;
import com.ibs.backend.service.PromoCode.PromoCodeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/PromoCode")
public class PromoCodeController {

    @Autowired
    PromoCodeService promoCodeService;

    @Value("${spring.application.name}")
    private static String applicationName;

    private final Logger logger = LoggerFactory.getLogger(PromoCodeController.class);

    /**
     * @param tenantId   of tenant for which promoCode should be fetched.
     * @param propertyId of property for which promoCode should be fetched.
     * @return ResponseEntity that contains a list of PromoCodes of a particular
     *         tenant and property.
     */
    @GetMapping
    @CrossOrigin
    public ResponseEntity<List<PromoCodeDto>> getAllPromoByTenantAndProperty(@RequestHeader("tenantId") String tenantId,
            @RequestHeader("propertyId") String propertyId) {
        logger.info("Received request for {} {}", tenantId, propertyId);
        return Optional.ofNullable(new ResponseEntity(promoCodeService
                .getAllPromoCodeByTenantIAndPropertyId(tenantId, propertyId), HttpStatus.OK))
                .orElse(new ResponseEntity(null, HttpStatus.NOT_FOUND));

    }
}
