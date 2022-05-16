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
const supertest_1 = __importDefault(require('supertest'));
const app_1 = __importDefault(require('../app'));
const request = (0, supertest_1.default)(app_1.default);
let Data;
describe('test SignUp', () => {
  beforeAll((done) => {
    request
      .post('/Auth/signUp')
      .send({ email: 'test@test.com', name: 'mena afefe', password: '123456' })
      .then((res) => {
        Data = res;
        //if((Data.status as unknown as number) !== 201) done.fail(Data._body.message);
        done();
      });
  });
  it('Confirm Login', (done) =>
    __awaiter(void 0, void 0, void 0, function* () {
      yield request
        .put('/Auth/signIn')
        .send({ email: 'test@test.com', password: '123456' })
        .then((res) => {
          Data = res;
          done();
        });
      expect(Data.status).toEqual(202);
      if (Data.status !== 202) done.fail(Data._body.message);
    }));
});
describe('Test Admin URl', () => {
  let ResponseData;
  it('test Change Statue ', () =>
    __awaiter(void 0, void 0, void 0, function* () {
      yield request
        .put('/changestatue')
        .set('Token', `'${Data._body.Token}'`)
        .then((res) => {
          ResponseData = res;
        });
      console.log(Data._body.Token);
    }));
});
