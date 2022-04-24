package com.ibs.backend.mapper;

import com.ibs.backend.entity.RoomTypeAmenitiesAssociation;
import com.ibs.backend.entityDto.AmenitiesDto;
import org.springframework.stereotype.Component;

@Component
public class RoomTypeAmenitiesAssociationMapper {

    public AmenitiesDto fromEntity(RoomTypeAmenitiesAssociation roomTypeAmenitiesAssociation){
        AmenitiesDto amenitiesDto= new AmenitiesDto();
        amenitiesDto.setDescription(roomTypeAmenitiesAssociation.getAmenities().getId());
        amenitiesDto.setName(roomTypeAmenitiesAssociation.getAmenities().getName());
        amenitiesDto.setDescription(roomTypeAmenitiesAssociation.getAmenities().getDescription());
        return amenitiesDto;
    }
    public String nameFromEntity(RoomTypeAmenitiesAssociation roomTypeAmenitiesAssociation){
        return roomTypeAmenitiesAssociation.getAmenities().getName();
    }
}
