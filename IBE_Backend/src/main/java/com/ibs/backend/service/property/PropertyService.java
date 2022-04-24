package com.ibs.backend.service.property;

import com.ibs.backend.entityDto.PropertyDto;

import java.util.List;

public interface PropertyService {

    /**
     * @param id tenant id for which we have to find the associated property.
     * @return List of PropertyDto that contains all the property of the tenant.
     */
    List<PropertyDto> getAllPropertyByTenantId(String id);

    /**
     * @param id of the property to find
     * @return PropertyDto that contains the property details associated with the id.
     */
    PropertyDto getPropertyById(String id);

}
