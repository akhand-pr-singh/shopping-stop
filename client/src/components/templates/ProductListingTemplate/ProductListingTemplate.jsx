import Navbar from "../../organisms/Navbar";
import Cart from "../../organisms/Cart";
import {
  TemplateContainer,
  MainContent,
  PageHeader,
  PageTitle,
  PageSubtitle,
  ProductsSection,
} from "./style";
import {
  ProductFiltersSection,
  ProductsHeaderSection,
  ProductsListGrid,
} from "../../organisms/ProductListing";
import { Pagination } from "../../molecules/Pagination";

const ProductListingTemplate = ({
  // Data props
  products = [],
  loading = false,
  error = null,
  totalProducts = 0,
  currentPage = 1,
  totalPages = 1,
  addingToCartId = null,
  productsPerPage = 12,

  // Filter props
  filters = {
    category: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    rating: "",
    sortBy: "newest",
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
  checkoutLoading,
  checkoutError,
  cartItemLoading = { id: null, action: null },

  className = "",
}) => {
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

        <ProductFiltersSection
          filters={filters}
          categories={categories}
          brands={brands}
          onUpdateFilters={onUpdateFilters}
          onClearFilters={onClearFilters}
        />

        <ProductsSection>
          <ProductsHeaderSection
            totalProducts={totalProducts}
            sortBy={filters.sortBy}
            onSortChange={onSortChange}
          />
          <ProductsListGrid
            products={products}
            loading={loading}
            error={error}
            addingToCartId={addingToCartId}
            onAddToCart={onAddToCart}
            onViewProduct={onViewProduct}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </ProductsSection>
      </MainContent>

      <Cart
        isOpen={isCartOpen}
        cartItems={cartItems}
        onClose={onCartClose}
        onUpdateQuantity={onUpdateCartQuantity}
        onRemoveItem={onRemoveCartItem}
        onCheckout={onCartCheckout}
        cartItemLoading={cartItemLoading}
        checkoutLoading={checkoutLoading}
        checkoutError={checkoutError}
      />
    </TemplateContainer>
  );
};

export default ProductListingTemplate;
