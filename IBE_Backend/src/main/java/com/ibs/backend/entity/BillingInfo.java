package com.ibs.backend.entity;

import lombok.Data;

import javax.persistence.*;
import java.lang.annotation.Target;

@Entity
@Data
@Table(name = "billingInfo")
public class BillingInfo {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Integer id;

    @OneToOne
    @JoinColumn(name = "traveler_id", referencedColumnName = "id")
    private TravelerInfo travelerInfo;

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "middleName")
    private String middleName;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "mailingAddress1")
    private String mailingAddress1;

    @Column(name = "mailingAddress2")
    private String mailingAddress2;

    @Column(name = "country")
    private String country;

    @Column(name = "state")
    private String state;

    @Column(name = "city")
    private String city;

    @Column(name = "zip")
    private String zip;

}
