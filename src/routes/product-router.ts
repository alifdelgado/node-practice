import { Router } from "express";
import { checkAuth, checkIp } from '../middlewares/auth-middleware';
import * as productsController from '../controllers/products-controller';

const router: Router = Router();
router.get('', checkIp, checkAuth, productsController.getProducts);
router.get('/:productId', checkAuth, productsController.getProductById);
router.post('/create', checkAuth, productsController.createProduct);
router.put('/:productId', checkAuth, productsController.updateProduct);
router.patch('/:productId', checkAuth, productsController.partialUpdateProduct);
router.delete('/:productId', checkAuth, productsController.deleteProductById);
router.post('/:productId/notify-client', checkAuth, productsController.updateProductAndNotify);

export default router;