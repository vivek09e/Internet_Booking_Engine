package com.ibs.backend.entityDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BillingInfoDto implements Serializable {
    private Integer id;
    private String firstName;
    private String lastName;
    private String middleName;
    private String mailingAddress1;
    private String mailingAddress2;
    private String country;
    private String state;
    private String city;
    private String zip;
}
