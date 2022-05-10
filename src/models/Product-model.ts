import client from "../util/database";

export type Product = {
    id: number;
    name: string;
    description: string;
    Id_user: number;
    price: number ;
}

export class ProductModel {
    async getAllProduct(): Promise<Product[]> {
        try {
            const conn = await client.connect();
            const sql = 'select name , price , description from Products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get Products DB ${err}`);
        }
    }
    async ADDProduct(Product : Product): Promise<string> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO products(name, price, id_user, description) VALUES ' +
                                    `('${Product.name}', '${Product.price}', '${Product.Id_user}', '${Product.description}')`;
            const result = await conn.query(sql);
            conn.release();
            //console.log(result)
            return result.command;
        } catch (err) {
            throw new Error(`Cannot get Products DB ${err}`);
        }
    }
    async EditProduct(Product : Product): Promise<string> {
        try {
            const conn = await client.connect();
            const sql = 'UPDATE public.products SET '+
                        `name='${Product.name}', price = ${Product.price}, description ='${Product.description}' WHERE id = ${Product.id}`
            const result = await conn.query(sql);
            conn.release();
            //console.log(result)
            return result.command;
        } catch (err) {
            throw new Error(`Cannot get Products DB error 6 ${err}`);
        }
    }
    async getProductByID(id : number): Promise<Product> {
        try {
            const conn = await client.connect();            
            const sql = 'select * from Products where id =' + id ;
            const result = await conn.query(sql);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot get Products use id DB error 4 ${err}`);
        }
    }
    async DeleteProductByID(id : number): Promise<string> {
        try {
            const conn = await client.connect();
            const sql = 'DELETE FROM products  WHERE id =' + id ;
            const result = await conn.query(sql);
            conn.release();
            return result.command;
        } catch (err) {
            throw new Error(`Cannot Delete Products use id DB error 7 ${err}`);
        }
    }
    async getAllDetialsProduct(): Promise<Product[]> {
        try {
            const conn = await client.connect();
            const sql = 'select * from Products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get All Detials Products DB error 10 ${err}`);
        }
    }
}