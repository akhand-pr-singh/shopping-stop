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