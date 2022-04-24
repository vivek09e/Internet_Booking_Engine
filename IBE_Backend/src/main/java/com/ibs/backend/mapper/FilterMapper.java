package com.ibs.backend.mapper;

import com.ibs.backend.entity.FilterTenantAssociation;
import com.ibs.backend.entity.Filters;
import com.ibs.backend.entityDto.FiltersDto;
import org.springframework.stereotype.Component;

@Component
public class FilterMapper {

    public FiltersDto fromEntity(Filters filters) {
        FiltersDto filtersDto = new FiltersDto();
        filtersDto.setId(filters.getId());
        filtersDto.setName(filters.getName());
        return filtersDto;
    }

    public Filters toEntity(FiltersDto filtersDto) {
        Filters filters = new Filters();
        filters.setId(filtersDto.getId());
        filters.setName(filtersDto.getName());
        return filters;
    }

    public FiltersDto fromAssociationEntity(FilterTenantAssociation association) {
        FiltersDto filtersDto = new FiltersDto();
        filtersDto.setName(association.getFilters().getName());
        filtersDto.setId(association.getFilters().getId());
        filtersDto.setFlag(association.getFlag());

        return filtersDto;
    }
}
