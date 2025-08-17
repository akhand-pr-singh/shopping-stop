const axios = require('axios');

const BASE_URL = 'http://localhost:8080/api';

// Test function
async function testAPI() {
  try {
    console.log('🧪 Testing API Endpoints...\n');

    // Test 1: Get all products
    console.log('1. Testing GET /products (all products)');
    const allProducts = await axios.get(`${BASE_URL}/products`);
    console.log(`✅ Found ${allProducts.data.totalProducts} products`);
    console.log(`   Total pages: ${allProducts.data.totalPages}`);
    console.log(`   Current page: ${allProducts.data.currentPage}\n`);

    // Test 2: Get products with pagination
    console.log('2. Testing GET /products?page=2&limit=6 (pagination)');
    const paginatedProducts = await axios.get(`${BASE_URL}/products?page=2&limit=6`);
    console.log(`✅ Page 2 has ${paginatedProducts.data.products.length} products`);
    console.log(`   Total pages: ${paginatedProducts.data.totalPages}\n`);

    // Test 3: Get products by category
    console.log('3. Testing GET /products?category=Electronics (category filter)');
    const electronicsProducts = await axios.get(`${BASE_URL}/products?category=Electronics`);
    console.log(`✅ Found ${electronicsProducts.data.totalProducts} Electronics products\n`);

    // Test 4: Get products by brand
    console.log('4. Testing GET /products?brand=Apple (brand filter)');
    const appleProducts = await axios.get(`${BASE_URL}/products?brand=Apple`);
    console.log(`✅ Found ${appleProducts.data.totalProducts} Apple products\n`);

    // Test 5: Get products by price range
    console.log('5. Testing GET /products?minPrice=100&maxPrice=500 (price filter)');
    const priceFilteredProducts = await axios.get(`${BASE_URL}/products?minPrice=100&maxPrice=500`);
    console.log(`✅ Found ${priceFilteredProducts.data.totalProducts} products between $100-$500\n`);

    // Test 6: Get products by rating
    console.log('6. Testing GET /products?rating=4 (rating filter)');
    const ratingFilteredProducts = await axios.get(`${BASE_URL}/products?rating=4`);
    console.log(`✅ Found ${ratingFilteredProducts.data.totalProducts} products with 4+ stars\n`);

    // Test 7: Sort products by price (low to high)
    console.log('7. Testing GET /products?sortBy=price-low (sorting)');
    const sortedProducts = await axios.get(`${BASE_URL}/products?sortBy=price-low&limit=5`);
    console.log(`✅ First 5 products sorted by price (low to high):`);
    sortedProducts.data.products.forEach((product, index) => {
      console.log(`   ${index + 1}. ${product.name} - $${product.price}`);
    });
    console.log();

    // Test 8: Search products
    console.log('8. Testing GET /products/search?q=phone (search)');
    const searchResults = await axios.get(`${BASE_URL}/products/search?q=phone`);
    console.log(`✅ Found ${searchResults.data.totalProducts} products matching "phone"\n`);

    // Test 9: Get categories
    console.log('9. Testing GET /products/categories');
    const categories = await axios.get(`${BASE_URL}/products/categories`);
    console.log(`✅ Available categories: ${categories.data.categories.join(', ')}\n`);

    // Test 10: Get brands
    console.log('10. Testing GET /products/brands');
    const brands = await axios.get(`${BASE_URL}/products/brands`);
    console.log(`✅ Available brands: ${brands.data.brands.join(', ')}\n`);

    // Test 11: Get featured products
    console.log('11. Testing GET /products/featured');
    const featuredProducts = await axios.get(`${BASE_URL}/products/featured?limit=5`);
    console.log(`✅ Found ${featuredProducts.data.products.length} featured products\n`);

    // Test 12: Combined filters
    console.log('12. Testing GET /products?category=Electronics&minPrice=500&sortBy=price-high (combined filters)');
    const combinedFilters = await axios.get(`${BASE_URL}/products?category=Electronics&minPrice=500&sortBy=price-high`);
    console.log(`✅ Found ${combinedFilters.data.totalProducts} Electronics products above $500, sorted by price (high to low)\n`);

    console.log('🎉 All API tests completed successfully!');

  } catch (error) {
    console.error('❌ API test failed:', error.response?.data || error.message);
  }
}

// Run the test
testAPI(); 