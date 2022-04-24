package com.ibs.backend.mapper;

import com.ibs.backend.entity.Guest;
import com.ibs.backend.entityDto.GuestDto;

public class GuestInfoMapper {

    public GuestDto fromEntity(Guest guest)
    {
        GuestDto guestDto = new GuestDto();
        guestDto.setGuestName(guest.getGuestName());
        guestDto.setId(guest.getId());
        return guestDto;
    }
}
