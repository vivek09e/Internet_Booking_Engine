package com.ibs.backend.entityDto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ListPromotionsDto {

    @JsonProperty("listPromotions")
    private List<PromotionDto> promotions;
}
