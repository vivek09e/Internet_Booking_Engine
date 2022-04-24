package com.ibs.backend.controller;

import com.ibs.backend.service.TenantRoomGuestLimit.TenantRoomGuestLimitService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping("/tenantLimit")
public class TenantRoomGuestLimitController {

    @Autowired
    private TenantRoomGuestLimitService tenantRoomGuestLimitService;
    @Value("${spring.application.name}")
    private static String applicationName;

    private final Logger logger = LoggerFactory.getLogger(TenantRoomGuestLimitController.class);

    /**
     * @param id of a tenant for which we need to find the limits that are
     *           required for the UI like number of adult and more.
     * @return ResponseEntity that contains a hashMap that have all the names of
     *         limits
     *         as key and Integer value associated with it that have the limit of
     *         that filed.
     */
    @CrossOrigin
    @GetMapping("/{id}")
    private ResponseEntity<HashMap<String, Integer>> getLimitsHash(@PathVariable String id) {
        logger.info("Received a request to fetch limits of {} tenant", id);
        return Optional.ofNullable(new ResponseEntity(tenantRoomGuestLimitService.getLimits(id), HttpStatus.OK))
                .orElse(new ResponseEntity(null, HttpStatus.NOT_FOUND));
    }
}
