import express from 'express';
import { AddItemToCredit, RemoveItemToCredit, ShowCredit } from '../handlers/Credite-Handler';
import { body, param } from 'express-validator';

const route = express.Router();

route.post('/addItemCredit/:id', 
                            param('id', 'Please Entre Valid id Product').exists().isFloat({min:1}).isInt(),
                            AddItemToCredit
    );

    route.delete('/deleteProduct/:id', param('id', 'Please Entre Valid id Product').exists().isFloat({min:1}).isInt() , RemoveItemToCredit )
route.get('/Cards', ShowCredit)
    export default route;