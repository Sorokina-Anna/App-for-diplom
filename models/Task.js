const db = require ('../settings/dbConfig')
/*Task.create = (newTask, result) => {
  db.query("INSERT INTO todos SET ?", newTask, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Дело сделано", { id: res.insertId, ...newTask });
   // result(null, { id: res.insertId, ...newTask });
   });
};*/

module.exports.getAll = async() => {
  let result
  result = await db.promise().query("SELECT * FROM todos").then(([rows, fields, values]) => {
    /*if (err) {
    console.log("error: ", err);
    result(null, err);
    return;
    }*/
    console.log("tasks: ", rows);
    return rows
    //result = res
  })

console.log(result)
return result
}
