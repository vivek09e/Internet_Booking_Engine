package com.ibs.backend.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "filters")
public class Filters {
    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "filters")
    private List<FilterTenantAssociation> filterTenantAssociations;

}
