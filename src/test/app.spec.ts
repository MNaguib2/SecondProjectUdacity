import supertest from 'supertest';
import app from '../app';
import { ResponseExpres } from '../definitionfile';
import { User, UserModel } from '../models/User-model';
import { Product } from '../models/Product-model';

const request = supertest(app);
export let Data: ResponseExpres;
let Token: string;
let userPro: User;
let resultuser: User[];
let resultProduct: Product[];
let Product: Product;

describe('test SignUp', () => {
  beforeAll(async (done) => {
    await new UserModel().ClearAll();
    done();
  });
  it('SignUp Admin', async (done) => {
    await request
      .post('/Auth/signUp')
      .send({ email: 'Admin@test.com', name: 'mena afefe', password: '123456' })
      .then((res) => {
        Data = res as unknown as ResponseExpres;
        if ((Data.status as unknown as number) !== 201)
          done.fail(Data._body.message);
        done();
      });
  });
  it('SignUp User Pro to Upgread', async (done) => {
    await request
      .post('/Auth/signUp')
      .send({
        email: 'userPro@test.com',
        name: 'mena afefe',
        password: '123456'
      })
      .then((res) => {
        Data = res as unknown as ResponseExpres;
        if ((Data.status as unknown as number) !== 201)
          done.fail(Data._body.message);
        done();
      });
  });
  it('SignUp User Client', async (done) => {
    await request
      .post('/Auth/signUp')
      .send({
        email: 'userclient@test.com',
        name: 'mena afefe',
        password: '123456'
      })
      .then((res) => {
        Data = res as unknown as ResponseExpres;
        if ((Data.status as unknown as number) !== 201)
          done.fail(Data._body.message);
        done();
      });
  });

  it('Confirm Login', async (done) => {
    await request
      .put('/Auth/signIn')
      .send({ email: 'admin@test.com', password: '123456' })
      .then((res) => {
        Data = res as unknown as ResponseExpres;
        done();
      });
    Token = Data._body.Token;
    expect(Data.status).toEqual(202);
    if ((Data.status as unknown as number) !== 202)
      done.fail(Data._body.message);
  });
});
describe('Test Admin URl', () => {
  it('test Show All User ', async (done) => {
    await request
      .get('/Admin/Users')
      .set('Token', Token)
      .then((res) => {
        Data = res as unknown as ResponseExpres;
        done();
      });
    resultuser = Data._body.users;
    expect(Data.status).toEqual(200);
    if ((Data.status as unknown as number) !== 200)
      return done.fail(Data._body.message);
  });
  it('test Change Statue ', async (done) => {
    await request
      .put('/Admin/changestatue')
      .set('Token', Token)
      .then((res) => {
        Data = res as unknown as ResponseExpres;
        done();
      });
    expect(Data.status).toEqual(200);
    if ((Data.status as unknown as number) !== 200)
      return done.fail(Data._body.message);
  });
  it('test Upgrad User ', async (done) => {
    userPro = resultuser.find(
      (user) => user.email === 'userpro@test.com'
    ) as User;
    await request
      .put('/Admin/upgredUser')
      .set('Token', Token)
      .send({ id: userPro.id, typeuser: 2 })
      .then((res) => {
        Data = res as unknown as ResponseExpres;
        done();
      });
    expect(Data.status).toEqual(200);
    if ((Data.status as unknown as number) !== 200)
      return done.fail(Data._body.message);
  });
});

