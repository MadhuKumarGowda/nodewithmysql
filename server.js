const app = require("./index");
const dbConnection = require("./database");

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log("Server has started at port", port);
})