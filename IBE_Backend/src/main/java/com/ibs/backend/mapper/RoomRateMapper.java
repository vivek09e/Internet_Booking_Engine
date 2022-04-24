package com.ibs.backend.mapper;

import com.ibs.backend.entityDto.RoomRate;
import com.ibs.backend.entityDto.RoomRatesEntity;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class RoomRateMapper {

    public TreeMap<String, Integer> fromData(List<RoomRatesEntity> data) {
        TreeMap<String, Integer> result = new TreeMap<>();
        for (int i = 0; i < data.size(); i++) {
            List<RoomRate> tempRoomRateList = data.get(i).getRoomRate();
            for (int j = 0; j < tempRoomRateList.size(); j++) {
                RoomRate roomRate = tempRoomRateList.get(j);
                if (result.containsKey(tempRoomRateList.get(j).getDate())) {
                    result.put(roomRate.getDate(),
                            (Integer) Math.min(result.get(roomRate.getDate()), roomRate.getRoomRate()));
                } else
                    result.put(roomRate.getDate(), roomRate.getRoomRate());
            }
        }

        return result;
    }
}
