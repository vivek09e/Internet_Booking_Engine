package com.ibs.backend.service.PromoCode;

import com.ibs.backend.entityDto.PromoCodeDto;
import com.ibs.backend.mapper.PromoCodeMapper;
import com.ibs.backend.repository.PromoCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PromoCodeServiceImpl implements PromoCodeService {
    @Autowired
    PromoCodeMapper promoCodeMapper;

    @Autowired
    PromoCodeRepository promoCodeRepository;

    @Override
    public List<PromoCodeDto> getAllPromoCodeByTenantIAndPropertyId(String tenantId, String propertyId) {
        return promoCodeRepository.findByTenantIdAndPropertyId(tenantId, propertyId)
                .stream().map(promoCodeMapper::fromEntity)
                .collect(Collectors.toList());
    }
}
