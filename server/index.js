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

const port = process.env.port || 5000;

app.listen(port,()=> console.log(`server on ${port}`));