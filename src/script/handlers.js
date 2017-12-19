const fs = require('fs');
const path = require('path');
const insert = require('../query/insert');
const showData = require('../query/selectAll');
const deleteBook = require('../query/deleteBook');
const editBook = require('../query/update');

const homepageHandler = (req, res) => {
  fs.readFile(path.join(__dirname, '..', '..', 'public', 'index.html'), (err, file) => {
    if (err) {
      res.writeHead(500, {
        'content-type': 'text/html',
      });
      res.end('<h1>SERVER ERROR</h1>');
    } else {
      res.writeHead(200, {
        'content-type': 'text/html',
      });
      res.end(file);
    }
  });
};

const publicHandler = (req, res) => {
  const {
    url,
  } = req;
  const extension = url.split('.')[1];
  const filetype = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    json: 'application/json',
    img: 'image/png',
  };

  fs.readFile(path.join(__dirname, '..', '..', url), (err, file) => {
    if (err) {
      res.writeHead(500, {
        'content-type': 'text/html',
      });
      res.end('<h1>SERVER ERROR</h1>');
    } else {
      res.writeHead(200, `Content-Type:${filetype[extension]}`);
      res.end(file);
    }
  });
};
const insertData = (req, res) => {
  let allData = '';
  req.on('data', (chunkOfData) => {
    allData += chunkOfData;
  });
  req.on('end', () => {
    const convertData = JSON.parse(allData);

    insert(convertData.title, convertData.author, convertData.edition, convertData.publisher, (err, response) => {
      if (err) {
        res.writeHead(500, {
          'content-Type': 'text/html',
        });
        return res.end('<h1>ERROR handling</h1>');
      }
      res.writeHead(200, {
        'Content-Type': ' text/html',
      });
      return res.end();
    });
  });
};
const viewData = (req, res) => {
  showData((err, response) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'text/html',
      });
      return res.end('<h1>ERROR handling</h1>');
    }
    const data = JSON.stringify(response);
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    return res.end(data);
  });
};
const deleteData = (req, res) => {
  let idBook = '';
  req.on('data', (chunkOfData) => {
    idBook += chunkOfData;
  });
  req.on('end', () => {
    // const convertData = JSON.parse(allData);

    deleteBook(idBook, (err, response) => {
      if (err) {
        res.writeHead(500, {
          'content-Type': 'text/html',
        });
        return res.end('<h1>ERROR handling</h1>');
      }
      res.writeHead(200, {
        'Content-Type': ' text/html',
      });
      return res.end();
    });
  });
};
const editData = (req, res) => {
  let Book = '';
  req.on('data', (chunkOfData) => {
    Book += chunkOfData;
  });
  req.on('end', () => {
    const convertData = JSON.parse(Book);
    editBook(
      convertData.title, convertData.author, convertData.edtion,
      convertData.publisher, convertData.id, (err, response) => {
        if (err) {
          res.writeHead(500, {
            'content-Type': 'text/html',
          });
          res.end('<h1>ERROR handling</h1>');
        }
        res.writeHead(200, {
          'Content-Type': 'application/json',
        });
        res.end();
      },
    );
  });
};

module.exports = {
  publicHandler,
  homepageHandler,
  insertData,
  viewData,
  deleteData,
  editData,
};
