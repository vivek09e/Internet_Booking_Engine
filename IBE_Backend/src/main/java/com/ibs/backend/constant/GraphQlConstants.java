package com.ibs.backend.constant;

public interface GraphQlConstants {
    /**
     * Query that will fetch all the roomRate.
     */
    String allRoomRate = "query MyQuery { listRoomTypes(where: " +
            "{property_of: {property_id: {equals: 1}, room_availability: " +
            "{some: {booking_id: {equals: 0}}}, booking: {}}}) " +
            "{room_rates " +
            "{     " +
            "room_rate " +
            "{     " +
            "basic_nightly_rate   " +
            "date }}}}";
    /**
     * Query that will fetch all the roomType details for all the room available
     */
    String getRoomDetails = "query MyQuery {\n" +
            "  listRoomTypes(where: {property_id: {equals: 1}, property_of: {tenant_id: {equals: 1}, booking: {some: {booking_id: {equals: 0}}}}}) {\n"
            +
            "    room_type_id\n" +
            "    area_in_square_feet\n" +
            "    double_bed\n" +
            "    single_bed\n" +
            "    max_capacity\n" +
            "    property_id\n" +
            "    room_type_name\n" +
            "    room_rates{\n" +
            "      room_rate{\n" +
            "        date\n" +
            "        basic_nightly_rate\n" +
            "      }\n" +
            "    }\n" +
            "    room {\n" +
            "      room_available {\n" +
            "        date\n" +
            "        room_id\n" +
            "        availability_id\n"+
            "      }\n" +
            "    }\n" +
            "    \n" +
            "  }\n" +
            "}\n";
    /**
     * Query that will fetch all the promotions from the GraphQl.
     */
    String getAllPromotions = "query MyQuery {\n" +
            "  listPromotions {\n" +
            "    is_deactivated\n" +
            "    minimum_days_of_stay\n" +
            "    price_factor\n" +
            "    promotion_description\n" +
            "    promotion_id\n" +
            "    promotion_title\n" +
            "  }\n" +
            "}\n";
}
