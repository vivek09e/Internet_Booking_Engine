package com.ibs.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "RoomType_Amenities")
public class RoomTypeAmenitiesAssociation {
    @Id
    @Column(name = "Id")
    private Integer id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "RoomTypeFk",referencedColumnName = "id")
    private RoomType roomType;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "AmenitiesFk",referencedColumnName = "id")
    private Amenities amenities;
}
