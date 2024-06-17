/*
File to demonstrate user signup, login and Logout features
*/

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const dbConnection = require("../database")
const dotenv = require("dotenv");
dotenv.config({path: "./config.env"});

const constant = require("../utils/constant");
const asynErrorHandler = require("../utils/asyncErrorHanlder");

fetchUserRecord((email)=>{
    dbConnection.query("SELECT * FROM players.cricketers WHERE email = ?", [email] , (err,result)=>{
        if(err) throw err;
        return result;
    })
});

insertUserRecord((newUser)=>{
    let _insertQuery = `INSERT INTO players.users (name, email, password, isAdmin, CreatedAt) VALUES(?,?,?,?,?)`;
    dbConnection.query(_insertQuery,[newUser.name, newUser.email, newUser.password,newUser.isAdmin, newUser.createdAt], (err,rows)=>{
        if(err) throw err;
        return rows.insertId;
    })
})

// Method to user registration to database
// Method validate the user email registered ot not
// Method generate haspassword then save to database
exports.userRegister = asynErrorHandler(async(req,res,next)=>{
    let email = req.body.email;
    let name = req.body.name;
    let password = req.bosy.password;

    const record = await fetchUserRecord(email);

    if(record){
        return res.status(400).send({
            message: constant.USER_ALREADY_REGISTERED,
        });
    } else{
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(password, salt);
        const _newUser = ({
                  name,
                  email,
                  password: hashedPwd,
                  isAdmin: false,
                  createdAt: new Date(),
        });

        let resultId = await insertUserRecord(_newUser);
        const token = jwt.sign({_id:resultId}, process.env.JWT_SECRET_KEY);

        res.cookie(constant.ACCESS_TOKEN, token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.send({message:constant.REGISTERED_SUCCESS});
    }
})

// Method to login the user
// checking the user validaty wether user registered or not in system
// comapring the password with secret key
exports.userLogin = asynErrorHandler(async(req,res,next)=>{
    let email = req.body.email; 
    let user = await fetchUserRecord(email)
    

    if(!(await bcrypt.compare(req.body.password, user.password))){
        return res.this.status(400).send({
            message:constant.USER_NOTFOUND
        })
    }

    const token = jwt.sign({_id: user.id}, process.env.JWT_SECRET_KEY);
    res.cookie(constant.ACCESS_TOKEN, token, {
        httpOnly: true,
        maxAge: 24* 60 * 60 * 1000,
    });
    const { password, ...data} = await this.user.toJSON();
        res.send({message: constant.LOGIN_SUCCESS})
})

exports.userLogout = asynErrorHandler(async(req,res,next)=>{
 res.cookie(constant.ACCESS_TOKEN, constant.EMPTY_DATA, {maxAge: 0});
 res.send({
    message: constant.LOGOUT_SUCCESS
 })
});


