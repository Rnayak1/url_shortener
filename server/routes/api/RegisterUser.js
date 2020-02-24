const express = require('express')
const mongoose = require('mongoose')
const crypto = require('crypto')
const ndoemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const axios = require('axios')
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
    //const token = crypto.randomBytes(10).toString('hex');
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
        data.username = user.username;
        data.email = user.email;
        const token = jwt.sign(data, "secretKey", {
            algorithm: 'HS256',
            expiresIn: '1d'
        })
        user.status = "inactive";
        console.log(user)
        //sendMail(req, token);
        res.send({
            error: "false",
            message: "Please verify your email id",
            token
        })
        const document = new model.userModel(user);
        document.save((err, resp) => {
            if (err)
                console.log("err")
            else
                console.log(resp)
        });
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
router.post('/verify', async (req, res) => {
    const { token } = req.body.token;
    const response = jwt.verify(token, 'secretKey', (err, data) => {
        if (err)
            return err
        else
            return data
    })
    console.log(response);
    res.send(response)
})

router.post('/login', async (req, res) => {
    console.log(req.body);
    const response = await model.loginModel.findOne({ email: req.body.user.email.toLowerCase() })
    if (response && (response.password == req.body.user.password)) {
        const token = jwt.sign({
            username: response.email
        }, 'secretKey', {
            algorithm: 'HS256',
            expiresIn: '1d'
        })
        res.send({
            errorStatus: false,
            token
        });
    }

    else
        res.send({
            errorStatus: true,
            error: " Invalid UserName/Password"
        })
});

router.post('/generate', verifyToken, async (req, res) => {
    console.log(req.body);
    jwt.verify(req.token, 'secretKey', async (err, data) => {
        if (err) {
            err.status = "error"
            res.json(err);
        }
        else {
            console.log(data)
            if (req.body.url.passed == '' || req.body.url.passed.length < 6) {
                // generate url
                req.body.url.passed = crypto.randomBytes(6).toString('hex');
            }
            console.log(req.body.url.orignal.toString());
            const doExist = await model.urlModel.findOne({ hashLink: req.body.url.passed.toString() });
            if (doExist !== null) {
                if (req.body.url.passed == '' || req.body.url.passed.length < 6)
                    messageSend = " Failed to generate, Try again"
                else
                    messageSend = "this url has already been taken"
                res.json({
                    status: "error",
                    message: messageSend
                })
            }
            else {
                const obj = {
                    userId: data.username,
                    orignalLink: req.body.url.orignal.toString(),
                    hashLink: req.body.url.passed.toString()
                }
                const object = new model.urlModel(obj);
                object.save((err, response) => {
                    if (err) {
                        res.send({
                            status: "error",
                            message: "internal server Error, Fail to generate"
                        })
                    }
                    else {
                        res.send({
                            status: "success",
                            shortUrl: req.body.url.passed
                        });
                    }
                });
            }


        }
    })

})

router.post('/getlink', async (req, res) => {
    //get user ip
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(req.body)
    await model.urlModel.find({ hashLink: req.body.url.hashLink }, (err, data) => {
        if (err) {
            err.status = "error"
            res.send(err)
        }
        else {
            if (data == undefined || data == null || data.length == 0)
                res.json({
                    status: "error",
                    message: "no such link exist"
                })
            else {
                res.json({
                    status: "success",
                    redirectUrl: data[0].orignalLink
                });
                //saveClick(ip,data[0].hashLink);
                saveClick('24.48.0.1', data[0].hashLink);

            }
        }
    })
})

function verifyToken(req, res, next) {
    if (req.headers.token !== undefined && req.headers.token !== '') {
        req.token = req.headers.token;
        next();
    }
    else
        res.sendStatus(403);
}

async function saveClick(clientip, hashlink) {

    if (clientip == '::1') {
        console.log('localHost')
        return
    }
    else {
        const endpoint = `http://ip-api.com/json/${clientip}?fields=8953`;
        const response = await axios.get(endpoint);
        console.log(response.data)
        const clickData = response.data;
        clickData.hashLink = hashlink;
        const object = new model.clickModel(clickData);
        object.save((err, data) => {
            if (err)
                console.log(err)
            else
                console.log(data);
        });
    }

}
module.exports = router;