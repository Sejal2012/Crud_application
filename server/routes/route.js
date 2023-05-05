import express from 'express';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import { getUsers, addUser, getUserById, editUser, deleteUser } from '../controller/user-controller.js';
import {order , varify } from '../controller/paymentController.js'
 const router = express.Router();

router.get('/', getUsers);
router.post('/add', addUser);
router.get('/:id', getUserById);
router.put('/:id', editUser);
router.delete('/:id', deleteUser);
router.post('/order', order);
router.post('/varify', varify);

// router.post('/paymentverification',paymentVerification);

export default router;