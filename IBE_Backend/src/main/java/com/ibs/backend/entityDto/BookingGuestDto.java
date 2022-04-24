package com.ibs.backend.entityDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingGuestDto {
    Integer bookingId;
    Integer guestId;
    Long reviewId;
    Integer bookingStatus;
}
