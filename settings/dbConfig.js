const mysql = require ('mysql2')

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "diplom",
    password: "lbgkjvxtr2022" 
})


module.exports = connection
