import bcrypt from 'bcryptjs';
const data = {
  users: [
    {
      name: 'Tamir',
      email: 'tamir0202@gmail.com',
      password: bcrypt.hashSync('1235', 8),
      isAdmin: true, 
    },
    {
      name: 'rom',
      email: 'rom0202@gmail.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false, 
    }
  ],
    products: [
      {  
        name: 'maccabi shirt 1',
        category: 'Shirts',
        image: '/images/p1.jpg',
        price: 120,
        countInStock: 10,
        brand: 'Nike',
        rating: 4.5,
        numReviews: 10,
        description: 'high quality product',
      },

      {
        name: 'maccabi shirt 2',
        category: 'Shirts',
        image: '/images/p1.jpg',
        price: 120,
        countInStock: 10,
        brand: 'Nike',
        rating: 5,
        numReviews: 10,
        description: 'high quality product',
      },

      {
        name: 'Adidas Slim Shirt',
        category: 'Shirts',
        image: '/images/p1.jpg',
        price: 60,
        countInStock: 0,
        brand: 'Nike',
        rating: 5,
        numReviews: 4,
        description: 'high quality product',
      }

    ]
}
export default data;