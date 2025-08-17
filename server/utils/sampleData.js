const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

// Sample user data
const sampleUser = {
  name: 'Admin User',
  email: 'admin@shoppingstop.com',
  password: 'admin123',
  role: 'admin'
};

// Sample products data
const sampleProducts = [
  {
    name: 'iPhone 13 Pro',
    description: 'Latest iPhone with advanced camera system and A15 Bionic chip',
    price: 999.99,
    category: 'Electronics',
    brand: 'Apple',
    stock: 50,
    images: [{
      public_id: 'iphone13pro_1',
      url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500'
    }],
    ratings: 4.5,
    numOfReviews: 12
  },
  {
    name: 'Nike Air Max 270',
    description: 'Comfortable running shoes with Air Max technology',
    price: 129.99,
    category: 'Sports',
    brand: 'Nike',
    stock: 100,
    images: [{
      public_id: 'nike_airmax_1',
      url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'
    }],
    ratings: 4.3,
    numOfReviews: 8
  },
  {
    name: 'Samsung 4K Smart TV',
    description: '55-inch 4K Ultra HD Smart TV with Crystal Display',
    price: 699.99,
    category: 'Electronics',
    brand: 'Samsung',
    stock: 25,
    images: [{
      public_id: 'samsung_tv_1',
      url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500'
    }],
    ratings: 4.7,
    numOfReviews: 15
  },
  {
    name: 'Levi\'s 501 Jeans',
    description: 'Classic straight fit jeans in dark wash denim',
    price: 79.99,
    category: 'Clothing',
    brand: 'Levi\'s',
    stock: 200,
    images: [{
      public_id: 'levis_jeans_1',
      url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500'
    }],
    ratings: 4.2,
    numOfReviews: 20
  },
  {
    name: 'The Great Gatsby',
    description: 'Classic novel by F. Scott Fitzgerald',
    price: 12.99,
    category: 'Books',
    brand: 'Scribner',
    stock: 150,
    images: [{
      public_id: 'gatsby_book_1',
      url: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500'
    }],
    ratings: 4.8,
    numOfReviews: 45
  },
  {
    name: 'KitchenAid Stand Mixer',
    description: 'Professional 5-quart stand mixer in red',
    price: 299.99,
    category: 'Home & Garden',
    brand: 'KitchenAid',
    stock: 30,
    images: [{
      public_id: 'kitchenaid_mixer_1',
      url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500'
    }],
    ratings: 4.6,
    numOfReviews: 18
  },
  {
    name: 'MacBook Pro 14"',
    description: 'Powerful laptop with M1 Pro chip for professionals',
    price: 1999.99,
    category: 'Electronics',
    brand: 'Apple',
    stock: 20,
    images: [{
      public_id: 'macbook_pro_1',
      url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500'
    }],
    ratings: 4.9,
    numOfReviews: 25
  },
  {
    name: 'Adidas Ultraboost 21',
    description: 'Premium running shoes with responsive cushioning',
    price: 179.99,
    category: 'Sports',
    brand: 'Adidas',
    stock: 75,
    images: [{
      public_id: 'adidas_ultraboost_1',
      url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500'
    }],
    ratings: 4.4,
    numOfReviews: 32
  },
  {
    name: 'Sony WH-1000XM4',
    description: 'Wireless noise-canceling headphones',
    price: 349.99,
    category: 'Electronics',
    brand: 'Sony',
    stock: 40,
    images: [{
      public_id: 'sony_headphones_1',
      url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'
    }],
    ratings: 4.8,
    numOfReviews: 28
  },
  {
    name: 'H&M Cotton T-Shirt',
    description: 'Comfortable cotton t-shirt in various colors',
    price: 19.99,
    category: 'Clothing',
    brand: 'H&M',
    stock: 300,
    images: [{
      public_id: 'hm_tshirt_1',
      url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'
    }],
    ratings: 4.1,
    numOfReviews: 15
  },
  {
    name: 'To Kill a Mockingbird',
    description: 'Harper Lee\'s classic novel about justice and racism',
    price: 9.99,
    category: 'Books',
    brand: 'Grand Central',
    stock: 120,
    images: [{
      public_id: 'mockingbird_book_1',
      url: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500'
    }],
    ratings: 4.7,
    numOfReviews: 38
  },
  {
    name: 'Philips Hue Smart Bulb',
    description: 'WiFi-enabled smart LED bulb with 16 million colors',
    price: 49.99,
    category: 'Home & Garden',
    brand: 'Philips',
    stock: 80,
    images: [{
      public_id: 'philips_hue_1',
      url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500'
    }],
    ratings: 4.3,
    numOfReviews: 22
  },
  {
    name: 'L\'Oreal Paris Foundation',
    description: 'Long-lasting liquid foundation for all skin types',
    price: 24.99,
    category: 'Beauty',
    brand: 'L\'Oreal',
    stock: 150,
    images: [{
      public_id: 'loreal_foundation_1',
      url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500'
    }],
    ratings: 4.2,
    numOfReviews: 19
  },
  {
    name: 'LEGO Star Wars Millennium Falcon',
    description: 'Detailed building set with 1,329 pieces',
    price: 159.99,
    category: 'Toys',
    brand: 'LEGO',
    stock: 25,
    images: [{
      public_id: 'lego_millennium_1',
      url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500'
    }],
    ratings: 4.9,
    numOfReviews: 42
  },
  {
    name: 'BMW 3 Series Model Car',
    description: '1:18 scale die-cast model car with detailed interior',
    price: 89.99,
    category: 'Toys',
    brand: 'BMW',
    stock: 35,
    images: [{
      public_id: 'bmw_model_1',
      url: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500'
    }],
    ratings: 4.5,
    numOfReviews: 16
  },
  {
    name: 'Centrum Multivitamin',
    description: 'Complete daily multivitamin for adults',
    price: 34.99,
    category: 'Health',
    brand: 'Centrum',
    stock: 200,
    images: [{
      public_id: 'centrum_vitamin_1',
      url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500'
    }],
    ratings: 4.4,
    numOfReviews: 31
  },
  {
    name: 'Starbucks Coffee Beans',
    description: 'Premium Arabica coffee beans, medium roast',
    price: 14.99,
    category: 'Food & Beverages',
    brand: 'Starbucks',
    stock: 100,
    images: [{
      public_id: 'starbucks_coffee_1',
      url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500'
    }],
    ratings: 4.6,
    numOfReviews: 27
  },
  {
    name: 'Toyota Camry Keychain',
    description: 'Official Toyota branded keychain with logo',
    price: 12.99,
    category: 'Automotive',
    brand: 'Toyota',
    stock: 180,
    images: [{
      public_id: 'toyota_keychain_1',
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'
    }],
    ratings: 4.0,
    numOfReviews: 8
  }
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({ email: sampleUser.email });
    console.log('Cleared existing data');

    // Create admin user
    const user = await User.create(sampleUser);
    console.log('Admin user created');

    // Add user reference to products
    const productsWithUser = sampleProducts.map(product => ({
      ...product,
      user: user._id
    }));

    // Create products
    await Product.create(productsWithUser);
    console.log('Sample products created');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase(); 