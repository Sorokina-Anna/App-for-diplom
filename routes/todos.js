const {Router} = require ('express')
const res = require('express/lib/response')
const router = Router()
const Task = require ('../models/Task')
const connection = require ('../settings/dbConfig')
const querys = require('../models/Task')
const hbs = require("hbs");
const async = require('hbs/lib/async')




router.get('/', async (req, res) => {
    let todos = await querys.getAll();



    todos.forEach((item,index) => {
        let cur_time = Date.now();

        if ((todos[index].StartTime<=cur_time) && (cur_time <= todos[index].EndTime)) {
            timerSec = todos[index].EndTime - cur_time;
            todos[index].timer = new Date(timerSec).getMinutes() + 60;
        } else todos[index].timer = "Time is done";
        
        todos[index].StartTime = new Date(item.StartTime).getHours() + ':' + new Date(item.StartTime).getMinutes();
        todos[index].EndTime = new Date(item.EndTime).getHours() + ':' + new Date(item.EndTime).getMinutes();
    })

    res.render ('index', {
        title: 'Todos List',
        isIndex: true,
        todos,
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

