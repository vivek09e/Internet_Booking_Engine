package com.ibs.backend.service.travelerinfo;


import com.ibs.backend.entityDto.BookingGuestDto;
import com.ibs.backend.entityDto.ConfirmationPageDto;
import com.ibs.backend.entityDto.TravelerInfoDto;
import com.ibs.backend.entityDto.TravelerPayBookingDto;

public interface TravelerInfoService {
    /**
     * @param travelerPayBookingDto object that contains all the info of the traveler that
     *                        will be inserted in the DB.
     * @return if the Traveler is added will return the same object.
     */
    BookingGuestDto addTraveler(TravelerPayBookingDto travelerPayBookingDto);

    BookingGuestDto cancelBooking(BookingGuestDto bookingGuestDto);

    ConfirmationPageDto getTravelerInfoFromBookingId(Integer bookingId);


}
