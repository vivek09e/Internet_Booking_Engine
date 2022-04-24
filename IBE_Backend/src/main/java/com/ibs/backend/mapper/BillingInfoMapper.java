package com.ibs.backend.mapper;

import com.ibs.backend.entity.BillingInfo;
import com.ibs.backend.entity.TravelerInfo;
import com.ibs.backend.entityDto.BillingInfoDto;
import org.springframework.stereotype.Component;

@Component
public class BillingInfoMapper {

    /**
     * @param billingInfo Object that need to be mapped on BillingInfoDto
     * @return BillingInfoDto object which have all the content from BillingInfo object
     */
    public BillingInfoDto fromEntity(BillingInfo billingInfo){
        BillingInfoDto billingInfoDto= new BillingInfoDto();
        billingInfoDto.setCity(billingInfo.getCity());
        billingInfoDto.setId(billingInfo.getId());
        billingInfoDto.setCountry(billingInfo.getCountry());
        billingInfoDto.setFirstName(billingInfo.getFirstName());
        billingInfoDto.setLastName(billingInfo.getLastName());
        billingInfoDto.setMiddleName(billingInfo.getMiddleName());
        billingInfoDto.setMailingAddress1(billingInfo.getMailingAddress1());
        billingInfoDto.setMailingAddress2(billingInfo.getMailingAddress2());
        billingInfoDto.setZip(billingInfo.getZip());
        billingInfoDto.setState(billingInfo.getState());
        return billingInfoDto;
    }

    /**
     * @param billingInfoDto object of BillingInfoDto that need to br mapped to BillingInfo
     * @param travelerInfo object of TravelerInfo that need to be added to BillingInfo
     * @return BillingInfo object that contains all the info from billingInfoDto and travelerInfo
     */
    public BillingInfo toEntity(BillingInfoDto billingInfoDto, TravelerInfo travelerInfo){
        BillingInfo billingInfo= new BillingInfo();
        billingInfo.setCity(billingInfoDto.getCity());
        billingInfo.setId(billingInfoDto.getId());
        billingInfo.setCountry(billingInfoDto.getCountry());
        billingInfo.setFirstName(billingInfoDto.getFirstName());
        billingInfo.setLastName(billingInfoDto.getLastName());
        billingInfo.setMiddleName(billingInfoDto.getMiddleName());
        billingInfo.setMailingAddress1(billingInfoDto.getMailingAddress1());
        billingInfo.setMailingAddress2(billingInfoDto.getMailingAddress2());
        billingInfo.setZip(billingInfoDto.getZip());
        billingInfo.setState(billingInfoDto.getState());
        billingInfo.setTravelerInfo(travelerInfo);
        return billingInfo;
    }
}
