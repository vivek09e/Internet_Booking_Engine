package com.ibs.backend.utilities;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Locale;
import java.time.temporal.ChronoUnit;

public class DateFormatter {
    /**
     * @param inputFormat String that is a date in format of
     *                    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"
     * @return String that is a date in format of "dd-MM-yyyy"
     */
    public static String dateConverter(String inputFormat) {
        DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.ENGLISH);
        DateTimeFormatter op = DateTimeFormatter.ofPattern("dd-MM-yyyy", Locale.ENGLISH);
        LocalDate localDate = LocalDate.parse(inputFormat, formatter1);
        return op.format(localDate);
    }

    public static long difference(String startDate,String toDate){
        DateTimeFormatter op = DateTimeFormatter.ofPattern("dd-MM-yyyy", Locale.ENGLISH);
        LocalDate date1 = LocalDate.parse(startDate, op);
        LocalDate date2 = LocalDate.parse(toDate, op);
        return  ChronoUnit.DAYS.between(date1, date2);
    }
}
