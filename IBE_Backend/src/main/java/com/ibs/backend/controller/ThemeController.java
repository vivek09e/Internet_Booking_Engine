package com.ibs.backend.controller;

import com.ibs.backend.entityDto.ThemeDto;
import com.ibs.backend.service.theme.ThemeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/theme")
public class ThemeController {

    @Autowired
    private ThemeService themeService;

    @Value("${spring.application.name}")
    private static String applicationName;

    private final Logger logger = LoggerFactory.getLogger(ThemeController.class);

    /**
     * @param id of the tenant for which we need to find the theme details
     * @return Response Entity that contains a ThemeDto that have all the details
     *         regarding the
     *         theme that is associated with the tenant.
     */
    @CrossOrigin
    @GetMapping("/{id}")
    private ResponseEntity<ThemeDto> getThemeByTenantId(@PathVariable String id) {
        logger.info("Received a Get theme request for Tenant_id: , {}", id);
        return Optional.ofNullable(new ResponseEntity(themeService
                .getThemeByTenantId(id), HttpStatus.OK))
                .orElse(new ResponseEntity(null, HttpStatus.NOT_FOUND));
    }
}
