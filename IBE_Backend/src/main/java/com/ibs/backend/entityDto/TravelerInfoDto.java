package com.ibs.backend.entityDto;

import lombok.Data;

import java.io.Serializable;

@Data
public class TravelerInfoDto implements Serializable {
    private Integer id;
    private String phone;
    private String firstName;
    private String lastName;
    private String middleName;
    private String emailId;
    private String phoneCode;
    private Integer bookingId;
    private BillingInfoDto billingInfo;
}
