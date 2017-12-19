const connection = require('../database/dbconnection');

const insertData =(title,author,edition,publisher,cb)=>{
  const sql = {
    text: `SELECT * FROM users where username = ${user} and password = ${password}`,
    values: [title,author,edition,publisher]
  }
connection.query(sql,(err,data)=>{
  if (err) cb(err);
  else   cb(null,data.rows);
});
}
module.exports = insertData;
