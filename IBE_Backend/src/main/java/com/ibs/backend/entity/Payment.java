package com.ibs.backend.entity;

import lombok.Data;

import javax.persistence.*;

@Table(name="Payment")
@Entity
@Data
public class Payment {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Integer id;

    @Column(name = "cardNumber")
    private String cardNumber;

    @Column(name = "expiryMonth")
    private Integer payExpiryMM;

    @Column(name="expiryYear")
    private Integer payExpiryYY;

    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "guest_id",referencedColumnName = "id")
    private Guest guest;

    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "booking_id",referencedColumnName = "id")
    private Booking booking;


}
