var allButtons = document.querySelectorAll('.button');
var allTds = document.querySelectorAll('.space');
var allCheckValues = document.querySelectorAll('.checkValue');
var allCheckboxes = document.querySelectorAll('.checkbox')

// Function to check for a win

function checkWin() {
  var checked = [];
  for (var i = 0; i < 25; i++) {
    if (allTds[i].classList.contains("bg-warning")) {
        checked.push(i);
    }
  }

  var winners = [];
  var counter = 0;
  for (var i = 0; i < 5; i++) {
    winners.push([]);
    for (var j = 0; j < 5; j++) {
      winners[i].push(counter);
      counter++;
    }
  }

  var counter = 0;
  for (var i = 0; i < 5; i++) {
    winners.push([]);
    counter = i;
    for (var j = 0; j < 5; j++) {
      winners[i].push(counter);
      counter+=5;
    }
  }
  
  winners.push([0,6,12,18,24]);
  winners.push([4,8,12,16,20]);

  var maxLine = 0;
  var winnineLine = -1;

  for (var i = 0; i < winners.length; i++) {
    counter = 0;
    for (var j = 0; j < 5; j++) {
      if (checked.includes(winners[i][j])) {
        counter++;
      }
    }
    if (counter > maxLine) {
      maxLine = counter;
    }
    if (counter == 5) {
      winningLine = i;
    }
  }

  
  if (maxLine >= 5) {
    return winners[winningLine];
  } else {
    return false;
  }
}

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
      if (checkWin()) {
        var winners = checkWin();
        for (var i = 0; i < 5; i++) {
            allTds[winners[i]].classList.remove('bg-warning');
            allTds[winners[i]].classList.add('bg-success');
        }
      } else {
        location.reload();
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
      if (checkWin()) {
        var winners = checkWin();
        for (var i = 0; i < 5; i++) {
            allTds[winners[i]].classList.remove('bg-warning');
            allTds[winners[i]].classList.add('bg-success');
        }
      } else {
        location.reload();
      }
    });
  }
}

// Assign the listeners to the vertical list items

var counter = 0;
for (j=0; j<5; j++) {
  for (var i = j; i < allCheckboxes.length; i+=5) {  
    setCheckBoxListener(allCheckboxes[counter], i);
    counter++;
  }
}

// Check at page load for existing checks


for (var i = 0; i < 25; i++) {
  if (document.querySelector("#checked"+i).value == 'true') {
    allTds[i].classList.add('bg-warning');
    $('#vlistItem'+i).addClass('vlist-checked');
    document.querySelector("#checkbox"+i).checked = true;
  }
}
