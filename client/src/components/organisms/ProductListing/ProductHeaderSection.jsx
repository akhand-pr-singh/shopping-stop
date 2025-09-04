import React from 'react';
import {
  ProductsHeader,
  ResultsInfo,
  ResultsCount,
  ResultsText,
  SortContainer,
  SortLabel,
  SortSelect
} from './style';

export const ProductsHeaderSection = ({ totalProducts, sortBy, onSortChange }) => {
  return (
    <ProductsHeader>
      <ResultsInfo>
        <ResultsCount>{totalProducts}</ResultsCount>
        <ResultsText>products found</ResultsText>
      </ResultsInfo>
      
      <SortContainer>
        <SortLabel>Sort by:</SortLabel>
        <SortSelect value={sortBy} onChange={(e) => onSortChange?.(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="name">Name A-Z</option>
        </SortSelect>
      </SortContainer>
    </ProductsHeader>
  );
};
