package com.ibs.backend.entityDto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class ListRoomWrapper {
    @JsonProperty("listRoomTypes")

    private List<ListRoomTypesDto> listRoomTypesDtos;
}
