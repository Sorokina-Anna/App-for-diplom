const db = require ('../settings/dbConfig')

module.exports = class Task {
  constructor (task, StartTime, EndTime) {
    this.task = task
    this.StartTime = StartTime
    this.EndTime = EndTime
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
    rows.forEach(row => {
      row.StartTime = row.StartTime.slice(0,5)
      row.EndTime = row.EndTime.slice(0,5)
    }) 
    return rows
  })
  return result
}

module.exports.save = (id, completed) => {
  let current_id = id
  let current_completed = completed
  const update_completed = "UPDATE todos SET completed = ? WHERE id = ?"
  db.query (update_completed, [current_completed, current_id])

}

module.exports.delete = (id) => {
  let current_id = id
  const delete_ = "DELETE from todos WHERE id = ?"
  db.query (delete_, current_id)
}



