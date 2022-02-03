var allButtons = document.querySelectorAll('.button');

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
      console.log(position);
      if (space.checked) {
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

