package com.ibs.backend.mapper;

import com.ibs.backend.entity.Booking;
import com.ibs.backend.entity.Promotions;
import com.ibs.backend.entityDto.BookingDto;
import com.ibs.backend.repository.GuestRepository;
import com.ibs.backend.repository.PropertyRepository;
import com.ibs.backend.repository.RoomTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BookingInfoMapper {
    @Autowired
    PropertyRepository propertyRepository;

    @Autowired
    RoomTypeRepository roomTypeRepository;

    @Autowired
    GuestRepository guestRepository;

    public BookingDto fromEntity(Booking booking)
    {
        BookingDto bookingDto = new BookingDto();
        bookingDto.setId(booking.getId());
        bookingDto.setAdultCount(booking.getAdultCount());
        bookingDto.setCheckInDate(booking.getCheckInDate());
        bookingDto.setCheckOutDate(booking.getCheckOutDate());
        bookingDto.setStatusId(booking.getStatusId());
        bookingDto.setChildCount(booking.getChildCount());
        bookingDto.setTotalCost(booking.getTotalCost());
        bookingDto.setAmountDueAtResort(booking.getAmountDueAtResort());
        bookingDto.setGuestId(booking.getGuest().getId());
        bookingDto.setRoomTypeID(Integer.parseInt(booking.getRoomType().getId()));
        bookingDto.setNumberOfRoom(booking.getNumberRoom());
        bookingDto.setPromotionName(booking.getPromotionName());
        bookingDto.setPropertyId(Integer.parseInt(booking.getProperty().getId()));
        bookingDto.setBasicNightlyRate(booking.getBasicNightlyRate());
        bookingDto.setPromoType(booking.getPromoType());
        return bookingDto;
    }
    public Booking toEntity(BookingDto bookingDto){
        Booking booking= new Booking();
        booking.setAdultCount(bookingDto.getAdultCount());
        booking.setCheckInDate(bookingDto.getCheckInDate());
        booking.setCheckOutDate(bookingDto.getCheckOutDate());
        booking.setId(bookingDto.getId());
        booking.setTotalCost(bookingDto.getTotalCost());
        booking.setAmountDueAtResort(bookingDto.getAmountDueAtResort());
        booking.setChildCount(bookingDto.getChildCount());
        booking.setStatusId(bookingDto.getStatusId());
        booking.setProperty(propertyRepository.getById(bookingDto.getPropertyId().toString()));
        booking.setRoomType(roomTypeRepository.getById(bookingDto.getRoomTypeID().toString()));
        booking.setPromotionName(bookingDto.getPromotionName());
        booking.setGuest(guestRepository.getById(bookingDto.getGuestId()));
        booking.setNumberRoom(bookingDto.getNumberOfRoom());
        booking.setBasicNightlyRate(bookingDto.getBasicNightlyRate());
        booking.setPromoType(bookingDto.getPromoType());
        return booking;
    }


}
