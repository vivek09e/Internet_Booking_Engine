package com.ibs.backend.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "tenantRoomGuestLimit")
public class TenantRoomGuestLimit {

    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "LimitName")
    private String name;

    @Column(name = "value")
    private Integer value;

    @ManyToOne
    @JoinColumn(name = "tenant_id", referencedColumnName = "id")
    private Tenant tenant;
}
