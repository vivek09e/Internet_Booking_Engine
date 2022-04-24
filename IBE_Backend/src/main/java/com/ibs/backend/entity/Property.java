package com.ibs.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name = "property")
public class Property {
    @Id
    @Column(name = "id")
    private String id;

    @ManyToOne
    @JoinColumn(name = "tenant_id", referencedColumnName = "id")
    private Tenant tenant;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "number")
    private String number;

    @Column(name = "propertyTax")
    private double propertyTax;

    @Column(name="call_timing")
    private String callTiming;

    @OneToMany(mappedBy = "property")
    List<RoomType> roomTypeList;

    @OneToMany(mappedBy = "property")
    List<PromoCode> promoCodes;

    @OneToMany(mappedBy = "property")
    private List<Booking> booking;
}
