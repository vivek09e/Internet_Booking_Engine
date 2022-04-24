package com.ibs.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name="booking")
public class Booking {
    @Id
    @Column(name="id")
    private Integer id;

    @Column(name="adult_count")
    private Integer adultCount;

    @Column(name="amount_due_at_resort")
    private Integer amountDueAtResort;

    @Column(name="check_in_date")
    private String checkInDate;

    @Column(name="check_out_date")
    private String checkOutDate;

    @Column(name="child_count")
    private Integer childCount;

    @Column(name="status_id")
    private Integer statusId;

    @Column(name="total_cost")
    private Integer totalCost;

    @Column(name = "numberOfRooms")
    private Integer numberRoom;

    @ManyToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "guest_id", referencedColumnName = "id")
    private Guest guest;

    @OneToOne
    @JoinColumn(name="property_id", referencedColumnName = "id")
    private Property property;

    @ManyToOne
    @JoinColumn(name = "promotion_id",referencedColumnName = "id")
    private Promotions promotions;

    @ManyToOne
    @JoinColumn(name = "roomTypeId",referencedColumnName = "id")
    private RoomType roomType;

    @JsonIgnore
    @OneToOne(mappedBy = "booking")
    private Review review;

    @Column(name = "promotionName")
    private String promotionName;

    @Column(name ="basicNightlyRate")
    private Integer basicNightlyRate;

    @Column(name = "promoType")
    private String promoType;

}
