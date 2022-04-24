package com.ibs.backend.entityDto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class RoomDto {
    @JsonProperty("room_available")
    List<RoomAvailable> roomsAvailable;
}
