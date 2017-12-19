const connection = require('../../Database/dbconnection');

const editData =(title,author,edition,publisher,id,cb)=>{
  const sql = {
    text: `UPDATE books SET title=$1, author=$2 ,edition=$3,publisher=$4 WHERE id=$5;`,
    values: [title,author,edition,publisher,id]
  }
connection.query(sql,(err,data)=>{
  if (err) cb(err);
  else   cb(null,data.rows);
});
}
module.exports = editData;
