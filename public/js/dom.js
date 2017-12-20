var button = document.getElementById('create');
var allBook = document.getElementById('allBook');
var addBook = document.getElementById('addBook');
var add = document.getElementById('add');
var table = document.getElementById('table');
var edit = document.getElementById('edit');
var logout = document.getElementById('logout');

addBook.addEventListener('click', () => {
  add.style.display = 'block';
  table.style.display = 'none';
  edit.style.display = 'none';
});
button.addEventListener('click', () => {
  var title = document.getElementById('Btitle').value;
  var author = document.getElementById('Bauthor').value;
  var edition = document.getElementById('Bedition').value;
  var publisher = document.getElementById('Bpublisher').value;
  var obj = {
    title: title,
    author: author,
    edition: edition,
    publisher: publisher
  };
  fetchPost('POST', '/insertData', (err, res) => {
    if (err) {} else {
      alert(' Book added ^.^ ');
      document.getElementById('Btitle').value = '';
      document.getElementById('Bauthor').value = '';
      document.getElementById('Bedition').value = '';
      document.getElementById('Bpublisher').value = '';
    }
  }, JSON.stringify(obj));

});
logout.addEventListener('click', (e) => {
  e.preventDefault();
  fetchPost('GET', '/logout', (err, res) => {
    if (err) {
      console.log(err);
    } else {
        if(res === '/') window.location.pathname = '/login';
    }
  });
});
allBook.addEventListener('click', () => {
  add.style.display = 'none';
  // table.style.display = 'none';
  fetchPost('GET', '/viewData', (err, res) => {
    if (err) {} else {
      var data = JSON.parse(res);
      table.textContent = "";
      var tr = document.createElement('tr');
      table.appendChild(tr);
      var th1 = document.createElement('th');
      th1.textContent = "Title";
      table.appendChild(th1);
      var th2 = document.createElement('th');
      th2.textContent = "Author";
      table.appendChild(th2);
      var th3 = document.createElement('th');
      th3.textContent = "Edition";
      table.appendChild(th3);
      var th4 = document.createElement('th');
      th4.textContent = "Publisher";
      table.appendChild(th4);
      var th5 = document.createElement('th');
      th5.textContent = "Option";
      table.appendChild(th5);
      data.forEach((item) => {
        functionAdd(item);
      });
    }
  });
  table.style.display = 'block';
});

function functionAdd(item) {

  var tr = document.createElement('tr');
  var ptitle = document.createElement('td');
  ptitle.textContent = item.title;
  var pauthor = document.createElement('td');
  pauthor.textContent = item.author;
  var pedition = document.createElement('td');
  pedition.textContent = item.edition;
  var ppublisher = document.createElement('td');
  ppublisher.textContent = item.publisher;
  var deleteBook = document.createElement('button');
  deleteBook.textContent = "DELETE";
  var editBook = document.createElement('button');
  editBook.textContent = "EDIT";
  var option = document.createElement('td');

  tr.appendChild(ptitle);
  tr.appendChild(pauthor);
  tr.appendChild(pedition);
  tr.appendChild(ppublisher);
  option.appendChild(deleteBook);
  option.appendChild(editBook);
  tr.appendChild(option);
  table.appendChild(tr);
  deleteBook.addEventListener("click", function(event) {
    functionDelete(item.id, tr);
  });
  editBook.addEventListener("click", function(event) {
    edit.textContent = "";
    edit.style.display = "block";
    functionEdit(item, ptitle, pauthor, pedition, ppublisher);
  });
}
function functionDelete(id, tr) {
  var confirmToDelete = confirm("Confirm To Delete Book! ;( ");
  if (confirmToDelete === true) {
    fetchPost('POST', '/deleteData', (err, res) => {
      if (err) {} else {
        tr.remove();
      }
    }, JSON.stringify(id));
  } else {}
}

function functionEdit(item, ptitle, pauthor, pedition, ppublisher) {
  console.log("insrghjkl");
  var spanTitle = document.createElement("p");
  spanTitle.textContent = "Edit Title";
  var inputTitle = document.createElement("INPUT");
  inputTitle.setAttribute("type", "text");
  inputTitle.setAttribute("value", item.title);
  var spanAuthor = document.createElement("p");
  spanAuthor.textContent = "Edit Author";
  var inputAuthor = document.createElement("INPUT");
  inputAuthor.setAttribute("type", "text");
  inputAuthor.setAttribute("value", item.author);
  var spanEdtioin = document.createElement("p");
  spanEdtioin.textContent = "Edit Edtion";
  var inputEdtion = document.createElement("INPUT");
  inputEdtion.setAttribute("type", "text");
  inputEdtion.setAttribute("value", item.edition);
  var spanPublisher = document.createElement("p");
  spanPublisher.textContent = "Edit Publisher";
  var inputPublisher = document.createElement("INPUT");
  inputPublisher.setAttribute("type", "text");
  inputPublisher.setAttribute("value", item.publisher);
  var editBook = document.createElement('button');
  editBook.textContent = "EDIT";
  edit.appendChild(spanTitle);
  edit.appendChild(inputTitle);
  edit.appendChild(spanAuthor);
  edit.appendChild(inputAuthor);
  edit.appendChild(spanEdtioin);
  edit.appendChild(inputEdtion);
  edit.appendChild(spanPublisher);
  edit.appendChild(inputPublisher);
  edit.appendChild(editBook);

  editBook.addEventListener("click", function(event) {
    var newData = {
      title: inputTitle.value,
      author: inputAuthor.value,
      edtion: inputEdtion.value,
      publisher: inputPublisher.value,
      id: item.id
    }
    var convertData = JSON.stringify(newData)
    fetchPost('POST', '/editData', (err, res) => {
      if (err) {} else {
        ptitle.textContent = inputTitle.value;
        pauthor.textContent = inputAuthor.value;
        pedition.textContent = inputEdtion.value;
        ppublisher.textContent = inputPublisher.value
        edit.style.display = 'none';
      }
    }, convertData);

  });
}
