package com.ibs.backend.entityDto;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class BookingDto implements Serializable {
    private Integer id;
    private Integer adultCount;
    private Integer amountDueAtResort;
    private String checkInDate;
    private String checkOutDate;
    private Integer childCount;
    private Integer guestId;
    private Integer statusId;
    private Integer totalCost;
    private Integer roomTypeID;
    private Integer propertyId;
    private String promotionName;
    private Integer numberOfRoom;
    private Integer basicNightlyRate;
    private String promoType;
}
