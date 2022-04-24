package com.ibs.backend.entityDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DateRoomTypeCountDto {
    private String roomType;
    private Integer roomCount;
    private Integer nightRate;

    public void updateCount() {
        this.roomCount += 1;
    }

    public void updateNightRate(Integer rate) {
        this.nightRate = Math.min(this.nightRate, rate);
    }
}
