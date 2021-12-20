import { Application } from 'express';
import userRouter from './user-router';
import productRouter from './product-router';

const createRoute = (app: Application): void => {
    app.use('/api/users', userRouter);
    app.use('/api/products', productRouter);
};

export default createRoute;