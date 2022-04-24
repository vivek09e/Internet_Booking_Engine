package com.ibs.backend.mapper;

import com.ibs.backend.entity.Promotions;
import com.ibs.backend.entityDto.PromotionDto;
import org.springframework.stereotype.Component;

@Component
public class PromotionsMapper {
    public PromotionDto fromEntity(Promotions promotions)
    {
        PromotionDto promotionDto = new PromotionDto();
        promotionDto.setPromoId(Integer.parseInt(promotions.getId()));
        promotionDto.setCategory(promotions.getCategory());
        promotionDto.setIsDeactivated(promotions.isDeactivated());
        promotionDto.setMinimumDaysOfStay(promotions.getMinimumDaysOfStay());
        promotionDto.setPromoTitle(promotions.getPromotionTitle());
        promotionDto.setMinimumRooms(promotions.getMinimumRooms());
        promotionDto.setPromoDescription(promotions.getPromoDescription());
        promotionDto.setPriceFactor(promotions.getPriceFactor());

        return promotionDto;

    }
}
