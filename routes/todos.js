const {Router} = require ('express')
const res = require('express/lib/response')
const router = Router()
const Task = require ('../models/Task')
const connection = require ('../settings/dbConfig')


router.get('/', async (req, res) => {
    
    let todos = new Array()
    todos = await Task.getAll({})

   res.render ('index', {
        title: 'Todos List',
        isIndex: true,
        todos
    })
})

router.get ('/create', (req, res) => {
    res.render('create', {
        title: 'Create todo',
        isCreate: true
    })
})

/*router.post('/create', async (req, res) => {
    const todo = new Task ({
        task: req.body.task
    })

    await todo.create(todo.task)
    res.redirect('/')
})

/* На будущее
router.post ('/complete', async (req, res) => {
    const todo = await Task.findById (req.body.id)
    todo.completed = !!req.body.completed
    await todo.save()

    res.redirect ('/')
})
*/
module.exports = router

