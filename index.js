const express = require ('express')
const exphbs = require ('express-handlebars')
// const hbs = require("hbs");
const todoRoutes = require ('./routes/todos')
const db = require ('./settings/dbConfig')
const path = require ('path')
const bodyParser = require ('body-parser')

const PORT = process.env.PORT || 3000

const app = express ()
const hbs = exphbs.create ({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: {
        foo() { return 'FOO!'; }
    }
})

// app.set("view engine", "hbs");
app.engine('hbs', hbs.engine)
app.set ('view engine', 'hbs')
app.set('views', 'views')



app.use(bodyParser.urlencoded ({extended: true}))


app.use(express.urlencoded ({ extended: true}))
app.use (express.static(path.join(__dirname, 'public')))

app.use (express.static(path.join(__dirname, 'script')))


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

