const express = require('express');
const morgan = require('morgan');
const bosyparser = require('body-parser');
const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(morgan('dev'));//morgan middleware is to log server requests

app.use(bosyparser.json());//middleware to handle json data from request

app.use(express.static(__dirname + '/public'));//using built-in middleware static to server static html

//support for restApi endpoints
app.all('/campsites',(req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
})

app.get('/campsites',(req,res)=>{
    res.end('Will send all the campsites to you');
})

app.post('/campsites',(req,res)=>{
    res.end(`Will add the campsite:${req.body.name} with description:${req.body.description}`);
})

app.put('/campsites',(req,res)=>{
    res.statusCode=403;
    res.end('PUT operation not supported on /campsites')
})

app.delete('/campsites',(req,res)=>{
    res.end('Deleting all Campsites');
})

app.get('/campsites/:campsiteId',(req,res)=>{
    res.end(`Will send campsites:${req.params.campsiteId} to you`);
})

app.post('/campsites/:campsiteId',(req,res)=>{
    res.statusCode=403;
    res.end('POST operation not supported on /campsites')
})

app.put('/campsites/:campsiteId',(req,res)=>{
    res.write(`Updating the campsite:${req.params.campsiteId}\n`);
    res.end(`Will add the campsite:${req.body.name} with description:${req.body.description}`)
})

app.delete('/campsites/:campsiteId',(req,res)=>{
    res.end(`Deleting Campsites:${req.params.campsiteId}`);
})

app.use((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is an Express Server</h1></body></html>');
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});