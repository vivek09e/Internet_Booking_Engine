package com.ibs.backend.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "addons")
public class AddOns {
    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "Page")
    private String page;

    @ManyToMany
    @JoinColumn(name = "tenant_id", referencedColumnName = "id")
    private List<Tenant> tenantList;
}
