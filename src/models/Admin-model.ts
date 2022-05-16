import client from '../util/database';

export class AdminModel {
  async changeStatue(statue: number, id: number): Promise<string> {
    try {
      const conn = await client.connect();
      const sql = `UPDATE users SET "statue"= '${statue}' WHERE id = ${id};`;
      const result = await conn.query(sql);
      conn.release();
      return result.command;
    } catch (err) {
      throw new Error(`Cannot Update Statue For User DB ${err}`);
    }
  }
  async UpgredUser(typeuser: number, id: number): Promise<string> {
    try {
      const conn = await client.connect();
      const sql = `UPDATE users SET "typeuser"= '${typeuser}' WHERE id = ${id};`;
      const result = await conn.query(sql);
      conn.release();
      return result.command;
    } catch (err) {
      throw new Error(`Cannot Upgred Statue For User DB ${err}`);
    }
  }
}
