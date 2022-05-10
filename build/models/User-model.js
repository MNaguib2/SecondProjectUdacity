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
exports.UserModel = void 0;
const database_1 = __importDefault(require("../util/database"));
class UserModel {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'select name , id , typeuser, email from users';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot get DB ${err}`);
            }
        });
    }
    AddAdmin(Data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO users(name, email, typeuser, statue, password) VALUES ' +
                    `('${Data.name}', '${Data.email}', ${Data.typeuser} , ${Data.statue} , '${Data.password}')`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rowCount;
            }
            catch (err) {
                throw new Error(`Cannot INSERT DB ${err}`);
            }
        });
    }
    AddUser(Data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO users(name, email, typeuser, statue, password) VALUES ' +
                    `('${Data.name}', '${Data.email}', ${Data.typeuser} , ${Data.statue} , '${Data.password}')`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rowCount;
            }
            catch (err) {
                throw new Error(`Cannot INSERT DB ${err}`);
            }
        });
    }
    FindUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM users WHERE email = '${email}'`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot SELECT user from DB by email error 11 ${err}`);
            }
        });
    }
    AddUserToken(Token, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `UPDATE users SET "token"= '${Token}' WHERE id = ${id};`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rowCount;
            }
            catch (err) {
                throw new Error(`Cannot INSERT Token DB ${err}`);
            }
        });
    }
    FindBytypeuser(typeuser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT statue from users WHERE typeuser = ${typeuser};`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot get statue from admin ${err}`);
            }
        });
    }
    LogoutUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `UPDATE users SET "token"= '' WHERE id = ${id};`;
                const result = yield conn.query(sql);
                conn.release();
                return result.command;
            }
            catch (err) {
                throw new Error(`Cannot logout user via delete tokenGen error 12 ${err}`);
            }
        });
    }
}
exports.UserModel = UserModel;
