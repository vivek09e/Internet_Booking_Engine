package com.ibs.backend.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "theme")
public class Theme {
    @Id
    @Column(name = "id")
    private String id;

    @OneToOne
    @JoinColumn(name = "tenant_id", referencedColumnName = "id")
    private Tenant tenant;

    @Column(name = "")
    private String primaryColor;

    @Column(name = "")
    private String secondaryColor;

    @Column(name = "")
    private String s3LogoUrl;

    @Column(name = "")
    private String s3TenantImage;
}
