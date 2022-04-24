package com.ibs.backend.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "amenities")
public class Amenities {

    @Id
    @Column(name = "id")
    private String Id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "amenities")
    List<RoomTypeAmenitiesAssociation> roomTypeAmenitiesAssociations;


}
