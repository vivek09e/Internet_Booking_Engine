package com.ibs.backend.service.theme;

import com.ibs.backend.entityDto.ThemeDto;

public interface ThemeService {

    /**
     * @param id of A Tenant for which we need to find the theme details
     * @return a ThemeDto that contains all the details of the theme of the given
     *         tenant.
     */
    ThemeDto getThemeByTenantId(String id);
}
