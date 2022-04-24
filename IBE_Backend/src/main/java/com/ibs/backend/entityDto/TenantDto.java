package com.ibs.backend.entityDto;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class TenantDto implements Serializable {
    private String id;
    private String contactInfo;
    private String name;
    private List<LanguagesDto> languagesList;
}
