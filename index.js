const express = require ('express')
const mysql = require ('mysql2')

const PORT = process.env.PORT || 3000

const app = express ()

async function start () {
    try {
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            database: "diplom",
            password: "lbgkjvxtr2022"
        })
        app.listen (PORT, () => {
            console.log ('Сервер запущен')
        })

    } catch (e) {
        console.log(e)
    }
}

start ()

