
const fetchPost = (method, url, cb, val) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb(null, xhr.responseText);
    }
  };
  xhr.open(method, url, true);
  xhr.send(val);
};
