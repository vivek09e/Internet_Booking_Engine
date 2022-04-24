package com.ibs.backend.mapper;

import com.ibs.backend.entity.Tenant;
import com.ibs.backend.entityDto.FiltersDto;
import com.ibs.backend.entityDto.TenantCustomizableDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class TenantFilterLanguageMapper {

    @Autowired
    LanguagesMapper languagesMapper;
    @Autowired
    FilterMapper filterMapper;

    public TenantCustomizableDto fromEntity(Tenant tenant) {
        TenantCustomizableDto tenantCustomizableDto = new TenantCustomizableDto();
        tenantCustomizableDto.setId(tenant.getId());
        tenantCustomizableDto.setName(tenant.getName());
        tenantCustomizableDto.setLanguagesList(tenant.getLanguagesList().stream()
                .map(languagesMapper::language)
                .collect(Collectors.toList()));
        tenantCustomizableDto.setCurrency(tenant.getLanguagesList()
                .stream().map(languagesMapper::currency)
                .collect(Collectors.toList()));
        List<FiltersDto> temp = tenant.getFilters().stream()
                .map(filterMapper::fromAssociationEntity)
                .collect(Collectors.toList());
        HashMap<String, Boolean> hashMap = new HashMap<>();
        for (FiltersDto filtersDto : temp) {
            hashMap.put(filtersDto.getName(), filtersDto.getFlag());
        }
        tenantCustomizableDto.setFilters(hashMap);
        return tenantCustomizableDto;
    }
}
