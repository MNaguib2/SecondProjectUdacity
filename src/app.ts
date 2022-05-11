import cors from "cors";
import Express, { Request, Response, ErrorRequestHandler, NextFunction } from "express";
import AuthRout from './route/Authentication-route';
import AdminRout from './route/Admin-Route';
import ProductRout from './route/Product-route';
import { AdminMiddleWare } from './MiddleWare/Admin-middleware';
import bodyParser from "body-parser";
import { productmiddleware } from "./MiddleWare/Product-MiddleWare";
import { ClientMiddleWare, CridetMiddleWare } from "./MiddleWare/Client-MiddleWare";
import { ProductModel } from "./models/Product-model";
import ClientRout from './route/client-route'
import CreditRout from './route/Credit-Route'
const app = Express();


const corsOptions = {
  origin: 'http://someotherdomain.com',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use('/Auth', AuthRout)
app.use('/Admin', AdminMiddleWare , AdminRout);
app.use('/Product', productmiddleware , ProductRout);
app.use('/Client', ClientMiddleWare , ClientRout);
app.use('/Cart', CridetMiddleWare , CreditRout)

app.use('**', (req: Request, res: Response) => {
  new ProductModel().getAllProduct()
  .then(Products => {
    if(Products){
      res.status(404).json({
        message: 'Not Page Found Incorrect URL',
        Products : Products
      })
    }else{
      res.status(404).json({
        message: 'Not Page Found Incorrect URL',
        Products : 'Not Found Any Product'
      })
    }
  }).catch(err => {
    console.log('This is main Error this rarely happen' + err )
  })  
})


app.use((error: ErrorRequestHandler, req: Request, res: Response, next : NextFunction) => {
  //console.log('test From app');
  try
  {
  const StatusCode = Number(error.toString().split(':')[0].trim());
  //console.log(StatusCode);
  if(isNaN(StatusCode))  throw new Error(error.toString());
  const message = error.toString().split(':')[1].trim();
  return res.status(StatusCode).json({
    message: message,
    StatusCode: StatusCode
  })
} catch (err: unknown) {
  console.log(err);
  return res.status(404).json({
    message: "Occur Error! Unexpected Please Call Developer",
  })
}
    next();
})

app.listen({ port: 3000 }, () => {
  console.log('server Running Ok !!');
});

export default app;