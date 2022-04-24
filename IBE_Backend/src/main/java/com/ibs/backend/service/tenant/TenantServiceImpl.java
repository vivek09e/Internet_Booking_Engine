package com.ibs.backend.service.tenant;

import com.ibs.backend.entity.Tenant;
import com.ibs.backend.entityDto.TenantCustomizableDto;
import com.ibs.backend.entityDto.TenantDto;
import com.ibs.backend.mapper.TenantFilterLanguageMapper;
import com.ibs.backend.mapper.TenantMapper;
import com.ibs.backend.repository.FiltersRepository;
import com.ibs.backend.repository.LanguagesRepository;
import com.ibs.backend.repository.TenantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class TenantServiceImpl implements TenantService {
    @Autowired
    private TenantRepository tenantRepository;

    @Autowired
    private TenantMapper tenantMapper;

    @Autowired
    private LanguagesRepository languagesRepository;

    @Autowired
    private FiltersRepository filtersRepository;

    @Autowired
    private TenantFilterLanguageMapper tenantFilterLanguageMapper;

    @Override
    public List<TenantCustomizableDto> getAllTenant() {
        return tenantRepository.findAll()
                .stream()
                .map(tenantFilterLanguageMapper::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public TenantDto addTenant(TenantDto tenantDto) {
        Tenant tenant = tenantMapper.toEntity(tenantDto);
        languagesRepository.saveAll(tenant.getLanguagesList());
        tenantRepository.save(tenant);
        return tenantDto;
    }

    @Override
    public Optional<TenantCustomizableDto> getTenantById(String id) {
        return tenantRepository.findById(id)
                .map(tenantFilterLanguageMapper::fromEntity);
    }
}
