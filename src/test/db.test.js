const test = require('tape');
const dbconnection = require('../src/database/dbconnection.js');
const insertData = require('../src/query/insert.js');
const getData = require('../src/query/selectAll.js');
const updateData = require('../src/query/update.js');
const deleteData = require('../src/query/deleteBook.js');

test('should insert data into data base', (t) => {
  insertData('fake','fake','fake','fake', (err, result)=> {
    t.equal(err, null, 'there are no errors when data is inserted')
    t.deepEqual(result, [], 'should insert data successfully')
    t.end()
  })
})

test('should get all data from database', (t)=> {
  getData((err, data) => {
    t.equal(err, null, 'there are no errors when get data')
    t.equal(data.length > 0, true, 'should get data successfully')
    t.end()
  })
})
test('should update data', (t) =>{
  editData('fake', 'fake', 'fake', 'fake','fake', (err, result)=>{
    t.equal(err, null, 'there are no errors when data is updated')
    t.deepEqual(result, [], 'should update data successfully')
    t.end()
  })
})
test('should delete data', (t)=>{
  deleteData('fake', (err,result)=>{
    t.equal(err, null, 'there are no errors when data is deleted')
    t.deepEqual(result, [], 'should delete data successfully')
    t.end()
  })
})
