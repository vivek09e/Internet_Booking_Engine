package com.ibs.backend.service.TenantRoomGuestLimit;

import com.ibs.backend.entityDto.TenantRoomGuestLimitDto;
import com.ibs.backend.mapper.TenantRoomGuestLimitMapper;
import com.ibs.backend.repository.TenantRoomGuestLimitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class TenantRoomGuestLimitServiceImpl implements TenantRoomGuestLimitService {

    @Autowired
    TenantRoomGuestLimitRepository tenantRoomGuestLimitRepository;

    @Autowired
    TenantRoomGuestLimitMapper tenantRoomGuestLimitMapper;

    @Override
    public List<TenantRoomGuestLimitDto> getByTenantId(String id) {
        return tenantRoomGuestLimitRepository.findByTenantId(id)
                .stream().map(tenantRoomGuestLimitMapper::fromEntity)
                .collect(Collectors.toList());
    }

    @Override
    public HashMap<String, Integer> getLimits(String id) {
        List<TenantRoomGuestLimitDto> temp = getByTenantId(id);
        HashMap<String, Integer> hashMap = new HashMap<>();
        for (TenantRoomGuestLimitDto tenantRoomGuestLimitDto : temp) {
            hashMap.put(tenantRoomGuestLimitDto.getName(), tenantRoomGuestLimitDto.getValue());
        }
        return hashMap;
    }
}
