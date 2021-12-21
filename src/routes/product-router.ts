import { Router } from 'express';
import { checkAuth } from '../middlewares/auth-middleware';
import * as productsController from '../controllers/products-controller';
import { productValidate, validateProductDelete, validateProductNotify } from '../validator/products-validator';
import { handleProductErrors } from '../middlewares/validator-middleware';

const router: Router = Router();
router.get('', checkAuth, productsController.getProducts);
router.get('/:productId', checkAuth, productsController.getProductById);
router.post('/create',
    checkAuth,
    productValidate,
    handleProductErrors,
    productsController.createProduct);
router.put('/:productId', checkAuth, productsController.updateProduct);
router.patch('/:productId', checkAuth, productsController.partialUpdateProduct);
router.delete('/:productId', 
    checkAuth,
    validateProductDelete,
    handleProductErrors,
    productsController.deleteProductById);
router.post('/:productId/notify-client', 
    checkAuth,
    validateProductNotify,
    handleProductErrors,
    productsController.updateProductAndNotify);

export default router;