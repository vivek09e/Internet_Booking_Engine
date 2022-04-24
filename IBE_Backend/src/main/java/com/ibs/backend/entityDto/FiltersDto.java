package com.ibs.backend.entityDto;

import lombok.Data;

import java.io.Serializable;

@Data
public class FiltersDto implements Serializable {
    private String id;
    private String name;
    private Boolean flag;
}
