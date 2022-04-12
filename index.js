const express = require ('express')
const exphbs = require ('express-handlebars')
const todoRoutes = require ('./routes/todos')
const db = require ('./settings/dbConfig')

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
        await db.connect ((err) => {
            if (err) {
                return console.log ('err')
            } else {
                return console.log ('БД подключена успешно')
            } 
        })
        app.listen (PORT, () => {
            console.log ('Сервер запущен')
        })
        }   

     catch (e) {
        console.log(e)
    }
}

start ()

