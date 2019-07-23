import { Router } from 'express';
import SupplierController from '../controllers/supplierController';

const router = Router();

router.get('/', SupplierController.getAllSuppliers);
router.post('/', SupplierController.addSupplier);
router.get('/:id', SupplierController.getASupplier);
router.put('/:id', SupplierController.updatedSupplier);
router.delete('/:id', SupplierController.deleteSupplier);

export default router;