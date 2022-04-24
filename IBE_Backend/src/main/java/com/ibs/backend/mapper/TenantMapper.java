package com.ibs.backend.mapper;

import com.ibs.backend.entity.Tenant;
import com.ibs.backend.entityDto.TenantDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class TenantMapper {
    @Autowired
    LanguagesMapper languagesMapper;

    public TenantDto fromEntity(Tenant tenant) {
        TenantDto tenantDto = new TenantDto();
        tenantDto.setId(tenant.getId());
        tenantDto.setContactInfo(tenant.getContactInfo());
        tenantDto.setName(tenant.getName());
        tenantDto.setLanguagesList(tenant.getLanguagesList().stream()
                .map(languagesMapper::fromEntity)
                .collect(Collectors.toList()));

        return tenantDto;
    }

    public Tenant toEntity(TenantDto tenantDto) {
        Tenant tenant = new Tenant();
        tenant.setId(tenantDto.getId());
        tenant.setContactInfo(tenantDto.getContactInfo());
        tenant.setName(tenantDto.getName());
        tenant.setLanguagesList(tenantDto.getLanguagesList().stream()
                .map(languagesMapper::toEntity)
                .collect(Collectors.toList()));
        return tenant;
    }
}
