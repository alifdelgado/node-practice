import * as usersController from '../controllers/users-controller';
import * as productsController from '../controllers/products-controller';

const createRoute = (app) => {
    app.get('/api/users', usersController.getUsers);
    app.get('/api/users/:userId', usersController.getUserById);
    app.get('/api/products', productsController.getProducts);
    app.get('/api/products/:productId', productsController.getProductById);
    app.get('/api/products/create', productsController.createProduct);
    app.get('/api/products/:productId', productsController.updateProduct);
};