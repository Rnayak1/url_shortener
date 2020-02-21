const express = require('express')
const mongoose = require('mongoose')

const router = express.Router();

//get 
router.get('/',(req,res)=>{
    res.send("get rout");
})
//post

module.exports = router;