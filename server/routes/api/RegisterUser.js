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
    res.send("Hello, Got Here By Mistake");
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
            status: "success",
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
    jwt.verify(token, 'secretKey', (err, data) => {
        if (err) {
            if (err.name == 'TokenExpiredError') {
                const payload = jwt.verify(token, 'secretKey', { ignoreExpiration: true });
                console.log(payload.email);
                model.userModel.deleteOne({ email: payload.email }, (err, suc) => {
                    if (err)
                        console.log(err)
                    else
                        console.log(suc)
                });
                message = "link has been expired, Please Register Again";
            }

            else
                message = "invalid User/Email";
            res.json({
                status: "error",
                message
            })
        }
        else {
            model.userModel.findOne({ email: data.email }, (err, response) => {
                if (err) {
                    res.json({
                        status: "error",
                        message: "User Not registerd"
                    })
                }
                else {
                    console.log(response)
                    if (response.status != 'inactive') {
                        res.json({
                            status: "error",
                            message: "Already Verified! Please Login"
                        })
                    }
                    else {
                        model.userModel.updateOne({ email: response.email }, { $set: { status: "active" } }, (err, resp) => {
                            if (err) {
                                res.json({
                                    status: "error",
                                    message: err
                                })
                            }
                            else {
                                res.json({
                                    status: "success",
                                    message: "Email verified, Please login"
                                })
                            }

                        })
                    }
                }

            })
            return data
        }

    })
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
            status: "success",
            message: token,
            username : response.username
        });
    }

    else
        res.send({
            status: "error",
            message: " Invalid UserName/Password"
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
                    message: data[0].orignalLink
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
        res.json({
            status: "error",
            message: "Unautorised User"
        });
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