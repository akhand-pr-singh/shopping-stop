import React, { useState, useEffect } from 'react';
import Navbar from '../../organisms/Navbar';
import Cart from '../../organisms/Cart';
import ProductCard from '../../molecules/ProductCard';
import {
  TemplateContainer,
  MainContent,
  PageHeader,
  PageTitle,
  PageSubtitle,
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
  PriceSeparator,
  ProductsSection,
  ProductsHeader,
  ResultsInfo,
  ResultsCount,
  ResultsText,
  SortContainer,
  SortLabel,
  SortSelect,
  ProductsGrid,
  LoadingContainer,
  LoadingSpinner,
  LoadingText,
  EmptyState,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateText,
  PaginationContainer,
  PaginationButton,
  PaginationInfo
} from './style';

const ProductListingTemplate = ({
  // Data props
  products = [],
  loading = false,
  error = null,
  totalProducts = 0,
  currentPage = 1,
  totalPages = 1,
  productsPerPage = 12,
  
  // Filter props
  filters = {
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    rating: '',
    sortBy: 'newest'
  },
  
  // Available options for filters
  categories = [],
  brands = [],
  
  // Event handlers
  onSearch,
  onAddToCart,
  onViewProduct,
  onUpdateFilters,
  onClearFilters,
  onPageChange,
  onSortChange,
  onCartClick,
  onLogoClick,
  onLogout,
  onProfileClick,
  onOrdersClick,
  
  // User and cart props
  user = null,
  cartItems = [],
  cartItemCount = 0,
  isCartOpen = false,
  onCartClose,
  onUpdateCartQuantity,
  onRemoveCartItem,
  onCartCheckout,
  
  className = ''
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

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    onSortChange?.(sortBy);
  };

  const renderFilters = () => (
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

  const renderProductsHeader = () => (
    <ProductsHeader>
      <ResultsInfo>
        <ResultsCount>{totalProducts}</ResultsCount>
        <ResultsText>products found</ResultsText>
      </ResultsInfo>
      
      <SortContainer>
        <SortLabel>Sort by:</SortLabel>
        <SortSelect value={localFilters.sortBy} onChange={handleSortChange}>
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

  const renderProducts = () => {
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
            images={product.images}
            rating={product.ratings}
            numReviews={product.numOfReviews}
            onAddToCart={() => onAddToCart?.(product)}
            onViewDetails={() => onViewProduct?.(product)}
          />
        ))}
      </ProductsGrid>
    );
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    // Previous button
    pages.push(
      <PaginationButton
        key="prev"
        onClick={() => onPageChange?.(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ← Previous
      </PaginationButton>
    );

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationButton
          key={i}
          onClick={() => onPageChange?.(i)}
          className={i === currentPage ? 'active' : ''}
        >
          {i}
        </PaginationButton>
      );
    }

    // Next button
    pages.push(
      <PaginationButton
        key="next"
        onClick={() => onPageChange?.(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next →
      </PaginationButton>
    );

    return (
      <PaginationContainer>
        {pages}
        <PaginationInfo>
          Page {currentPage} of {totalPages}
        </PaginationInfo>
      </PaginationContainer>
    );
  };

  return (
    <TemplateContainer className={className}>
      <Navbar
        cartItemCount={cartItemCount}
        user={user}
        onSearch={onSearch}
        onCartClick={onCartClick}
        onLogoClick={onLogoClick}
        onLogout={onLogout}
        onProfileClick={onProfileClick}
        onOrdersClick={onOrdersClick}
      />

      <MainContent>
        <PageHeader>
          <PageTitle>All Products</PageTitle>
          <PageSubtitle>Discover amazing products at great prices</PageSubtitle>
        </PageHeader>

        {renderFilters()}

        <ProductsSection>
          {renderProductsHeader()}
          {renderProducts()}
          {renderPagination()}
        </ProductsSection>
      </MainContent>

      <Cart
        isOpen={isCartOpen}
        cartItems={cartItems}
        onClose={onCartClose}
        onUpdateQuantity={onUpdateCartQuantity}
        onRemoveItem={onRemoveCartItem}
        onCheckout={onCartCheckout}
      />
    </TemplateContainer>
  );
};

export default ProductListingTemplate;
