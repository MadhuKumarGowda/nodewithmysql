const app = require("./index");
const dbConnection = require("./database");

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log("Server has started at port", port);
    
    // dbConnection.query("select * from players.cricketers", (err, result, fields)=>{
    //     if(err){
    //         return console.log("errr", err)
    //     }
    //    return console.log(result);
    // })
})