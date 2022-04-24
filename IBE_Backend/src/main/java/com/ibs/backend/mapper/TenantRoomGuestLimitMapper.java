package com.ibs.backend.mapper;

import com.ibs.backend.entity.TenantRoomGuestLimit;
import com.ibs.backend.entityDto.TenantRoomGuestLimitDto;
import org.springframework.stereotype.Component;

@Component
public class TenantRoomGuestLimitMapper {
    public TenantRoomGuestLimitDto fromEntity(TenantRoomGuestLimit tenantRoomGuestLimit) {
        TenantRoomGuestLimitDto tenantRoomGuestLimitDto = new TenantRoomGuestLimitDto();
        tenantRoomGuestLimitDto.setId(tenantRoomGuestLimit.getId());
        tenantRoomGuestLimitDto.setName(tenantRoomGuestLimit.getName());
        tenantRoomGuestLimitDto.setValue(tenantRoomGuestLimit.getValue());
        return tenantRoomGuestLimitDto;

    }
}
