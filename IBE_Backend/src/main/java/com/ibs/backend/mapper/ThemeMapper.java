package com.ibs.backend.mapper;

import com.ibs.backend.entity.Theme;
import com.ibs.backend.entityDto.ThemeDto;
import org.springframework.stereotype.Component;

@Component
public class ThemeMapper {

    public ThemeDto fromEntity(Theme theme) {
        ThemeDto themeDto = new ThemeDto();
        themeDto.setId(theme.getId());
        themeDto.setPrimaryColor(theme.getPrimaryColor());
        themeDto.setS3LogoUrl(theme.getS3LogoUrl());
        themeDto.setTenant_id(theme.getTenant().getId());
        themeDto.setSecondaryColor(theme.getSecondaryColor());
        themeDto.setS3TenantImage(theme.getS3TenantImage());

        return themeDto;
    }
}
