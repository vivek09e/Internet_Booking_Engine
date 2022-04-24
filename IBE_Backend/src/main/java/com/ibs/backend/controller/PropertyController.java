package com.ibs.backend.controller;

import com.ibs.backend.entityDto.PropertyDto;
import com.ibs.backend.service.property.PropertyService;
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
@RequestMapping("/property")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;
    @Value("${spring.application.name}")
    private static String applicationName;

    private final Logger logger = LoggerFactory.getLogger(PropertyController.class);

    /**
     * @param id of the tenant for which we need to find the property associated
     *           with it.
     * @return ResponseEntity that contains a list of propertyDto containing all the
     *         properties
     *         info associated with the particular tenant.
     */
    @CrossOrigin
    @GetMapping("/{id}")
    private ResponseEntity<List<PropertyDto>> getPropertyByTenant(@PathVariable String id) {
        logger.info("Received a Get all properties request for Tenant_id: , {}", id);
        return Optional.ofNullable(new ResponseEntity(propertyService
                .getAllPropertyByTenantId(id), HttpStatus.OK))
                .orElse(new ResponseEntity(null, HttpStatus.NOT_FOUND));
    }

    /**
     * @param id of the property which needed to be found.
     * @return ResponseEntity that contains propertyDto object.
     */
    @CrossOrigin
    @GetMapping("/propertyId/{id}")
    private ResponseEntity<PropertyDto> getPropertyById(@PathVariable String id){
        return Optional.ofNullable(new ResponseEntity(propertyService
                        .getPropertyById(id), HttpStatus.OK))
                .orElse(new ResponseEntity(null, HttpStatus.NOT_FOUND));
    }
}
