package com.ibs.backend.mapper;

import com.ibs.backend.entity.TravelerInfo;
import com.ibs.backend.entityDto.TravelerInfoDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TravelerInfoMapper {

    @Autowired
    BillingInfoMapper billingInfoMapper;
    public TravelerInfoDto fromEntity(TravelerInfo travelerInfo){
        TravelerInfoDto travelerInfoDto= new TravelerInfoDto();
        travelerInfoDto.setId(travelerInfo.getId());
        travelerInfoDto.setBillingInfo(billingInfoMapper.fromEntity(travelerInfo.getBillingInfo()));
        travelerInfoDto.setBookingId(travelerInfo.getBooking().getId());
        travelerInfoDto.setEmailId(travelerInfo.getEmailId());
        travelerInfoDto.setFirstName(travelerInfo.getFirstName());
        travelerInfoDto.setMiddleName(travelerInfo.getMiddleName());
        travelerInfoDto.setLastName(travelerInfo.getLastName());
        travelerInfoDto.setPhoneCode(travelerInfo.getPhoneCode());
        travelerInfoDto.setPhone(travelerInfo.getPhone());
        return travelerInfoDto;
    }
    public TravelerInfo toEntity(TravelerInfoDto travelerInfoDto){
        TravelerInfo travelerInfo= new TravelerInfo();
        travelerInfo.setId(travelerInfoDto.getId());
        travelerInfo.setBillingInfo(billingInfoMapper.toEntity(travelerInfoDto.getBillingInfo(),travelerInfo));
//        travelerInfo.setBooking(travelerInfoDto.getBookingId());
        travelerInfo.setEmailId(travelerInfoDto.getEmailId());
        travelerInfo.setFirstName(travelerInfoDto.getFirstName());
        travelerInfo.setMiddleName(travelerInfoDto.getMiddleName());
        travelerInfo.setLastName(travelerInfoDto.getLastName());
        travelerInfo.setPhoneCode(travelerInfoDto.getPhoneCode());
        travelerInfo.setPhone(travelerInfoDto.getPhone());
        return travelerInfo;
    }
}
