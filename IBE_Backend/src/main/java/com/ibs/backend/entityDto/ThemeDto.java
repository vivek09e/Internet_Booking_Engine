package com.ibs.backend.entityDto;

import lombok.Data;

import java.io.Serializable;

@Data
public class ThemeDto implements Serializable {
    private String id;
    private String primaryColor;
    private String secondaryColor;
    private String s3LogoUrl;
    private String s3TenantImage;
    private String tenant_id;
    private Integer roomLimit;
}
