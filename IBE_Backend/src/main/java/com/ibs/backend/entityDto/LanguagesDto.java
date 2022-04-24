package com.ibs.backend.entityDto;

import lombok.Data;

import java.io.Serializable;

@Data
public class LanguagesDto implements Serializable {
    private Long id;
    private String language;
    private String currency;
}
