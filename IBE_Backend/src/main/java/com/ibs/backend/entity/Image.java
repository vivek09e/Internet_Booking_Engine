package com.ibs.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.springframework.data.repository.cdi.Eager;

import javax.persistence.*;

@Data
@Entity
@Table(name = "image")
public class Image {

    @Id
    @Column(name = "id")
    private String id;

    @Column(name = "s3Url")
    private String s3Url;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "roomType_id", referencedColumnName = "id")
    private RoomType roomType;

    @Column(name = "imageType")
    private String imageType;

}
