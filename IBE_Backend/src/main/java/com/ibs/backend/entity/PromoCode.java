package com.ibs.backend.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "PromoCode")
public class PromoCode {
    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "code")
    private String code;

    @Column(name = "minStay")
    private Integer minStay;

    @Column(name = "priceFactor")
    private Double priceFactor;

    @ManyToOne
    @JoinColumn(name = "tenant_id",referencedColumnName = "id")
    private Tenant tenant;

    @ManyToOne
    @JoinColumn(name = "property_id",referencedColumnName = "id")
    private Property property;

    @Column(name = "minAmount")
    private Double minAmount;

    @Column(name = "maxDiscountAmount")
    private Double maxDiscountAmount;

    @Column(name = "expiryDate")
    private String expiryDate;

}
