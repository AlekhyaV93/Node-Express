const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const campsiteRouter = require('./routes/campsiteRouter');
const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(morgan('dev'));//morgan middleware is to log server requests

app.use(bodyparser.json());//middleware to handle json data from request

app.use('/campsites',campsiteRouter);

app.use(express.static(__dirname + '/public'));//using built-in middleware static to server static html

//support for restApi endpoints
app.all('/campsites',(req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})

app.use((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});