package com.ibs.backend.mapper;

import com.ibs.backend.entity.PromoCode;
import com.ibs.backend.entityDto.PromoCodeDto;
import org.springframework.stereotype.Component;

@Component
public class PromoCodeMapper {
    public PromoCodeDto fromEntity(PromoCode promoCode){

        PromoCodeDto promoCodeDto= new PromoCodeDto();
        promoCodeDto.setCode(promoCode.getCode());
        promoCodeDto.setId(promoCode.getId());
        promoCodeDto.setMaxDiscountAmount(promoCode.getMaxDiscountAmount());
        promoCodeDto.setMinStay(promoCode.getMinStay());
        promoCodeDto.setPriceFactor(promoCode.getPriceFactor());
        promoCodeDto.setMinAmount(promoCode.getMinAmount());
        promoCodeDto.setExpiryDate(promoCode.getExpiryDate());

        return promoCodeDto;
    }
}
