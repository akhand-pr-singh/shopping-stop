import React, { useState, useEffect } from 'react';
import {
  FiltersSection,
  FiltersHeader,
  FiltersTitle,
  ClearFiltersButton,
  FiltersGrid,
  FilterGroup,
  FilterLabel,
  FilterSelect,
  PriceRangeContainer,
  PriceInput,
  PriceSeparator
} from './style';

export const ProductFiltersSection = ({
  filters,
  categories,
  brands,
  onUpdateFilters,
  onClearFilters
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...localFilters, [filterName]: value };
    setLocalFilters(newFilters);
    onUpdateFilters?.(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      rating: '',
      sortBy: 'newest'
    };
    setLocalFilters(clearedFilters);
    onClearFilters?.();
  };

  return (
    <FiltersSection>
      <FiltersHeader>
        <FiltersTitle>Filters</FiltersTitle>
        <ClearFiltersButton onClick={handleClearFilters}>
          Clear All
        </ClearFiltersButton>
      </FiltersHeader>
      
      <FiltersGrid>
        <FilterGroup>
          <FilterLabel>Category</FilterLabel>
          <FilterSelect
            value={localFilters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Brand</FilterLabel>
          <FilterSelect
            value={localFilters.brand}
            onChange={(e) => handleFilterChange('brand', e.target.value)}
          >
            <option value="">All Brands</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Price Range</FilterLabel>
          <PriceRangeContainer>
            <PriceInput
              type="number"
              placeholder="Min"
              value={localFilters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            />
            <PriceSeparator>to</PriceSeparator>
            <PriceInput
              type="number"
              placeholder="Max"
              value={localFilters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            />
          </PriceRangeContainer>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>Rating</FilterLabel>
          <FilterSelect
            value={localFilters.rating}
            onChange={(e) => handleFilterChange('rating', e.target.value)}
          >
            <option value="">All Ratings</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="2">2+ Stars</option>
          </FilterSelect>
        </FilterGroup>
      </FiltersGrid>
    </FiltersSection>
  );
};
