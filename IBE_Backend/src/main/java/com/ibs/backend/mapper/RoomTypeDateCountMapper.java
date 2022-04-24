package com.ibs.backend.mapper;

import com.ibs.backend.entityDto.*;
import com.ibs.backend.utilities.DateFormatter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Component
public class RoomTypeDateCountMapper {

    public List<RoomTypeDataDto> fromWrapper(ListRoomWrapper listRoomWrapper) {
        List<RoomTypeDataDto> roomTypeDataDtoList = new ArrayList<>();

        for (ListRoomTypesDto listRoomTypesDto : listRoomWrapper.getListRoomTypesDtos()) {
            RoomTypeDataDto roomTypeDataDto = new RoomTypeDataDto();
            roomTypeDataDto.setRoomTypeId(listRoomTypesDto.getRoomTypeId());
            roomTypeDataDto.setAreaSquareFt(listRoomTypesDto.getAreaSquareFt());
            roomTypeDataDto.setMaxCapacity(listRoomTypesDto.getMaxCapacity());
            roomTypeDataDto.setNoDoubleBed(listRoomTypesDto.getNoDoubleBed());
            roomTypeDataDto.setPropertyId(listRoomTypesDto.getPropertyId());
            roomTypeDataDto.setNoSingleBed(listRoomTypesDto.getNoSingleBed());
            HashMap<String, DateRoomTypeCountDto> dateRoomTypeCountDtoHashMap = new HashMap<>();
            roomTypeDataDto.setPriceCountData(dateRoomTypeCountDtoHashMap);
            roomTypeDataDto.setRoomTypeName(listRoomTypesDto.getRoomTypeName());
            for (RoomDto roomDto : listRoomTypesDto.getRoomDto()) {
                for (RoomAvailable roomAvailable : roomDto.getRoomsAvailable()) {
                    try {
                        String temp = DateFormatter.dateConverter(roomAvailable.getDate());
                        if (roomTypeDataDto.getPriceCountData()
                                .containsKey(temp)) {
                            roomTypeDataDto.getPriceCountData()
                                    .get(DateFormatter.dateConverter(roomAvailable.getDate()))
                                    .updateCount();
                        } else {
                            DateRoomTypeCountDto dateRoomTypeCountDto = new DateRoomTypeCountDto();
                            dateRoomTypeCountDto.setRoomType(listRoomTypesDto.getRoomTypeName());
                            dateRoomTypeCountDto.setRoomCount(1);
                            roomTypeDataDto.getPriceCountData().put(temp,
                                    dateRoomTypeCountDto);
                        }
                    } catch (Exception e) {
                        System.out
                                .println("Problem in converter function in RoomTypeDateCountMapper in room Available");
                    }

                }
                for (RoomRate roomRate : listRoomTypesDto.getRoomRatesEntity()) {
                    try {
                        String temp = roomRate.getDate();
                        if (roomTypeDataDto.getPriceCountData().get(temp).getNightRate() == null) {
                            roomTypeDataDto.getPriceCountData().get(temp).setNightRate(roomRate.getRoomRate());
                            continue;
                        } else
                            roomTypeDataDto.getPriceCountData().get(temp)
                                    .updateNightRate(roomRate.getRoomRate());
                    } catch (Exception e) {
                        System.out.println("Problem in converter function in RoomTypeDateCountMapper in rate part");
                    }

                }
            }
            roomTypeDataDtoList.add(roomTypeDataDto);
        }
        return roomTypeDataDtoList;
    }
}
