const dbConnection = require("../database")
const dotenv = require("dotenv");
dotenv.config({path: "./config.env"});
const XLSX = require("xlsx");

exports.readXlsxconvertJson = (req,res,next)=>{

    const workbook = XLSX.readFile("./assets/data/data1.xlsx");
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    for(let index=0; index<data.length;index++){        
        let query = `INSERT INTO players.users (fname, lname, email) VALUES(?,?,?)`;
        let fname = data[index].Fname;
        let lname = data[index].Lname;
        let email = data[index].Email;        
        

        dbConnection.query(query,[fname,lname,email], (err,rows)=>{
            if(err) throw err;
            console.log("Row Inserted with id =" + rows.insertId);
        })
    }
   
    res.status(200).json({
        status: "success",
        length: data.length,
        result:{
            data
        }
    })
    return data;         
};
