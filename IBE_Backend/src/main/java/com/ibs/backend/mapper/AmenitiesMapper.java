package com.ibs.backend.mapper;

import com.ibs.backend.entity.Amenities;
import com.ibs.backend.entityDto.AmenitiesDto;
import org.springframework.stereotype.Component;

@Component
public class AmenitiesMapper {

    /**
     * @param amenities Object that need to be mapped on AmenitiesDto
     * @return AmenitiesDto object which have all the content from Amenities object
     */
    public AmenitiesDto fromEntity(Amenities amenities) {
        AmenitiesDto amenitiesDto = new AmenitiesDto();
        amenitiesDto.setId(amenities.getId());
        amenitiesDto.setName(amenities.getName());
        amenitiesDto.setDescription(amenities.getDescription());
        return amenitiesDto;
    }
}
