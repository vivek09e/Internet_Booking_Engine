package com.ibs.backend.mapper;

import com.ibs.backend.entity.RoomType;
import com.ibs.backend.entityDto.RoomTypeDataDto;
import com.ibs.backend.entityDto.RoomTypeGraphDto;
import org.springframework.stereotype.Component;

@Component
public class RoomTypeGraphMapper {

    public RoomTypeGraphDto fromEntity(RoomTypeDataDto roomTypeDataDto, RoomType roomType, Integer rate) {
        RoomTypeGraphDto roomTypeGraphDto = new RoomTypeGraphDto();
        roomTypeGraphDto.setRoomTypeId(roomTypeDataDto.getRoomTypeId());
        roomTypeGraphDto.setRoomTypeName(roomTypeDataDto.getRoomTypeName());
        roomTypeGraphDto.setRoomTypeDescription(roomType.getDescription());
        roomTypeGraphDto.setRoomImages(roomType.getImageList());
        roomTypeGraphDto.setAreaInSquareFeet(roomTypeDataDto.getAreaSquareFt());
        roomTypeGraphDto.setBasicNightlyRate(rate);
        roomTypeGraphDto.setNoOfDoubleBed(roomTypeDataDto.getNoDoubleBed());
        roomTypeGraphDto.setNoOfSingleBed(roomTypeDataDto.getNoSingleBed());
        roomTypeGraphDto.setPropertyId(roomTypeDataDto.getPropertyId());
        roomTypeGraphDto.setMaxCapacity(roomTypeDataDto.getMaxCapacity());
        roomTypeGraphDto.setOccupancyTax(roomType.getRoomOccupancyTax());
        return roomTypeGraphDto;
    }
}
