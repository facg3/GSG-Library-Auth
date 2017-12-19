const {Pool} = require('pg');
require('env2')('../../config.env');

 if(!process.env.DB_URL){
   throw new Error(`DB_URL is undefined.`);
 }
 module.exports = new Pool({
   connectionString: process.env.DB_URL
 });
