require('dotenv').config()
const mysql = require('mysql')
let connection

if (process.env.DATABASE == "mysql") {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    })


    connection.connect((err) => {
        if (err) {
            throw err
        } else {
            console.log("SUCCESS CONNECT DATABASE MYSQL")
        }
    })
}

module.exports = connection