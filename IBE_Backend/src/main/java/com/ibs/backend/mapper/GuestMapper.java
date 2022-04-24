package com.ibs.backend.mapper;

import com.ibs.backend.entity.Guest;
import com.ibs.backend.entityDto.GuestDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class GuestMapper {

    @Autowired
    BookingInfoMapper bookingInfoMapper;

    public GuestDto fromEntity(Guest guest){
        GuestDto guestDto= new GuestDto();
        guestDto.setGuestName(guest.getGuestName());
        guestDto.setId(guest.getId());
        guestDto.setGuestEmail(guest.getGuestEmail());
        guestDto.setGuestBookings(guest.getBookings().stream()
                .map(bookingInfoMapper::fromEntity).collect(Collectors.toList()));
        return guestDto;
    }

    public Guest toEntity(GuestDto guestDto){
        Guest guest= new Guest();
        guest.setGuestName(guestDto.getGuestName());
        guest.setId(guestDto.getId());
        guest.setGuestEmail(guestDto.getGuestEmail());
        return guest;
    }
}
