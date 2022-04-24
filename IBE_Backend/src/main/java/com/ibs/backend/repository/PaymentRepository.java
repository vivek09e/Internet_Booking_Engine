package com.ibs.backend.repository;

import com.ibs.backend.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {

    Payment findByBookingId(Integer bookingId);
}