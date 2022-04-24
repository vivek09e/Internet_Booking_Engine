package com.ibs.backend.entityDto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PromotionDto {

    @JsonProperty("promotion_id")
    private Integer promoId;

    @JsonProperty("promotion_description")
    private String promoDescription;

    @JsonProperty("promotion_title")
    private String promoTitle;

    @JsonProperty("is_deactivated")
    private Boolean isDeactivated;

    @JsonProperty("minimum_days_of_stay")
    private Integer minimumDaysOfStay;

    @JsonProperty("price_factor")
    private Double priceFactor;

    private String category;

    private Integer minimumRooms;
}
