var allButtons = document.querySelectorAll('.button');
var allTds = document.querySelectorAll('.space');
var allCheckValues = document.querySelectorAll('.checkValue');
var allCheckboxes = document.querySelectorAll('.checkbox')

// Create the listener function for buttons in large view

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
        document.querySelector('#td'+position).classList.add('bg-warning');
      } else {
        document.querySelector('#td'+position).classList.remove('bg-warning');
      }
    });
  }
}

// Assign the listeners to the large view buttons

for (var i = 0; i < allButtons.length; i++) {  
  setCheckButtonListener(allButtons[i], i);
}

// Create the listener function for the small view checkboxes

function setCheckBoxListener(checkbox, position) {
  checkbox.onclick = () => {
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
        document.querySelector('#td'+position).classList.add('bg-warning');
        $('#vlistItem'+position).addClass('vlist-checked');
      } else {
        document.querySelector('#td'+position).classList.remove('bg-warning');
        $('#vlistItem'+position).removeClass('vlist-checked')
      }
    });
  }
}

// Assign the listeners to the vertical list items

for (var i = 0; i < allCheckboxes.length; i++) {  
  setCheckBoxListener(allCheckboxes[i], i);
}

// Check at page load for existing checks

for (var i = 0; i < allCheckValues.length; i++) {
  if (allCheckValues[i].value == 'true') {
    allTds[i].classList.add('bg-warning');
    $('#vlistItem'+i).addClass('vlist-checked');
    allCheckboxes[i].checked = true;
  }
}
