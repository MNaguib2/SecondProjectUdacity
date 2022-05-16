'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ProductModel = void 0;
const database_1 = __importDefault(require('../util/database'));
class ProductModel {
  getAllProduct() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const conn = yield database_1.default.connect();
        //console.log(conn);
        const sql = 'select name , price , description from products';
        const result = yield conn.query(sql);
        conn.release();
        return result.rows;
      } catch (err) {
        throw new Error(`Cannot get Products DB ${err}`);
      }
    });
  }
  ADDProduct(Product) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const conn = yield database_1.default.connect();
        const sql =
          'INSERT INTO products(name, price, id_user, description) VALUES ' +
          `('${Product.name}', '${Product.price}', '${Product.Id_user}', '${Product.description}')`;
        const result = yield conn.query(sql);
        conn.release();
        //console.log(result)
        return result.command;
      } catch (err) {
        throw new Error(`Cannot get Products DB ${err}`);
      }
    });
  }
  EditProduct(Product) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const conn = yield database_1.default.connect();
        const sql =
          'UPDATE public.products SET ' +
          `name='${Product.name}', price = ${Product.price}, description ='${Product.description}' WHERE id = ${Product.id}`;
        const result = yield conn.query(sql);
        conn.release();
        //console.log(result)
        return result.command;
      } catch (err) {
        throw new Error(`Cannot get Products DB error 6 ${err}`);
      }
    });
  }
  getProductByID(id) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const conn = yield database_1.default.connect();
        const sql = 'select * from Products where id =' + id;
        const result = yield conn.query(sql);
        conn.release();
        return result.rows[0];
      } catch (err) {
        throw new Error(`Cannot get Products use id DB error 4 ${err}`);
      }
    });
  }
  DeleteProductByID(id) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const conn = yield database_1.default.connect();
        const sql = 'DELETE FROM products  WHERE id =' + id;
        const result = yield conn.query(sql);
        conn.release();
        return result.command;
      } catch (err) {
        throw new Error(`Cannot Delete Products use id DB error 7 ${err}`);
      }
    });
  }
  getAllDetialsProduct() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const conn = yield database_1.default.connect();
        const sql = 'select * from Products';
        const result = yield conn.query(sql);
        conn.release();
        return result.rows;
      } catch (err) {
        throw new Error(`Cannot get All Detials Products DB error 10 ${err}`);
      }
    });
  }
}
exports.ProductModel = ProductModel;
