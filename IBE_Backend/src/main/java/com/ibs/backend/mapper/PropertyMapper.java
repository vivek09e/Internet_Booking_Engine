package com.ibs.backend.mapper;

import com.ibs.backend.entity.Property;
import com.ibs.backend.entityDto.PropertyDto;
import org.springframework.stereotype.Component;

@Component
public class PropertyMapper {

    public PropertyDto fromEntity(Property property) {
        PropertyDto propertyDto = new PropertyDto();
        propertyDto.setId(property.getId());
        propertyDto.setName(property.getName());
        propertyDto.setPropertyTax(property.getPropertyTax());
        propertyDto.setTenant_id(property.getTenant().getId());
        propertyDto.setNumber(property.getNumber());
        propertyDto.setAddress(property.getAddress());
        propertyDto.setCallTiming(property.getCallTiming());

        return propertyDto;
    }

}
