package com.ibs.backend.entityDto;

import lombok.Data;
import java.util.HashMap;

@Data
public class RoomTypeDataDto {

    private Integer roomTypeId;
    private Integer areaSquareFt;
    private Integer noDoubleBed;
    private Integer noSingleBed;
    private Integer maxCapacity;
    private Integer propertyId;
    private String roomTypeName;
    private HashMap<String, DateRoomTypeCountDto> priceCountData;
}
