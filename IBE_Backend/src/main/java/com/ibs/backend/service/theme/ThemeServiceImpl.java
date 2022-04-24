package com.ibs.backend.service.theme;

import com.ibs.backend.entityDto.ThemeDto;
import com.ibs.backend.mapper.ThemeMapper;
import com.ibs.backend.repository.ThemeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ThemeServiceImpl implements ThemeService {

    @Autowired
    private ThemeRepository themeRepository;

    @Autowired
    private ThemeMapper themeMapper;

    @Override
    public ThemeDto getThemeByTenantId(String id) {

        return themeMapper.fromEntity(themeRepository.findByTenantId(id));
    }
}
