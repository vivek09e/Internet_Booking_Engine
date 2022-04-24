package com.ibs.backend.entityDto;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class PropertyDto implements Serializable {
    private String id;
    private String tenant_id;
    private String name;
    private String address;
    private String number;
    private double propertyTax;
    private String callTiming;
}
