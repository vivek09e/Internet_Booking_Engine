package com.ibs.backend.service.tenant;

import com.ibs.backend.entityDto.TenantCustomizableDto;
import com.ibs.backend.entityDto.TenantDto;

import java.util.List;
import java.util.Optional;

public interface TenantService {
    /**
     * @return a List of TenantCustomizableDto that contains all the details for
     *         customize the tenant site
     *         for all tenant.
     */
    List<TenantCustomizableDto> getAllTenant();

    /**
     * @param tenantDto that contains all the details of the new tenant that is need
     *                  to be inserted
     * @return after successfully adding the tenant in the database return the same
     *         TenantDto.
     */
    TenantDto addTenant(TenantDto tenantDto);

    /**
     * @param id of the tenant for which we have to find the all the details for
     *           customize the tenant site.
     * @return a TenantCustomizableDto that contains all the details for customize
     *         the tenant site
     */
    Optional<TenantCustomizableDto> getTenantById(String id);
}
