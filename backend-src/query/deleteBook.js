const connection = require('../../Database/dbconnection');
const deleteData =(id,cb)=>{
  const sql = `DELETE FROM books WHERE id = ${id}`;
connection.query(sql,(err,data)=>{
  if (err) cb(err);
  else cb(null,data.rows);
});
}
module.exports = deleteData
