const connection = require('../../Database/dbconnection');
const getData =(cb)=>{
  const sql = `SELECT * FROM books`;
connection.query(sql,(err,data)=>{
  if (err) cb(err);
  else cb(null,data.rows);
});
}
module.exports = getData
