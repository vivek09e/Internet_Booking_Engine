package com.ibs.backend.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Table(name="guest")
public class Guest {
    @Id
    @Column(name = "id")
    private Integer id;

    @Column(name = "guest_name")
    private String guestName;

    @Column(name = "guest_email")
    private String guestEmail;

    @OneToMany(mappedBy = "guest")
    private List<Booking> bookings;
}
