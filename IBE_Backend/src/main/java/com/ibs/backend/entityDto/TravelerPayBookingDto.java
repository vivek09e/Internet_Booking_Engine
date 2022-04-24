package com.ibs.backend.entityDto;

import lombok.Data;

@Data
public class TravelerPayBookingDto {
    private TravelerInfoDto travelerInfoDto;
    private PaymentDto paymentDto;
    private BookingDto bookingDto;

}
