require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

//app initialization
const app = express();

//middlleware
app.use(bodyParser.json());
app.use(cors());

const api = require('./routes/api/RegisterUser')
app.use('/api',api);
app.all('*',(req,res)=>{
    res.sendStatus(404);
})
const port = process.env.PORT || 5000;

app.listen(port,()=> console.log(`server on ${port}`));