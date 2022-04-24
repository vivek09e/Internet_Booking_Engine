package com.ibs.backend.service.property;

import com.ibs.backend.entityDto.PropertyDto;
import com.ibs.backend.mapper.PropertyMapper;
import com.ibs.backend.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PropertyServiceImpl implements PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private PropertyMapper propertyMapper;

    @Override
    public List<PropertyDto> getAllPropertyByTenantId(String id) {
        return propertyRepository.findByTenantId(id)
                .stream().map(propertyMapper::fromEntity)
                .collect(Collectors.toList());

    }

    @Override
    public PropertyDto getPropertyById(String id) {
        return propertyMapper.fromEntity(propertyRepository.getById(id));
    }
}
