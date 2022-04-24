package com.ibs.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Generated;

import javax.persistence.*;
import java.util.Currency;
import java.util.List;

@Entity
@Data
@Table(name = "tenant")
public class Tenant {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "contactInfo")
    private String contactInfo;

    @JsonIgnore
    @OneToOne(mappedBy = "tenant")
    private Theme theme;

    @JsonIgnore
    @OneToMany(mappedBy = "tenant")
    private List<Property> properties;

    @JsonIgnore
    @OneToMany(mappedBy = "tenant")
    private List<FilterTenantAssociation> filters;

    @JsonIgnore
    @ManyToMany(mappedBy = "tenantList")
    private List<AddOns> addOns;

    @ManyToMany
    @JoinColumn(name = "language_id", referencedColumnName = "id")
    private List<Languages> languagesList;

    @OneToMany(mappedBy = "tenant")
    private List<TenantRoomGuestLimit> tenantRoomGuestLimit;

    @OneToMany(mappedBy = "tenant")
    private List<Promotions> promotions;

    @OneToMany(mappedBy = "tenant")
    private List<PromoCode> promoCodes;


}
