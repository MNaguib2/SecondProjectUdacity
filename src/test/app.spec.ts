import supertest from 'supertest';
import app from '../app';
import { ResponseExpres } from '../definitionfile';

const request = supertest(app);
let Data : ResponseExpres;
describe('test SignUp', () => {
    beforeAll((done) => {
        request.post('/Auth/signUp').send({'email': 'test@test.com', 'name':'mena afefe' , 'password': '123456'})
        .then((res) => {
            Data = res as unknown as ResponseExpres;
            //if((Data.status as unknown as number) !== 201) done.fail(Data._body.message);
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

