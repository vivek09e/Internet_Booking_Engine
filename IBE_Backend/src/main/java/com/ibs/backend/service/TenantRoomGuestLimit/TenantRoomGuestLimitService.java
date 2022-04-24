package com.ibs.backend.service.TenantRoomGuestLimit;

import com.ibs.backend.entityDto.TenantRoomGuestLimitDto;

import java.util.HashMap;
import java.util.List;

public interface TenantRoomGuestLimitService {

    /**
     * @param id of the tenant for which we need to find the Limits.
     * @return A list of TenantRoomGuestLimitDto that contains all the limit that
     *         specific tenant have
     *         set for their site.
     */
    List<TenantRoomGuestLimitDto> getByTenantId(String id);

    /**
     * @param id of the tenant for which we need to find the Limits.
     * @return A hashMap that contains all the limit name as Key and value of limit
     *         as value of
     *         the particular tenant.
     */
    HashMap<String, Integer> getLimits(String id);
}
