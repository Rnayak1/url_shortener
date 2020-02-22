const express = require('express')
const mongoose = require('mongoose')
const crypto= require('crypto')
const ndoemailer = require('nodemailer')
const router = express.Router();
//connecting database
const conn = mongoose.connect('mongodb://localhost/clickAssignment',{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true
})
.then(res => {})
.catch(err => console.log(err))
// configuring nodemailer

const transporter = ndoemailer.createTransport({
    pool : true,
    host : "c04.tmdcloud.asia",
    port : 465,
    secure : true,
    auth :{
        user : "rohit@adsxeniumtechnology.com",
        pass : "Rekoj@123"
    }
});

//import model
const User = require('../../models/UserModel')

//RegisterUser
router.get('/register',async(req,res)=>{
    console.log(req.body)
    res.send("hello");
   /*const data = new User({
       username : "Rohit",
       email : "rohitn116@gmail.com",
       password : "abc@123",
       contact : 7827113162,
       verifyToken : "abc"
   });
   await data.save()
        .then((response) => res.send(response))
        .catch(err => res.send(err));*/
})
//post
router.post('/register',async (req,res)=>{
    //generate token
    const token = crypto.randomBytes(10).toString('hex');
    //configure mail
    const mailOptions = {
        from : "rohit@adsxeniumtechnology.com",
        to : "rohitadsxenium@gmail.com",
        subject : "Verify Your Account",
        text : `this is token  ${token}`,
        html : ` <div>
                    please click verify button to Verify your account 
                    <br>
                    <center>
                        <a href="http://${req.headers.host}/api/verify?token=${token}" style="button"> Verify</a>
                    </center>
                </div>`
    };
    //send mail
    transporter.sendMail(mailOptions,(err,resp)=>{
        if(err)
            res.send(err)
        else
            res.send(resp);
    })
});

// VerifyUser
router.get('/verify',async (req,res)=>{
        
    // transporter.verify((err,resp)=>{
    //     if(err)
    //         res.send(err)
    //     else
    //         res.send(resp);
    // })
    
    
    res.send(req.query)
})
module.exports = router;