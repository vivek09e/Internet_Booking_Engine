package com.ibs.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "filterTenantAssociation")
@Data
public class FilterTenantAssociation {

    @Id
    @Column(name = "Id")
    private Long id;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "filterFk", referencedColumnName = "id")
    private Filters filters;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "tenantFk", referencedColumnName = "id")
    private Tenant tenant;

    @Column(name = "flag")
    private Boolean flag;
}
