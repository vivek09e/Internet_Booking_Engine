package com.ibs.backend.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name = "room_type")
public class RoomType {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "roomOccupancyTax")
    private Double roomOccupancyTax;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "property_id", referencedColumnName = "id")
    private Property property;

    @OneToMany(mappedBy = "roomType")
    private List<Image> imageList;

    @OneToMany(mappedBy = "roomType")
    private List<RoomTypeAmenitiesAssociation> roomTypeAmenitiesAssociations;

    @OneToMany(mappedBy = "roomType")
    private List<Review> reviews;

    @OneToMany(mappedBy = "roomType")
    private List<Booking> bookings;
}
