package com.ibs.backend.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "Review")
@Data
public class Review {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long reviewId;

    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "booking_ID",referencedColumnName = "id")
    private Booking booking;

    @Column(name="overAllRating")
    private Integer overAllRating;

    @Column(name="facilitiesRating")
    private Integer facilitiesRating;
    @Column(name = "cleanlinessRating")
    private Integer cleanlinessRating;
    @Column(name = "amenitiesRating")
    private Integer amenitiesRating;
    @Column(name = "roomComfortAndQualityRating")
    private Integer roomComfortAndQualityRating;
    @Column(name = "serviceRating")
    private Integer serviceRating;
    @Column(name = "valueForMoneyRating")
    private Integer valueForMoneyRating;
    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "roomType_ID",referencedColumnName = "id")
    private RoomType roomType;
    @Column(name = "checkOutDate")
    private LocalDate checkOutDate;
    @Column(name = "emailSent")
    private Boolean emailSent;

    @Column(name = "guestComment")
    private String guestComment;

    @Column(name = "emailOfTraveler")
    private String emailOfTraveler;

    @Column(name = "includeFlag")
    private Boolean includeFlag;


}
