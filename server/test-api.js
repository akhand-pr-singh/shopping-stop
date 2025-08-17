const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

async function testAPI() {
  try {
    console.log('Testing Shopping Stop API...\n');

    // Test root endpoint
    console.log('1. Testing root endpoint...');
    const rootResponse = await axios.get(`${BASE_URL}/`);
    console.log('✅ Root endpoint:', rootResponse.data);
    console.log('');

    // Test products endpoint
    console.log('2. Testing products endpoint...');
    const productsResponse = await axios.get(`${BASE_URL}/api/products`);
    console.log('✅ Products endpoint:');
    console.log(`   - Total products: ${productsResponse.data.productsCount}`);
    console.log(`   - Products returned: ${productsResponse.data.products.length}`);
    console.log(`   - First product: ${productsResponse.data.products[0]?.name || 'No products'}`);
    console.log('');

    // Test single product endpoint (if products exist)
    if (productsResponse.data.products.length > 0) {
      const firstProductId = productsResponse.data.products[0]._id;
      console.log('3. Testing single product endpoint...');
      const singleProductResponse = await axios.get(`${BASE_URL}/api/product/${firstProductId}`);
      console.log('✅ Single product endpoint:');
      console.log(`   - Product name: ${singleProductResponse.data.product.name}`);
      console.log(`   - Product price: $${singleProductResponse.data.product.price}`);
      console.log('');

      // Test search functionality
      console.log('4. Testing search functionality...');
      const searchResponse = await axios.get(`${BASE_URL}/api/products?keyword=iPhone`);
      console.log('✅ Search endpoint:');
      console.log(`   - Search results: ${searchResponse.data.products.length} products found`);
      console.log('');

      // Test filtering by category
      console.log('5. Testing category filter...');
      const categoryResponse = await axios.get(`${BASE_URL}/api/products?category=Electronics`);
      console.log('✅ Category filter:');
      console.log(`   - Electronics products: ${categoryResponse.data.products.length} found`);
      console.log('');

      // Test price filtering
      console.log('6. Testing price filter...');
      const priceResponse = await axios.get(`${BASE_URL}/api/products?price[gte]=100`);
      console.log('✅ Price filter (>= $100):');
      console.log(`   - Products >= $100: ${priceResponse.data.products.length} found`);
      console.log('');
    }

    console.log('🎉 All API tests completed successfully!');
    console.log('The Shopping Stop API is working correctly.');

  } catch (error) {
    console.error('❌ API test failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

// Run the test
testAPI(); 