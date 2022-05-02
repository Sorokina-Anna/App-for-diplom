const db = require ('../settings/dbConfig')

module.exports = class Task {
  constructor (task) {
    this.task = task
  }

  create = (newTask) => {
    db.query("INSERT INTO todos SET ?", newTask, (err, res) => {
      if (err) {
        console.log("error: ", err);
        return;
      }
      console.log("Дело сделано", { id: res.insertId, ...newTask });
     });
}
  
};

module.exports.getAll = async() => {
  let result
  result = await db.promise().query("SELECT * FROM todos").then(([rows, fields, values]) => {
    console.log("tasks: ", rows);
    return rows
  })
return result
}


