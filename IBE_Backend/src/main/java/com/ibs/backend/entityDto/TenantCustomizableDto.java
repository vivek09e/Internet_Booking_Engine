package com.ibs.backend.entityDto;

import lombok.Data;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;

@Data
public class TenantCustomizableDto implements Serializable {
    private String id;
    private String name;
    private List<String> languagesList;
    private List<String> currency;
    private HashMap<String, Boolean> filters;
}
