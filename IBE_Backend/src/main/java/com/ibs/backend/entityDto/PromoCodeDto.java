package com.ibs.backend.entityDto;

import lombok.Data;

import java.io.Serializable;

@Data
public class PromoCodeDto implements Serializable {
    private String id;
    private String code;
    private Integer minStay;
    private Double priceFactor;
    private Double minAmount;
    private Double maxDiscountAmount;
    private String expiryDate;
}
