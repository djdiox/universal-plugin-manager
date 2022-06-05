import express from 'express';
import nodemon from 'nodemon';
import {DbHandler} from './src/db/plugin-db-adapter';
const app = express.Router({});

app.use(express.static('public'))
const sendResponse = (data = Object, code = 200) => {
 return {
     body: JSON.stringify(data),
     statusCode: code
 }
}

app.get('/list/:platform', async (req, res) => {
    console.log('Received request', req);
    // var data = DbHandler(req.params.platform, req.query.limit. req.query.page);
    // const response = {success: true, data, mesage:'Successfully retrieved plugin list'};
    // return sendResponse(res)s
    res.send('Express + TypeScript Server');
  });

app.post('/callback', async (req, res) => {
    console.log('Received request', req);
})