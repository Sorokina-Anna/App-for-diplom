const db = require ('../settings/dbConfig')
const Task = function(task) { //конструктор нового дела
    this.task = task.task;
    this.task = task.completed;
  };

  Task.create = (newTask, result) => {
    db.query("INSERT INTO todos SET ?", newTask, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("Дело сделано", { id: res.insertId, ...newTask });
      result(null, { id: res.insertId, ...newTask });
     });
  };

  Task.getAll = result => {
    db.query("SELECT * FROM todos", (err, res) => {
    if (err) {
    console.log("error: ", err);
    result(null, err);
    return;
    }
    //let tasks = res
    console.log("tasks: ", res);
  });
}

module.exports = (Task)
