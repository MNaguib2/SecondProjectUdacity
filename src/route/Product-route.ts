import express from 'express';
import { addProduct, DeleteProduct, EditProduct } from '../handlers/Product-handler';
import { body } from 'express-validator';

const route = express.Router();

route.post('/addProduct', [body('name', 'Please Entre Valid Name').isString().isLength({ min: 4 }).trim(),
body('price', 'Please Entre Valid price').isDecimal().trim(),
body('description', 'Please Entre Valid description').isString().isLength({ min: 15 }).trim()]
    , addProduct);
route.put('/EditProduct/:id', [body('name', 'Please Entre Valid Name').isString().isLength({ min: 4 }).trim(),
body('price', 'Please Entre Valid price').isDecimal().trim(),
body('description', 'Please Entre Valid description').isString().isLength({ min: 15 }).trim()],
    EditProduct);

    route.delete('/deleteProduct/:id' , DeleteProduct )
export default route;