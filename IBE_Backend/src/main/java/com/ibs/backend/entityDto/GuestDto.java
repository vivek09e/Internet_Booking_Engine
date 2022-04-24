package com.ibs.backend.entityDto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class GuestDto implements Serializable {
    @JsonProperty("guest_id")
    private Integer id;

    @JsonProperty("guest_name")
    private String guestName;

    private String guestEmail;
    private List<BookingDto> guestBookings;
}
