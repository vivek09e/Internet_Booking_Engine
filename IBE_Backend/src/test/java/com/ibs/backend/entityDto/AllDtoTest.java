package com.ibs.backend.entityDto;

import com.ibs.backend.entity.Image;
import com.ibs.backend.repository.ImageRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class AllDtoTest {

    @Test
    public void testAmenitiesDto() {
        AmenitiesDto amenitiesDto1 = new AmenitiesDto("1", "AC", "Air Conditioner");
        AmenitiesDto amenitiesDto2 = new AmenitiesDto("1", "AC", "Air Conditioner");
        assertEquals(amenitiesDto1.equals(amenitiesDto2), true);
        assertEquals(amenitiesDto1.toString().equals(amenitiesDto2.toString()), true);

    }

    @Test
    public void testBillingInfoDto() {
        BillingInfoDto billingInfoDto1 = new BillingInfoDto(1, "Adam", "William","Mitch",
                "address1", "address2", "USA",
                "cal", "nav", "221");
        BillingInfoDto billingInfoDto2 = new BillingInfoDto(1, "Adam", "William","Mitch",
                "address1", "address2", "USA",
                "cal", "nav", "221");
        assertEquals(billingInfoDto1.equals(billingInfoDto1), true);
        assertEquals(billingInfoDto1.toString().equals(billingInfoDto2.toString()), true);
    }

    @Test
    public void testDateRoomTypeCountDto() {
        DateRoomTypeCountDto dateRoomTypeCountDto1 = new DateRoomTypeCountDto("33", 10, 120);
        DateRoomTypeCountDto dateRoomTypeCountDto2 = new DateRoomTypeCountDto("33", 10, 120);
        assertEquals(dateRoomTypeCountDto1.getRoomType() == dateRoomTypeCountDto2.getRoomType(), true);
        dateRoomTypeCountDto1.updateCount();
        assertEquals(dateRoomTypeCountDto1.getRoomCount(), 11);
        dateRoomTypeCountDto1.updateNightRate(110);
        assertEquals(dateRoomTypeCountDto1.getNightRate(), 110);
    }

    @Test
    public void testListRoomTypesDto() {
        RoomAvailable roomAvailable = new RoomAvailable();
        roomAvailable.setRoomID(1);
        roomAvailable.setDate("12-03-2022");
        RoomDto roomDto = new RoomDto();
        List<RoomAvailable> roomAvailables = new ArrayList<>();
        roomAvailables.add(roomAvailable);
        roomDto.setRoomsAvailable(roomAvailables);
        List<RoomDto> roomDtos = new ArrayList<>();
        roomDtos.add(roomDto);
        RoomRate roomRate = new RoomRate();
        roomRate.setRoomRate(100);
        roomRate.setDate("12-03-2022");
        List<RoomRate> roomRates = new ArrayList<>();
        roomRates.add(roomRate);
        ListRoomTypesDto listRoomTypesDto = new ListRoomTypesDto(1, 321, 4, 1,
                6, 1, "DELUX", roomRates, roomDtos);
        ListRoomWrapper listRoomWrapper = new ListRoomWrapper();
        List<ListRoomTypesDto> listRoomTypesDtos = new ArrayList<>();
        listRoomTypesDtos.add(listRoomTypesDto);
        listRoomWrapper.setListRoomTypesDtos(listRoomTypesDtos);

        assertEquals(listRoomWrapper.getListRoomTypesDtos().get(0).getNoDoubleBed() == 4, true);
        assertEquals(listRoomTypesDto.getRoomDto().equals(roomDtos), true);
        assertEquals(listRoomTypesDto.getRoomTypeName(), "DELUX");
        assertEquals(listRoomTypesDto.getAreaSquareFt(), 321);
        assertEquals(listRoomTypesDto.getMaxCapacity(), 6);
        assertEquals(listRoomTypesDto.getRoomTypeId(), 1);
        assertEquals(listRoomTypesDto.getRoomRatesEntity().equals(roomRates), true);
        assertEquals(listRoomTypesDto.getPropertyId(), 1);
    }

    @Test
    public void testRoomTypeDataDto() {
        RoomTypeDataDto roomTypeDataDto = new RoomTypeDataDto();
        roomTypeDataDto.setRoomTypeName("Delux");
        roomTypeDataDto.setRoomTypeId(33);
        roomTypeDataDto.setNoSingleBed(3);
        roomTypeDataDto.setNoDoubleBed(6);
        roomTypeDataDto.setPropertyId(1);
        roomTypeDataDto.setMaxCapacity(5);
        roomTypeDataDto.setAreaSquareFt(410);
        DateRoomTypeCountDto dateRoomTypeCountDto = new DateRoomTypeCountDto();
        dateRoomTypeCountDto.setRoomType("Deluxe");
        dateRoomTypeCountDto.setRoomCount(22);
        dateRoomTypeCountDto.setNightRate(200);
        HashMap<String, DateRoomTypeCountDto> dateRoomTypeCountDtoHashMap = new HashMap<>();
        dateRoomTypeCountDtoHashMap.put("12-03-2022", dateRoomTypeCountDto);
        roomTypeDataDto.setPriceCountData(dateRoomTypeCountDtoHashMap);
        assertEquals(roomTypeDataDto.getRoomTypeId(), 33);
        assertEquals(roomTypeDataDto.getRoomTypeName(), "Delux");
        assertEquals(roomTypeDataDto.getMaxCapacity(), 5);
        assertEquals(roomTypeDataDto.getPropertyId(), 1);
        assertEquals(roomTypeDataDto.getNoDoubleBed(), 6);
        assertEquals(roomTypeDataDto.getNoSingleBed(), 3);
        assertEquals(roomTypeDataDto.getAreaSquareFt(), 410);
        assertEquals(roomTypeDataDto.getPriceCountData().size(), 1);
    }

    @Test
    public void testRoomTypeGraphDto() {
        RoomTypeGraphDto roomTypeGraphDto = new RoomTypeGraphDto();
        List<String> amenities = new ArrayList<>();
        DateWisePrice dateWisePrice = new DateWisePrice();
        dateWisePrice.setPrice(33);
        dateWisePrice.setDate("12-02-2022");
        List<DateWisePrice> dateWisePrices = new ArrayList<>();
        dateWisePrices.add(dateWisePrice);
        amenities.add("AC");
        roomTypeGraphDto.setRoomTypeId(1);
        assertEquals(roomTypeGraphDto.getRoomTypeId(), 1);
        roomTypeGraphDto.setRoomTypeName("Deluxe");
        assertEquals(roomTypeGraphDto.getRoomTypeName(), "Deluxe");
        roomTypeGraphDto.setAreaInSquareFeet(410);
        assertEquals(roomTypeGraphDto.getAreaInSquareFeet(), 410);
        roomTypeGraphDto.setNoOfDoubleBed(3);
        assertEquals(roomTypeGraphDto.getNoOfDoubleBed(), 3);
        roomTypeGraphDto.setNoOfSingleBed(1);
        assertEquals(roomTypeGraphDto.getNoOfSingleBed(), 1);
        roomTypeGraphDto.setMaxCapacity(5);
        assertEquals(roomTypeGraphDto.getMaxCapacity(), 5);
        roomTypeGraphDto.setPropertyId(1);
        assertEquals(roomTypeGraphDto.getPropertyId(), 1);
        roomTypeGraphDto.setCountOfRoomAvailable(2);
        assertEquals(roomTypeGraphDto.getCountOfRoomAvailable(), 2);
        roomTypeGraphDto.setBasicNightlyRate(30);
        assertEquals(roomTypeGraphDto.getBasicNightlyRate(), 30);
        roomTypeGraphDto.setLowResolutionImage("LOW");
        assertEquals(roomTypeGraphDto.getLowResolutionImage(), "LOW");
        roomTypeGraphDto.setRoomTypeDescription("BIG");
        assertEquals(roomTypeGraphDto.getRoomTypeDescription(), "BIG");
        roomTypeGraphDto.setOccupancyTax(30.0);
        assertEquals(roomTypeGraphDto.getOccupancyTax(), 30.0);
        roomTypeGraphDto.setFlag(false);
        assertEquals(!roomTypeGraphDto.getFlag(), true);
        roomTypeGraphDto.setPropertyTax(79.0);
        assertEquals(roomTypeGraphDto.getPropertyTax(), 79.0);
        roomTypeGraphDto.setAmenities(amenities);
        assertEquals(roomTypeGraphDto.getAmenities().get(0), "AC");
        roomTypeGraphDto.setDateWisePrices(dateWisePrices);
        assertEquals(roomTypeGraphDto.getDateWisePrices().get(0).getPrice(), 33);
    }
}