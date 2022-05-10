"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrediteModel = void 0;
const database_1 = __importDefault(require("../util/database"));
class CrediteModel {
    getAllCrediteToUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'select * from cards where Id_user = ' + id;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot get Credite specialist to user from DB error 15 ${err}`);
            }
        });
    }
    getCreditItem(idProd, idCard) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'select * from carditem where id_product = ' + idProd + "AND id_card = " + idCard;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot get Credite specialist item to cardid from DB error 21 ${err}`);
            }
        });
    }
    getALLCreditItem(idCard) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'select * from carditem where id_card = ' + idCard;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot get Credite all item to cardid from DB error 29 ${err}`);
            }
        });
    }
    CreateNewCredit(Data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `INSERT INTO cards(id_user, totalprice)VALUES ('${Data.id_user}', '${Data.totalprice}') RETURNING id`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows[0].id;
            }
            catch (err) {
                throw new Error(`Cannot Create new Credite to DB error 16 ${err}`);
            }
        });
    }
    AddItemCredit(Data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `INSERT INTO carditem(id_card, id_product, totalprice, quantity)VALUES (${Data.id_card}, ${Data.id_product}, ${Data.totalprice}, ${Data.quantity});`;
                const result = yield conn.query(sql);
                conn.release();
                return result.command;
            }
            catch (err) {
                throw new Error(`Cannot Create new CreditItem to DB error 18 ${err}`);
            }
        });
    }
    AddItemAgain(TotalQuantity, totalprice, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `UPDATE carditem SET totalprice=${totalprice}, quantity=${TotalQuantity} WHERE id = ${id} RETURNING *;`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot Create new CreditItem to DB error 18 ${err}`);
            }
        });
    }
    CalculateTotalPrice(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let x = 0;
            let totalPriceCredit = 0;
            try {
                const conn = yield database_1.default.connect();
                let sql = `Select * from carditem WHERE id_card = ${id};`;
                let result = yield conn.query(sql);
                result.rows.forEach(prod => x = x + +prod.totalprice);
                totalPriceCredit = x;
                sql = `UPDATE cards SET totalprice=${totalPriceCredit} WHERE id = ${id}`;
                result = yield conn.query(sql);
                conn.release();
            }
            catch (err) {
                throw new Error(`Cannot Calculate items price 23 ${err}`);
            }
        });
    }
    DeleteItem(idCard, idProd) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `DELETE FROM carditem WHERE id_card = ${idCard} AND id_product = ${idProd};`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rowCount;
            }
            catch (err) {
                throw new Error(`Cannot Deleted Item From Card think not item in this card 28 ${err}`);
            }
        });
    }
}
exports.CrediteModel = CrediteModel;
