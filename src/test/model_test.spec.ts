import { UserModel, User } from '../models/User-model';
import { AdminModel } from '../models/Admin-model';
import { ProductModel, Product } from '../models/Product-model';
import { CrediteModel, Credite } from '../models/Credit-model';

let resultNumer: number;
let resultString: string;
let userPro: User;
let Admin: User;
let resultuser: User[];
let resultProduct: Product[];
let Product: Product;
let Cart: Credite;

describe('test User Model', () => {
  beforeAll(async (done) => {
    await new UserModel().ClearAll();
    done();
  });
  it('Add first user as a admin', async (done) => {
    await new UserModel()
      .AddAdmin({
        email: 'Admin@test.com',
        name: 'mena afefe',
        password: '123456',
        id: 0,
        statue: 2,
        token: null,
        typeuser: 1
      })
      .then((res) => {
        resultNumer = res;
        done();
      });
    expect(resultNumer).toEqual(1);
  });
  it('Add first user as a User Client', async (done) => {
    await new UserModel()
      .AddUser({
        email: 'UserClient@test.com',
        name: 'mena afefe',
        password: '123456',
        id: 0,
        statue: 0,
        token: null,
        typeuser: 3
      })
      .then((res) => {
        resultNumer = res;
        done();
      });
    expect(resultNumer).toEqual(1);
  });
  it('Add first user as a User Client', async (done) => {
    await new UserModel()
      .AddUser({
        email: 'UserClientPRo@test.com',
        name: 'mena afefe',
        password: '123456',
        id: 0,
        statue: 0,
        token: null,
        typeuser: 3
      })
      .then((res) => {
        resultNumer = res;
        done();
      });
    expect(resultNumer).toEqual(1);
  });
  it('Add first user as a User Treader', async (done) => {
    await new UserModel()
      .AddUser({
        email: 'UserTradert@test.com',
        name: 'mena afefe',
        password: '123456',
        id: 0,
        statue: 0,
        token: '',
        typeuser: 2
      })
      .then((res) => {
        resultNumer = res;
        done();
      });
    expect(resultNumer).toEqual(1);
  });
  it('Find User By Email', async (done) => {
    await new UserModel()
      .FindUserByEmail('UserClientPRo@test.com')
      .then((res) => {
        userPro = res;
        done();
      });
    expect(userPro.email === 'UserClientPRo@test.com').toBe(true);
  });
  it('Find User By Type User', async (done) => {
    await new UserModel().FindBytypeuser(1).then((res) => {
      Admin = res;
      done();
    });
    expect(Admin.statue).toBe(2);
  });
  it('Get all User', async (done) => {
    await new UserModel().getAll().then((res) => {
      resultuser = res;
      done();
    });
    expect(resultuser.length).toBeGreaterThan(0);
  });
  it('Add Token to User To made Login User', async (done) => {
    await new UserModel()
      .AddUserToken('user Test Token', userPro.id)
      .then((res) => {
        resultNumer = res;
        done();
      });
    expect(resultNumer).toEqual(1);
  });
  it('Logout Remove ToKen From User', async (done) => {
    await new UserModel().LogoutUser(userPro.id).then((res) => {
      resultString = res;
      done();
    });
    expect(resultString === 'UPDATE').toBe(true);
  });
});

describe('test Admin Model', () => {
  it('Change Status ', async (done) => {
    const statue = Admin.statue == 1 ? 2 : 1;
    await new AdminModel().changeStatue(statue, Admin.id).then((res) => {
      resultString = res;
      done();
    });
    expect(resultString === 'UPDATE').toBe(true);
  });
  it('Upgread User', async (done) => {
    await new AdminModel().UpgredUser(2, userPro.id).then((res) => {
      resultString = res;
      done();
    });
    expect(resultString === 'UPDATE').toBe(true);
  });
});

describe('test Product Model', () => {
  it('Add Product From Trader', async (done) => {
    await new ProductModel()
      .ADDProduct({
        description: 'Test Added Descriptio from User',
        id: 0,
        id_user: userPro.id,
        name: 'test Product one',
        price: 36.5
      })
      .then((res) => {
        resultString = res;
        done();
      });
    expect(resultString === 'INSERT').toBe(true);
  });
  it('Get All Product for any one', async (done) => {
    await new ProductModel().getAllProduct().then((res) => {
      resultProduct = res;
      done();
    });
    expect(resultProduct.length).toBeGreaterThan(0);
  });
  it('Get All Product for Login', async (done) => {
    await new ProductModel().getAllDetialsProduct().then((res) => {
      resultProduct = res;
      done();
    });
    expect(resultProduct.length).toBeGreaterThan(0);
  });
  it('Edit Product From Trader', async (done) => {
    await new ProductModel()
      .EditProduct({
        description:
          'Test Added Descriptio from User after update and chenge price ti Up',
        id: 0,
        id_user: userPro.id,
        name: 'test Product one',
        price: 363.5
      })
      .then((res) => {
        resultString = res;
        done();
      });
    expect(resultString === 'UPDATE').toBe(true);
  });
  it('Get Product By Id', async (done) => {
    await new ProductModel().getProductByID(resultProduct[0].id).then((res) => {
      Product = res;
      done();
    });
    expect(Product.id_user === resultProduct[0].id_user).toBe(true);
  });
});
describe('test Carts Model', () => {
  it('Creat New Item To UserPro', async (done) => {
    await new CrediteModel()
      .CreateNewCredit({
        id: 0,
        id_user: userPro.id,
        totalprice: 0
      })
      .then((res) => {
        resultNumer = res;
        done();
      });
    expect(resultNumer).toBeGreaterThan(0);
  });
  it('Get Carts To UserPro', async (done) => {
    await new CrediteModel().getAllCrediteToUser(userPro.id).then((res) => {
      Cart = res;
      done();
    });
    expect(Cart.id_user).toEqual(userPro.id);
  });
  it('Add New Item To Carts UserPro', async (done) => {
    await new CrediteModel()
      .AddItemCredit({
        id: 0,
        id_card: Cart.id,
        id_product: Product.id,
        quantity: 1,
        totalprice: Product.price
      })
      .then((res) => {
        new CrediteModel().CalculateTotalPrice(Cart.id);
        resultString = res;
        done();
      });
    expect(resultString === 'INSERT').toBe(true);
  });
  it('Delete Item from Carts UserPro', async (done) => {
    await new CrediteModel().DeleteItem(Cart.id, Product.id).then((res) => {
      new CrediteModel().CalculateTotalPrice(Cart.id);
      resultNumer = res;
      done();
    });
    expect(resultNumer).toEqual(1);
  });
  it('Delete Product By Id', async (done) => {
    await new ProductModel()
      .DeleteProductByID(resultProduct[0].id)
      .then((res) => {
        resultString = res;
        done();
      });
    expect(resultString === 'DELETE').toBe(true);
  });
});
