package com.ibs.backend.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name = "promotions")
public class Promotions {
    @Id
    @Column
    private String id;

    @Column(name = "is_deactivated")
    private boolean isDeactivated;

    @Column(name = "minimum_days_of_stay")
    private Integer minimumDaysOfStay;

    @Column(name = "price_factor")
    private Double priceFactor;

    @Column(name = "promo_description")
    private String promoDescription;

    @Column(name="category")
    private String category;

    @Column(name="promotion_title")
    private String promotionTitle;

    @Column(name="minimum_rooms")
    private Integer minimumRooms;

    @ManyToOne
    @JoinColumn(name = "tenant_id", referencedColumnName = "id")
    private Tenant tenant;

    @OneToMany(mappedBy = "promotions")
    private List<Booking> bookings;
}
