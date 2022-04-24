package com.ibs.backend.entityDto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ListRoomTypesDto {

    @JsonProperty("room_type_id")
    private Integer roomTypeId;
    @JsonProperty("area_in_square_feet")
    private Integer areaSquareFt;
    @JsonProperty("double_bed")
    private Integer noDoubleBed;
    @JsonProperty("single_bed")
    private Integer noSingleBed;
    @JsonProperty("max_capacity")
    private Integer maxCapacity;
    @JsonProperty("property_id")
    private Integer propertyId;
    @JsonProperty("room_type_name")
    private String roomTypeName;
    @JsonProperty("room_rates")
    private List<RoomRate> roomRatesEntity;
    @JsonProperty("room")
    private List<RoomDto> roomDto;
}
