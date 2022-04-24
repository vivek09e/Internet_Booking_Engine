package com.ibs.backend.entityDto;

import lombok.Data;

@Data
public class ConfirmationPageDto {
    private RoomTypeDto roomTypeDto;
    private PromotionDto promotionDto;
    private TravelerInfoDto travelerInfoDto;
    private PaymentDto paymentDto;
    private BookingDto bookingDto;
}
