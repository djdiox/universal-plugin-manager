import express, { Request, Response, NextFunction } from 'express';
import nodemon from 'nodemon';
import {DbHandler} from './src/db/plugin-db-adapter';
import AppController from './src/app-controller'
const app = express();
const port = 3000;
app.use(express.static('public'));
const sendResponse = (data = Object, code = 200) => {
 return {
     body: JSON.stringify(data),
     statusCode: code
 }
}

app.get('/list/:platform', async function (req: Request, res: Response) {
        console.log('Received request', req);
        // var data = DbHandler(req.params.platform, req.query.limit. req.query.page);
        // const response = {success: true, data, mesage:'Successfully retrieved plugin list'};
        // return sendResponse(res)s
        res.send('Express + TypeScript Server');
    });

app.post('/callback', async (req: Request, res: Response) => {
    console.log('Received request', req);
})

app.get('/apps', async (req: Request, res: Response) => {
    console.log('Received request', req);
})

app.listen(port, () => {
    console.log(`local servera is running on port ${port}. (http://localhost:${port})`);
  });