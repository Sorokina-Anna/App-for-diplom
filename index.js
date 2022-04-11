const express = require ('express')
const mysql = require ('mysql2')
const exphbs = require ('express-handlebars')
const todoRoutes = require ('./routes/todos')

const PORT = process.env.PORT || 3000

const app = express ()
const hbs = exphbs.create ({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set ('view engine', 'hbs')
app.set('views', 'views')

app.use (todoRoutes)

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

