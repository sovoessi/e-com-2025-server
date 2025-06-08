import express from 'express';
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';
import upload from '../middlewares/multer.js';
import { authenticate, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/',authenticate, isAdmin, upload.array('images', 5), createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id',authenticate, isAdmin, upload.array('images', 5), updateProduct);
router.delete('/:id',authenticate, isAdmin, deleteProduct);

export default router;