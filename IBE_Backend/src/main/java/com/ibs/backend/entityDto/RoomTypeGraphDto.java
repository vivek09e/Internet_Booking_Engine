package com.ibs.backend.entityDto;

import com.ibs.backend.entity.Image;
import lombok.Data;

import java.util.List;

@Data
public class RoomTypeGraphDto {
    private Integer roomTypeId;
    private String roomTypeName;
    private Integer areaInSquareFeet;
    private Integer noOfDoubleBed;
    private Integer noOfSingleBed;
    private Integer maxCapacity;
    private Integer propertyId;
    private Integer countOfRoomAvailable;
    private Integer basicNightlyRate;
    private String lowResolutionImage;
    private List<Image> roomImages;
    private String roomTypeDescription;
    private Double occupancyTax;
    private Boolean flag = true;
    private List<DateWisePrice> dateWisePrices;
    private Double propertyTax;
    private List<String> amenities;
    private ReviewDto reviewDto;
    private Integer numberOfReview;

}
