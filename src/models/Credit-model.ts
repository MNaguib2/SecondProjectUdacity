import client from "../util/database";

export type Credite = {
    id: number;
    id_user: number;
    totalprice: number ;
}

export type CrediteItem = {
    id: number;
    id_card: number;
    id_product : number;
    totalprice: number ;
    quantity : number;
}

export class CrediteModel {  
    async getAllCrediteToUser(id : number): Promise<Credite> {
        try {
            const conn = await client.connect();
            const sql = 'select * from cards where Id_user = '+ id;
            const result = await conn.query(sql);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot get Credite specialist to user from DB error 15 ${err}`);
        }
    }
    async getCreditItem(idProd : number, idCard : number): Promise<CrediteItem> {
        try {
            const conn = await client.connect();
            const sql = 'select * from carditem where id_product = ' + idProd + "AND id_card = " + idCard;
            const result = await conn.query(sql);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot get Credite specialist item to cardid from DB error 21 ${err}`);
        }
    } 
    async getALLCreditItem(idCard : number): Promise<CrediteItem[]> {
        try {
            const conn = await client.connect();
            const sql = 'select * from carditem where id_card = ' + idCard;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get Credite all item to cardid from DB error 29 ${err}`);
        }
    } 
    async CreateNewCredit(Data : Credite): Promise<number> {
        try {
            const conn = await client.connect();
            const sql = `INSERT INTO cards(id_user, totalprice)VALUES ('${Data.id_user}', '${Data.totalprice}') RETURNING id`
            const result = await conn.query(sql);
            conn.release();
            return result.rows[0].id;
        } catch (err) {
            throw new Error(`Cannot Create new Credite to DB error 16 ${err}`);
        }
    }
    async AddItemCredit(Data : CrediteItem): Promise<string> {
        try {
            const conn = await client.connect();
            const sql = `INSERT INTO carditem(id_card, id_product, totalprice, quantity)VALUES (${Data.id_card}, ${Data.id_product}, ${Data.totalprice}, ${Data.quantity});`
            const result = await conn.query(sql);
            conn.release();
            return result.command;
        } catch (err) {
            throw new Error(`Cannot Create new CreditItem to DB error 18 ${err}`);
        }
    } 
    async AddItemAgain(TotalQuantity : number , totalprice : number , id : number): Promise<CrediteItem> {
        try {
            const conn = await client.connect();
            const sql = `UPDATE carditem SET totalprice=${totalprice}, quantity=${TotalQuantity} WHERE id = ${id} RETURNING *;`
            const result = await conn.query(sql);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot Create new CreditItem to DB error 18 ${err}`);
        }
    } 
    async CalculateTotalPrice(id : number) {
        let x = 0;
        let totalPriceCredit = 0;
        try {
            const conn = await client.connect();
            let sql = `Select * from carditem WHERE id_card = ${id};`
            let result = await conn.query(sql);
            result.rows.forEach(prod => x = x + +prod.totalprice)
            totalPriceCredit = x;
            sql = `UPDATE cards SET totalprice=${totalPriceCredit} WHERE id = ${id}`;
            result = await conn.query(sql);
            conn.release();
        } catch (err) {
            throw new Error(`Cannot Calculate items price 23 ${err}`);
        }
    } 
    async DeleteItem(idCard: number, idProd: number): Promise<number> {
        try {
            const conn = await client.connect();
            const sql = `DELETE FROM carditem WHERE id_card = ${idCard} AND id_product = ${idProd};`
            const result = await conn.query(sql);
            conn.release();
            return result.rowCount;
        } catch (err) {
            throw new Error(`Cannot Deleted Item From Card think not item in this card 28 ${err}`);
        }
    }
}