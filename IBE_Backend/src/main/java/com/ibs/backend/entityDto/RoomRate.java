package com.ibs.backend.entityDto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ibs.backend.utilities.DateFormatter;
import lombok.Data;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.Date;
import java.util.Locale;
import java.util.Map;

@Data
public class RoomRate {
    private Integer roomRate;

    private String date;

    @JsonProperty("room_rate")
    private void createData(Map<String, Object> object) {
        this.roomRate = (Integer) object.get("basic_nightly_rate");
        String date = (String) object.get("date");
        this.date = DateFormatter.dateConverter(date);

    }

}
