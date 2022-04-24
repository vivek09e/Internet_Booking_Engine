package com.ibs.backend.entityDto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ListBookings {
    @JsonProperty("booking_id")
    Integer bookingId;

    @JsonProperty("status_id")
    Integer statusId;
}
