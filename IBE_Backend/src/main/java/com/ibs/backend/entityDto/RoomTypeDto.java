package com.ibs.backend.entityDto;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class RoomTypeDto implements Serializable {
    private String id;
    private String name;
    private Double roomOccupancyTax;
    private Double propertyTax;
    private String description;
    private List<String> amenities;
    private String imageUrl;
}
