package com.ibs.backend.entityDto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class AvailabilityIdDto {
    @JsonProperty("availability_id")
    private Integer id;
}
