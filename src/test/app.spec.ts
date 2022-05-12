import supertest from 'supertest';
import app from '../app';
import { ResponseExpres } from '../definitionfile';

const request = supertest(app);
let Data : ResponseExpres;
describe('test SignUp', () => {
    // beforeAll((done) => {
    //     request.post('/Auth/signUp').send({'email': 'test2@test.com', 'name':'mena afefe' , 'password': '123456'})
    //     .then((res) => {
    //         Data = res as unknown as ResponseExpres;
    //         //if((Data.status as unknown as number) !== 201) done.fail(Data._body.message);
    //         done();
    //     })
    // })
    it('Confirm Login', async (done) => {
        await request.put('/Auth/signIn').send({'email': 'test2@test.com', 'password': '123456'})
        .then(res  => {
           Data = res as unknown as ResponseExpres;
           done();
        })
        expect(Data.status).toEqual(202);
        if((Data.status as unknown as number) !== 202) done.fail(Data._body.message);         
  });
});
xdescribe('Test Admin URl' , () =>{
    let ResponseData : ResponseExpres;  
        it('test Change Statue ' , async (done) => {           
           await request.put('/Admin/changestatue').set('Token', Data._body.Token).then(res => {
            ResponseData = res as unknown as ResponseExpres;
            done();
            });
            expect(ResponseData.status).toEqual(200);
            if((ResponseData.status as unknown as number) !== 200) return done.fail(ResponseData._body.message); 
        })
        it('test Upgrad User ' , async (done) => {           
            await request.put('/Admin/upgredUser').set('Token', Data._body.Token).send({"id" : 4, "typeuser": 2}).then(res => {
             ResponseData = res as unknown as ResponseExpres;
             done();
             });
             expect(ResponseData.status).toEqual(200);
             if((ResponseData.status as unknown as number) !== 200) return done.fail(ResponseData._body.message); 
         })
         it('test Show All User ' , async (done) => {           
            await request.get('/Admin/Users').set('Token', Data._body.Token).then(res => {
             ResponseData = res as unknown as ResponseExpres;
             done();
             });
             expect(ResponseData.status).toEqual(200);
             if((ResponseData.status as unknown as number) !== 200) return done.fail(ResponseData._body.message); 
         })
})

describe('Test Product URl' , () =>{
    let ResponseData : ResponseExpres;  
        it('test Add New Product from Trader ' , async () => {           
           await request.post('/Product/addProduct').set('Token', Data._body.Token).send({
            'name': 'test New Product',
            'price': 54.8,
            'description' : 'tes Write any Description to this New Product'
           }).then(res => {
            ResponseData = res as unknown as ResponseExpres;
            });
            console.log(ResponseData._body)
            expect(ResponseData.status).toEqual(201);
        })
})

describe('Test Client URl' , () =>{
    let ResponseData : ResponseExpres;  
        it('test Show All Product to Client ' , async () => {           
           await request.get('/Client').set('Token', Data._body.Token).then(res => {
            ResponseData = res as unknown as ResponseExpres;
            });
            expect(ResponseData.status).toEqual(200);
        })
        it('test Show All Product to Client ' , async () => {           
            await request.put('/Client/logout').set('Token', Data._body.Token).then(res => {
             ResponseData = res as unknown as ResponseExpres;
             });             
             expect(ResponseData.status).toEqual(200);
         })
})

//console.log(ResponseData._body)