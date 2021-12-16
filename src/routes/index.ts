import { Application } from 'express';
import * as usersController from '../controllers/users-controller';
import * as productsController from '../controllers/products-controller';

const createRoute = (app: Application): void => {
    app.get('/api/users', usersController.getUsers);
    app.get('/api/users/:userId', usersController.getUserById);
    app.get('/api/products', productsController.getProducts);
    app.get('/api/products/:productId', productsController.getProductById);
    app.post('/api/products/create', productsController.createProduct);
    app.put('/api/products/:productId', productsController.updateProduct);
    app.patch('/api/products/:productId', productsController.partialUpdateProduct);
    app.delete('/api/products/:productId', productsController.deleteProductById);
    app.post('/api/products/:productId/notify-client', productsController.updateProductAndNotify);
};

export default createRoute;