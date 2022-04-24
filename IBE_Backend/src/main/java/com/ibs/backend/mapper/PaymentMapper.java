package com.ibs.backend.mapper;

import com.ibs.backend.entity.Payment;
import com.ibs.backend.entityDto.PaymentDto;
import org.springframework.stereotype.Component;

@Component
public class PaymentMapper {

    public PaymentDto fromEntity(Payment payment){
        PaymentDto paymentDto= new PaymentDto();
        paymentDto.setCardNumber(payment.getCardNumber());
        paymentDto.setPayExpiryMM(payment.getPayExpiryMM());
        paymentDto.setPayExpiryYY(payment.getPayExpiryYY());
        paymentDto.setId(payment.getId());
        return paymentDto;
    }
}
