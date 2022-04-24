package com.ibs.backend.entityDto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;



@Data
public class RoomAvailable {

    @JsonProperty("date")
    private String date;

    @JsonProperty("room_id")
    private Integer roomID;

    @JsonProperty("availability_id")
    private Integer availabilityId;
}
