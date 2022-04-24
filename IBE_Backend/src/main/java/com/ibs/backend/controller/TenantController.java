package com.ibs.backend.controller;

import com.ibs.backend.entityDto.TenantCustomizableDto;
import com.ibs.backend.entityDto.TenantDto;
import com.ibs.backend.service.tenant.TenantService;
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
@RequestMapping("/api/tenant")
public class TenantController {
    @Autowired
    TenantService tenantService;

    @Value("${spring.application.name}")
    private static String applicationName;

    private final Logger logger = LoggerFactory.getLogger(TenantController.class);

    /**
     * @return ResponseEntity that contains a list of TenantCustomizableDto that
     *         have all the info of what are the feature that tenant want on their
     *         site.
     */
    @CrossOrigin
    @GetMapping("/")
    public ResponseEntity<List<TenantCustomizableDto>> getAllTenant() {
        logger.info("Received a Get all Tenant Request!");
        return Optional.ofNullable(new ResponseEntity(tenantService
                .getAllTenant(), HttpStatus.OK))
                .orElse(new ResponseEntity(null, HttpStatus.NOT_FOUND));
    }

    /**
     * @param tenantDto an object of tenantDto that contains all the info of new
     *                  tenant
     *                  that will be added in the database.
     * @return tenantDto if the tenant object is successfully inserted in the
     *         database.
     */
    @CrossOrigin
    @PostMapping("/")
    public ResponseEntity<TenantDto> addTenant(@RequestBody TenantDto tenantDto) {
        logger.info("Received a post request for Tenant: , {}", tenantDto);
        return Optional.ofNullable(new ResponseEntity(tenantService
                .addTenant(tenantDto), HttpStatus.OK))
                .orElse(new ResponseEntity(null, HttpStatus.INTERNAL_SERVER_ERROR));

    }

    /**
     * @param id of the tenant for which we need to fetch the TenantCustomizableDto.
     * @return ResponseEntity that contains a list of TenantCustomizableDto that
     *         have all the info of what are the feature that tenant want on their
     *         site.
     */
    @CrossOrigin
    @GetMapping("/{id}")
    public ResponseEntity<TenantCustomizableDto> getTenantById(@PathVariable String id) {
        logger.info("Received a Get Tenant Request! for id {}", id);
        return Optional.ofNullable(new ResponseEntity(tenantService.getTenantById(id), HttpStatus.OK))
                .orElse(new ResponseEntity(null, HttpStatus.NOT_FOUND));
    }

}
