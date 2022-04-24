package com.ibs.backend.service.PromoCode;

import com.ibs.backend.entityDto.PromoCodeDto;

import java.util.List;

public interface PromoCodeService {

    /**
     * @param tenantId   id of tenant for which we need to find the promoCode
     * @param propertyId id of property for which we need to find the promoCode
     * @return List of PromoCodeDto that contains the promoCode based on the
     *         parameter provided
     */
    List<PromoCodeDto> getAllPromoCodeByTenantIAndPropertyId(String tenantId,
            String propertyId);
}
