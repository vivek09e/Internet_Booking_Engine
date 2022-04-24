package com.ibs.backend.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "languages")
@Data
public class Languages {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "language")
    private String language;

    @Column(name = "currency")
    private String currency;

    @ManyToMany(mappedBy = "languagesList")
    private List<Tenant> tenantList;
}
