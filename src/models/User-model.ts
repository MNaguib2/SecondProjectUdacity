import client from "../util/database";

export type User = {
    id: number;
    name: string;
    email: string;
    typeuser: number;
    statue: number ;
    password: string;
    token: string | null;
}

export class UserModel {
    async getAll(): Promise<User[]> {
        try {
            const conn = await client.connect();
            const sql = 'select name , id , typeuser, email from users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Cannot get DB ${err}`);
        }
    }
    async AddAdmin(Data: User): Promise<number> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO users(name, email, typeuser, statue, password) VALUES '+
            `('${Data.name}', '${Data.email}', ${Data.typeuser} , ${Data.statue} , '${Data.password}')`;
            const result = await conn.query(sql);
            conn.release();
            return result.rowCount;
        } catch (err) {
            throw new Error(`Cannot INSERT DB ${err}`);
        }
    }
    async AddUser(Data: User): Promise<number> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO users(name, email, typeuser, statue, password) VALUES ' +
            `('${Data.name}', '${Data.email}', ${Data.typeuser} , ${Data.statue} , '${Data.password}')`;
            const result = await conn.query(sql);
            conn.release();
            return result.rowCount;
        } catch (err) {
            throw new Error(`Cannot INSERT DB ${err}`);
        }
    }
    async FindUserByEmail(email: string): Promise<User> {
        try {
            const conn = await client.connect();            
            const sql = `SELECT * FROM users WHERE email = '${email}'`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows[0];
        } catch (err) {            
            throw new Error(`Cannot SELECT user from DB by email error 11 ${err}`);
        }
    }
    async AddUserToken(Token: string , id : number): Promise<number> {
        try {
            const conn = await client.connect();
            const sql = `UPDATE users SET "token"= '${Token}' WHERE id = ${id};`;
            const result = await conn.query(sql);
            conn.release();
            return result.rowCount;
        } catch (err) {
            throw new Error(`Cannot INSERT Token DB ${err}`);
        }
    }
    async FindBytypeuser(typeuser: number): Promise<User> {
        try {            
            const conn = await client.connect();
            const sql = `SELECT statue, id from users WHERE typeuser = ${typeuser};`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Cannot get statue from admin ${err}`);
        }
    }
    async LogoutUser(id: number): Promise<string> {
        try {
            const conn = await client.connect();
            const sql = `UPDATE users SET "token"= '' WHERE id = ${id};`;
            const result = await conn.query(sql);
            conn.release();
            return result.command;
        } catch (err) {
            throw new Error(`Cannot logout user via delete tokenGen error 12 ${err}`);
        }
    }
    async ClearAll() {
        try {
            const conn = await client.connect();
            let sql = `delete from carditem`;
            let result = await conn.query(sql);
            sql = `delete from cards`;
            result = await conn.query(sql);
            sql = `delete from products`;
            result = await conn.query(sql);
            sql = `delete from users`;
            result = await conn.query(sql);            
            conn.release();
            return result.command;
        } catch (err) {
            throw new Error(`Cannot logout user via delete tokenGen error 12 ${err}`);
        }
    }
}