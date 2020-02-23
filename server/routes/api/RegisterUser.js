const express = require('express')
const mongoose = require('mongoose')
const crypto = require('crypto')
const ndoemailer = require('nodemailer')
const router = express.Router();
//connecting database
const conn = mongoose.connect('mongodb://localhost/clickAssignment', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(res => { })
    .catch(err => console.log(err))
// configuring nodemailer

const transporter = ndoemailer.createTransport({
    pool: true,
    host: "c04.tmdcloud.asia",
    port: 465,
    secure: true,
    auth: {
        user: "rohit@adsxeniumtechnology.com",
        pass: "Rekoj@123"
    }
});

//import model
const model = require('../../models/UserModel')
//RegisterUser
router.get('/register', async (req, res) => {
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

//post Register
router.post('/register', async (req, res) => {
    //generate token
    let data = {}
    const token = crypto.randomBytes(10).toString('hex');
    console.log(req.body);
    const { user } = req.body;
    const doExist = await model.loginModel.findOne({ email: user.email })
    if (doExist) {
        res.send({
            error: "true",
            message: "User already exist for this mail"
        });
    }
    else {
        user.status = "inactive";
        user.token = token;
        console.log(user)
        //sendMail(req, token);
        console.log(result)
        res.send({
            error: "false",
            message: "Please verify your email id"
        })
    }
    async function sendMail(req, token) {
        //configure mail
        const mailOptions = {
            from: "rohit@adsxeniumtechnology.com",
            to: "rohitadsxenium@gmail.com",
            subject: "Verify Your Account",
            html: ` <div>
                    please click verify button to Verify your account 
                    <br>
                    <center>
                        <a type="button" href="http://${req.headers.host}/verify?token=${token}" style="button"> Verify</a>
                    </center>
                </div>`
        };
        //send mail
        transporter.sendMail(mailOptions, (err, resp) => {
            if (err)
                return ({
                    error: true,
                    data: err
                })
            else
                return ({
                    error: false,
                    data: resp
                })
        })
    }
});

// VerifyUser
router.get('/verify', async (req, res) => {
    res.send(req.query)
})

router.post('/login', async (req, res) => {
    console.log(req.body);
    const response = await model.loginModel.findOne({ email: req.body.user.email.toLowerCase() })
    if (response && (response.password == req.body.user.password))
        res.send({
            errorStatus: false,
            name: response.username,
            id: response._id
        });
    else
        res.send({
            errorStatus: true,
            error: " Invalid UserName/Password"
        })
});

router.post('/generate', async (req, res) => {
    console.log(req.body);
    if (req.body.url.passed == '' || req.body.url.passed.length < 6) {
        // generate url
        req.body.url.passed = crypto.randomBytes(6).toString('hex')
    }
    console.log(req.body.url.orignal.toString());
    res.send({
        status: true,
        shortUrl: req.body.url.passed
    });
})
module.exports = router;