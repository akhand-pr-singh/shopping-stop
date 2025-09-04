import React from 'react';
import ProductCard from '../../molecules/ProductCard';
import {
  ProductsGrid,
  LoadingContainer,
  LoadingSpinner,
  LoadingText,
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateText
} from './style';

export const ProductsListGrid = ({
  products,
  loading,
  error,
  addingToCartId,
  onAddToCart,
  onViewProduct
}) => {
  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <LoadingText>Loading products...</LoadingText>
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <EmptyState>
        <EmptyStateIcon>⚠️</EmptyStateIcon>
        <EmptyStateTitle>Error Loading Products</EmptyStateTitle>
        <EmptyStateText>{error}</EmptyStateText>
      </EmptyState>
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState>
        <EmptyStateIcon>🔍</EmptyStateIcon>
        <EmptyStateTitle>No Products Found</EmptyStateTitle>
        <EmptyStateText>
          Try adjusting your filters or search terms to find what you're looking for.
        </EmptyStateText>
      </EmptyState>
    );
  }

  return (
    <ProductsGrid>
      {products.map(product => (
        <ProductCard
          key={product._id}
          product={product}
          onAddToCart={() => onAddToCart?.(product)}
          onViewDetails={() => onViewProduct?.(product)}
          addingToCart={addingToCartId === product._id}
        />
      ))}
    </ProductsGrid>
  );
};
