import express from 'express';
import nodemon from 'nodemon';
import PluginCrudWrapper from './db/db-crud';
const app = express.Router({});

app.use(express.static('public'))
const sendResponse = (data = Object, code = 200) => {
 return {
     body: JSON.stringify(data),
     statusCode: code
 }
}

app('/list/:platform', function(req, res) {
    console.log('Received request'. req);
    var data = PluginCrudWrapper.read(req.params.platform, req.query.limit. req.query.page);
    const response = {success: true, data, mesage:'Successfully retrieved plugin list'};
    return sendResponse(response)
})