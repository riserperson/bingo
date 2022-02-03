var allButtons = document.querySelectorAll('.button');
var allTds = document.querySelectorAll('.space');
var allCheckValues = document.querySelectorAll('.checkValue');

function setCheckButtonListener(button, position) {
  button.onclick = () => {
    let checked = document.querySelector('#checked'+position).value;
    if (checked == 'false') {
      checked = true;
    } else {
      checked = false;
    }
    const postRequest = new XMLHttpRequest();
    const postUrl = '/play/card/'+document.querySelector('#cardId').value;
  
    return new Promise(function (resolve, reject) {
      postRequest.onreadystatechange = function() {
        if (postRequest.readyState !== 4) return;
        if (postRequest.status >= 200 && postRequest.status < 300) {
          resolve(postRequest);
        } else {
          reject({
            status: postRequest.status,
            statusText: postRequest.statusText
          });
        }
      };
      postRequest.open('POST', postUrl, true);
      postRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      postRequest.send('cardId=' + document.querySelector('#cardId').value + '&position=' + position + '&checked=' + checked);
    })
    .then( (space) => {
      document.querySelector('#checked'+position).value = JSON.parse(space.response).checked;
      if (JSON.parse(space.response).checked) {
        document.querySelector('#td'+position).classList.add('checked');
      } else {
        document.querySelector('#td'+position).classList.remove('checked');
      }
    });
  }
}

for (var i = 0; i < allButtons.length; i++) {
  setCheckButtonListener(allButtons[i], i);
}

for (var i = 0; i < allCheckValues.length; i++) {
  if (allCheckValues[i].value == 'true') {
    allTds[i].classList.add('checked');
  }
}
