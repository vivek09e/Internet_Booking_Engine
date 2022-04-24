package com.ibs.backend.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "traveler_info")
public class TravelerInfo {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Integer id;

    @Column(name = "phone")
    private String phone;

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "middleName")
    private String middleName;

    @Column(name = "emailId")
    private String emailId;

    @Column(name = "phoneCode")
    private String phoneCode;

    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "bookingId",referencedColumnName = "id")
    private Booking booking;

    @OneToOne(mappedBy = "travelerInfo")
    private BillingInfo billingInfo;

}
