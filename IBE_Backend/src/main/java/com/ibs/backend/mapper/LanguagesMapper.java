package com.ibs.backend.mapper;

import com.ibs.backend.entity.Languages;
import com.ibs.backend.entityDto.LanguagesDto;
import org.springframework.stereotype.Component;

@Component
public class LanguagesMapper {

    public LanguagesDto fromEntity(Languages languages) {
        LanguagesDto languagesDto = new LanguagesDto();
        languagesDto.setLanguage(languages.getLanguage());
        languagesDto.setId(languages.getId());
        languagesDto.setCurrency(languages.getCurrency());
        return languagesDto;
    }

    public Languages toEntity(LanguagesDto languagesDto) {
        Languages languages = new Languages();
        languages.setLanguage(languagesDto.getLanguage());
        languages.setId(languagesDto.getId());
        languages.setCurrency(languagesDto.getCurrency());
        return languages;
    }

    public String language(Languages languages) {
        return languages.getLanguage();
    }

    public String currency(Languages languages) {
        return languages.getCurrency();
    }
}
