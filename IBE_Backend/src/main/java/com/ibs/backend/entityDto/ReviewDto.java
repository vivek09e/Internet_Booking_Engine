package com.ibs.backend.entityDto;


import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;

@Data
public class ReviewDto implements Serializable {
    private Long reviewId;
    private Integer bookingId;
    private Integer overAllRating;
    private Integer amenitiesRating;
    private Integer cleanlinessRating;
    private Integer facilitiesRating;
    private Integer roomComfortAndQualityRating;
    private Integer serviceRating;
    private Integer valueForMoneyRating;
    private Integer roomTypeId;
    private Integer numberOfReview;
    private String guestComment;
}
