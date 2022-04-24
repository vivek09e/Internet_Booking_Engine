package com.ibs.backend.entityDto;

import lombok.Data;

import java.io.Serializable;

@Data
public class TenantRoomGuestLimitDto implements Serializable {
    private Integer id;
    private String name;
    private Integer value;
}
