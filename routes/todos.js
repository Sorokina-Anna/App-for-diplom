const {Router} = require ('express')
const router = Router()
const Task = require ('../models/Task')
const connection = require ('../settings/dbConfig')


router.get('/', async (req, res) => {
    
    const todos = await Task.getAll({})
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

module.exports = router
