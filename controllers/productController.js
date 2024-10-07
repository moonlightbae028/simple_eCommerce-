const Product = require('../models/Product'); // Ensure the path is correct

const productController = {
    getProducts: async (req, res) => {
        try {
            const products = await Product.getAll();
            res.render('products', { products, user: req.session.user });
        } catch (err) {
            console.error('Error details:', err);
            return res.status(500).send('Error fetching products');
        }
    },

    getProductsByCategory: async (req, res) => {
        const category = req.query.category;
        try {
            const products = category ? await Product.getByCategory(category) : await Product.getAll();
            res.render('products', { products, user: req.session.user });
        } catch (err) {
            console.error('Error details:', err);
            return res.status(500).send('Error fetching products');
        }
    },

    addProduct: async (productData) => {
        const { name, price, description, picturePath, stock, category } = productData;
        try {
            const query = 'INSERT INTO products (name, price, description, picture, stock, category) VALUES (?, ?, ?, ?, ?, ?)';
            await db.query(query, [name, price, description, picturePath, stock, category]);
            return { name, price, description, picture: picturePath, stock, category };
        } catch (err) {
            throw new Error(err);
        }
    },
};

module.exports = productController;
