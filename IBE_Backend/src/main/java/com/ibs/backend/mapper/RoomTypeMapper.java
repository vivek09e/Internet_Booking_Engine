package com.ibs.backend.mapper;

import com.ibs.backend.entity.RoomType;
import com.ibs.backend.entityDto.RoomTypeDto;
import com.ibs.backend.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class RoomTypeMapper {

    @Autowired
    RoomTypeAmenitiesAssociationMapper roomTypeAmenitiesAssociationMapper;

    @Autowired
    PropertyRepository propertyRepository;

    public RoomTypeDto fromEntity(RoomType roomType) {
        RoomTypeDto roomTypeDto = new RoomTypeDto();
        roomTypeDto.setId(roomType.getId());
        roomTypeDto.setName(roomType.getName());
        roomTypeDto.setRoomOccupancyTax(roomType.getRoomOccupancyTax());
        roomTypeDto.setDescription(roomType.getDescription());
        roomTypeDto.setAmenities(roomType.getRoomTypeAmenitiesAssociations()
                .stream().map(roomTypeAmenitiesAssociationMapper::nameFromEntity)
                .collect(Collectors.toList()));
        roomTypeDto.setPropertyTax(propertyRepository.getById("1").getPropertyTax());
        roomTypeDto.setImageUrl(roomType.getImageList().get(1).getS3Url());
        return roomTypeDto;
    }


    public RoomType toEntity(RoomTypeDto roomTypeDto) {
        RoomType roomType = new RoomType();
        roomType.setId(roomTypeDto.getId());
        roomType.setName(roomTypeDto.getName());
        roomType.setRoomOccupancyTax(roomTypeDto.getRoomOccupancyTax());
        roomType.setDescription(roomTypeDto.getDescription());

        return roomType;
    }
}
