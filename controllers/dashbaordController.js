
const dbConnection = require("../database")
// const dotenv = require("dotenv");
// dotenv.config({path: "./config.env"});

exports.getDefectList = (req,res,next)=>{
    dbConnection.query("select * from players.cricketers", (err, result, fields)=>{
        if(err){
             return console.log("errr", err)
         }        
        res.status(200).json({
            status: "success",
            length: result.length,
            data:{
                result
            }
        })
        return console.log(result);
});
}
