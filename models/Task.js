const res = require('express/lib/response');
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
     });
}
};

module.exports.getAll = async () => 
{
  let result
  let current_time = new Date();
  const query = `SELECT * FROM todos WHERE DATE (StartTime) = ?`
  let month = current_time.getMonth() <= 8 ? `0${current_time.getMonth()+1}` : current_time.getMonth()+1;
  let day = current_time.getDate() <= 9 ? `0${current_time.getDate()}` : current_time.getDate();
  let request = `${current_time.getFullYear()}-${month}-${day}`
  result = db.promise().query(query,[request])
  .then( ([rows,fields]) => {
    return rows
  })
  .catch((err) => console.log(err))

 /* result = await db.promise().query("SELECT * FROM todos").then(([rows, fields, values]) => 
  {
    //  console.log("tasks: ", rows); Преобразование строки
    rows.forEach(row => 
      {

      var startclock = new Date(row.StartTime)
      var endclock = new Date (row.EndTime)
      
      row.StartTime = startclock.getHours()+":"+startclock.getMinutes()
      row.EndTime = endclock.getHours()+":"+endclock.getMinutes()
    
    })*/
      // return result
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

/*let startTimeTokens = row.StartTime.split(/[-:]/)
      const localStartTime = new Date(1970,11,30,startTimeTokens[0],startTimeTokens[1])

      let endTimeTokens = row.EndTime.split(/[-:]/)
      const localEndTime = new Date(1970,11,30,endTimeTokens[0],endTimeTokens[1])

      let timeDiferenceInMinute = (localEndTime.getTime() - localStartTime.getTime())/(60 * 1000)


      console.log(timeDiferenceInMinute)*/