describe('Test Product URl', () => {
  it('test Add New Product from Trader Or Admin', async (done) => {
    await request
      .post('/Product/addProduct')
      .set('Token', Token)
      .send({
        name: 'test New Product',
        price: 54.8,
        description: 'tes Write any Description to this New Product'
      })
      .then((res) => {
        Data = res as unknown as ResponseExpres;
        done();
      });
    expect(Data.status).toEqual(201);
    if ((Data.status as unknown as number) !== 201)
      return done.fail(Data._body.message);
  });
  it('test Add New Product from Trader Or Admin', async (done) => {
    await request
      .post('/Product/addProduct')
      .set('Token', Token)
      .send({
        name: 'test New Product to test cart',
        price: 54.8,
        description:
          'tes Write any Description to this New Product this Product will use to test add cart'
      })
      .then((res) => {
        Data = res as unknown as ResponseExpres;
        done();
      });
    await request
      .post('/Product/addProduct')
      .set('Token', Token)
      .send({
        name: 'Product to test cart View',
        price: 20.99,
        description:
          'tes Write any Description to this New Product this Product will use to test add cart'
      })
      .then((res) => {
        Data = res as unknown as ResponseExpres;
        done();
      });
    expect(Data.status).toEqual(201);
    if ((Data.status as unknown as number) !== 201)
      return done.fail(Data._body.message);
  });
  it('test Show All Product to Client ', async () => {
    await request
      .get('/Client')
      .set('Token', Token)
      .then((res) => {
        Data = res as unknown as ResponseExpres;
        resultProduct = Data._body.Products;
      });
    expect(Data.status).toEqual(200);
  });
  it('test Edit Exist Product from Trader or Admin', async (done) => {
    await request
      .put(`/Product/EditProduct/${resultProduct[0].id}`)
      .set('Token', Token)
      .send({
        name: 'test New Product',
        price: 3.5,
        description: 'tes Write any Description to this New Product'
      })
      .then((res) => {
        Data = res as unknown as ResponseExpres;
        done();
      });
    expect(Data.status).toEqual(200);
    if ((Data.status as unknown as number) !== 200)
      return done.fail(Data._body.message);
  });

  it('test deleteProduct Exist Product from Trader or Admin', async (done) => {
    await request
      .delete(`/Product/deleteProduct/${resultProduct[0].id}`)
      .set('Token', Token)
      .then((res) => {
        Data = res as unknown as ResponseExpres;
        done();
      });
    expect(Data.status).toEqual(200);
    if ((Data.status as unknown as number) !== 200)
      return done.fail(Data._body.message);
  });
});

describe('Test Cart URl', () => {
  let ResponseData: ResponseExpres;
  it('test add Product to Cart User ', async (done) => {
    await request
      .post(`/Cart/addItemCart/${resultProduct[1].id}`)
      .set('Token', Token)
      .then((res) => {
        ResponseData = res as unknown as ResponseExpres;
        done();
      });
    await request
      .post(`/Cart/addItemCart/${resultProduct[2].id}`)
      .set('Token', Token)
      .then((res) => {
        ResponseData = res as unknown as ResponseExpres;
        done();
      });
    expect(ResponseData.status).toEqual(200);
    if ((ResponseData.status as unknown as number) !== 200)
      return done.fail(ResponseData._body.message);
  });
  it('test Delete Product from Cart User ', async (done) => {
    await request
      .delete(`/Cart/deleteProduct/${resultProduct[1].id}`)
      .set('Token', Token)
      .then((res) => {
        ResponseData = res as unknown as ResponseExpres;
        done();
      });
    expect(ResponseData.status).toEqual(200);
    if ((ResponseData.status as unknown as number) !== 200)
      return done.fail(ResponseData._body.message);
  });
  it('test show all Product from Cart User ', async (done) => {
    await request
      .get('/Cart')
      .set('Token', Token)
      .then((res) => {
        ResponseData = res as unknown as ResponseExpres;
        done();
      });
    expect(ResponseData.status).toEqual(200);
    if ((ResponseData.status as unknown as number) !== 200)
      return done.fail(ResponseData._body.message);
  });
});

describe('Test Client URl', () => {
  let ResponseData: ResponseExpres;
  it('test Show All Product to Client ', async () => {
    await request
      .put('/Client/logout')
      .set('Token', Token)
      .then((res) => {
        ResponseData = res as unknown as ResponseExpres;
      });
    expect(ResponseData.status).toEqual(200);
  });
});
