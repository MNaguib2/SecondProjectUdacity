import supertest from 'supertest';
import app from '../app';
import { ResponseExpres } from '../definitionfile';
import { UserModel } from '../models/User-model';

const request = supertest(app);
export let Data : ResponseExpres;
describe('test SignUp', () => {
    beforeAll(async (done) => {
        await new UserModel().ClearAll();
        done();
        request.post('/Auth/signUp').send({'email': 'test@test.com', 'name':'mena afefe' , 'password': '123456'})
        .then((res) => {
            Data = res as unknown as ResponseExpres;
            if((Data.status as unknown as number) !== 201) done.fail(Data._body.message);
            done();
        })
    })
    it('Confirm Login', async (done) => {
        await request.put('/Auth/signIn').send({'email': 'test@test.com', 'password': '123456'})
        .then(res  => {
           Data = res as unknown as ResponseExpres;
           done();
        })
        expect(Data.status).toEqual(202);
        if((Data.status as unknown as number) !== 202) done.fail(Data._body.message);         
  });
});

describe('Test Admin URl' , () =>{
    let ResponseData : ResponseExpres;  
        xit('test Change Statue ' , async (done) => {           
           await request.put('/Admin/changestatue').set('Token', Data._body.Token).then(res => {
            ResponseData = res as unknown as ResponseExpres;
            done();
            });
            expect(ResponseData.status).toEqual(200);
            if((ResponseData.status as unknown as number) !== 200) return done.fail(ResponseData._body.message); 
        })
        xit('test Upgrad User ' , async (done) => {           
            await request.put('/Admin/upgredUser').set('Token', Data._body.Token).send({"id" : 5, "typeuser": 2}).then(res => {
             ResponseData = res as unknown as ResponseExpres;
             done();
             });
             expect(ResponseData.status).toEqual(200);
             if((ResponseData.status as unknown as number) !== 200) return done.fail(ResponseData._body.message); 
         })
         xit('test Show All User ' , async (done) => {           
            await request.get('/Admin/Users').set('Token', Data._body.Token).then(res => {
             ResponseData = res as unknown as ResponseExpres;
             done();
             });
             console.log(ResponseData._body)
             expect(ResponseData.status).toEqual(200);
             if((ResponseData.status as unknown as number) !== 200) return done.fail(ResponseData._body.message); 
         })
})

describe('Test Product URl' , () =>{
    let ResponseData : ResponseExpres;  
        xit('test Add New Product from Trader ' , async (done) => {           
           await request.post('/Product/addProduct').set('Token', Data._body.Token).send({
            'name': 'test New Product',
            'price': 54.8,
            'description' : 'tes Write any Description to this New Product'
           }).then(res => {
            ResponseData = res as unknown as ResponseExpres;
            done();
            });
            //console.log(ResponseData._body)
            expect(ResponseData.status).toEqual(201);
            if((ResponseData.status as unknown as number) !== 201) return done.fail(ResponseData._body.message); 
        })

        xit('test Edit Exist Product from Trader or Admin' , async (done) => {           
            await request.put('/Product/EditProduct/7').set('Token', Data._body.Token).send({
             'name': 'test New Product',
             'price': 3.5,
             'description' : 'tes Write any Description to this New Product'
            }).then(res => {
             ResponseData = res as unknown as ResponseExpres;
             done();
             });
             expect(ResponseData.status).toEqual(200);
             if((ResponseData.status as unknown as number) !== 200) return done.fail(ResponseData._body.message); 
         })

         xit('test deleteProduct Exist Product from Trader or Admin' , async (done) => {           
            await request.delete('/Product/deleteProduct/9').set('Token', Data._body.Token).then(res => {
             ResponseData = res as unknown as ResponseExpres;
             done();
             });
             expect(ResponseData.status).toEqual(200);
             if((ResponseData.status as unknown as number) !== 200) return done.fail(ResponseData._body.message); 
         })
})

xdescribe('Test Cart URl' , () =>{
    let ResponseData : ResponseExpres;  
        it('test add Product to Cart User ' , async (done) => {           
           await request.post('/Cart/addItemCart/2').set('Token', Data._body.Token).then(res => {
            ResponseData = res as unknown as ResponseExpres;
            done();
            });
            expect(ResponseData.status).toEqual(200);
            if((ResponseData.status as unknown as number) !== 200) return done.fail(ResponseData._body.message); 
        })
        it('test Delete Product from Cart User ' , async (done) => {           
            await request.delete('/Cart/deleteProduct/2').set('Token', Data._body.Token).then(res => {
             ResponseData = res as unknown as ResponseExpres;
             done();
             });
             expect(ResponseData.status).toEqual(200);
             if((ResponseData.status as unknown as number) !== 200) return done.fail(ResponseData._body.message); 
         })
         it('test show all Product from Cart User ' , async (done) => {           
            await request.get('/Cart').set('Token', Data._body.Token).then(res => {
             ResponseData = res as unknown as ResponseExpres;
             done();
             });
             console.log(ResponseData._body)
             expect(ResponseData.status).toEqual(200);
             if((ResponseData.status as unknown as number) !== 200) return done.fail(ResponseData._body.message); 
         })
})


describe('Test Client URl' , () =>{
    let ResponseData : ResponseExpres;  
        xit('test Show All Product to Client ' , async () => {           
           await request.get('/Client').set('Token', Data._body.Token).then(res => {
            ResponseData = res as unknown as ResponseExpres;
            });
            console.log(ResponseData._body)
            expect(ResponseData.status).toEqual(200);
        })
        xit('test Show All Product to Client ' , async () => {           
            await request.put('/Client/logout').set('Token', Data._body.Token).then(res => {
             ResponseData = res as unknown as ResponseExpres;
             });             
             expect(ResponseData.status).toEqual(200);
         })
})

//console.log(ResponseData._body)