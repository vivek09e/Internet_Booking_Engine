package com.ibs.backend.entityDto;


import lombok.Data;

import java.io.Serializable;

@Data
public class PaymentDto implements Serializable {
    private Integer id;
    private String cardNumber;
    private Integer payExpiryMM;
    private Integer payExpiryYY;
}
