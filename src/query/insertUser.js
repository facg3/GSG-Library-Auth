const connection = require('../database/dbconnection');

const insertUser =(username,password,cb)=>{
  const sql = {
    text: `INSERT INTO users (username,password) VALUES ($1,$2)`,
    values: [username,password]
  }
connection.query(sql,(err,data)=>{
  if (err) cb(err);
  else   cb(null,data.rows);
});
}
module.exports = insertUser;
