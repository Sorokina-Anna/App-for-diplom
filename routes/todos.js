const {Router} = require ('express')
const res = require('express/lib/response')
const router = Router()
const Task = require ('../models/Task')
const connection = require ('../settings/dbConfig')
const querys = require('../models/Task')


router.get('/', async (req, res) => {
    let todos = await querys.getAll()
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

router.post('/create', async (req, res) => {
    const deal = new Task ({
        task: req.body.task,
        StartTime: req.body.starttime,
        EndTime: req.body.endtime
    })
    
   
    await deal.create (deal.task)
    res.redirect('/')
})

router.post ('/complete', async (req, res) => {
    querys.save (req.body.id, Boolean(req.body.completed))
    res.redirect ('/')
})

router.post ('/deleteDeal', async (req, res) => {
    querys.delete (req.body.id)
    res.redirect ('/')
})


    


module.exports = router

