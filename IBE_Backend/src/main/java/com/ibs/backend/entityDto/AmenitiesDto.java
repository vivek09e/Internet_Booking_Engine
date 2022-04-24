package com.ibs.backend.entityDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AmenitiesDto implements Serializable {
    private String Id;
    private String name;
    private String description;
}
