function parseGameStatus(gameStatus) {
  // Parse a bool status or string 'true' to string
  if (gameStatus == 'true' || gameStatus == true) {
    return "Game In Progress";
  } else {
    return "Game Pending Start"
  }
}

function updateSpaceDesc(id, desc) {
  var postRequest;
  var postUrl;
  postRequest = new XMLHttpRequest();
  postUrl = "/play/desc/"+ id +"/update";

  try
    {
      postRequest.onreadystatechange=getPostStatus;
      postRequest.open("POST",postUrl,true);
      postRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      postRequest.send('desc='+desc);
    }
  catch(e)
    {
      alert("Unable to process POST request");
    }
 
  function getPostStatus() {
    if(postRequest.readyState==4) {
      var game=JSON.parse(postRequest.responseText);
      if (!game) {
        // Response is null
        console.log('GET request yielded null response.');
      } else {
        return true;
     }
    }
  }
}

function deleteSpace(id) {
  var postRequest;
  var postUrl;
  postRequest = new XMLHttpRequest();
  postUrl = "/play/space/"+ id +"/delete";

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
    postRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    postRequest.send("id="+id);
  });
}

function addChangeSpaceButtonListener(spaceId) {
  if (document.querySelector('#changeButton' + spaceId)) {
    let button = document.querySelector('#changeButton' + spaceId);
    button.onclick = function() {
      document.querySelector('#spaceDiv' + spaceId).classList.remove('show');
      document.querySelector('#spaceDiv' + spaceId).classList.add('noShow');

      document.querySelector('#spaceInput' + spaceId).classList.remove('noShow');
      document.querySelector('#spaceInput' + spaceId).classList.add('show');

      button.classList.remove('show');
      button.classList.add('noShow');

      document.querySelector('#saveButton' + spaceId).classList.remove('noShow');
      document.querySelector('#saveButton' + spaceId).classList.add('show');
    };
  }
}

function addSaveSpaceButtonListener(spaceId) {
  if (document.querySelector('#saveButton' + spaceId)) {
    let button = document.querySelector('#saveButton' + spaceId);
    button.onclick = function() {
      let desc = document.querySelector('#spaceInput' + spaceId).value;
      document.querySelector('#spaceDiv' + spaceId).innerText = desc;
      document.querySelector('#spaceDiv' + spaceId).classList.remove('noShow');
      document.querySelector('#spaceDiv' + spaceId).classList.add('show');
      
      // Update using previously defined function
      updateSpaceDesc(spaceId, desc);

      document.querySelector('#spaceInput' + spaceId).classList.remove('show');
      document.querySelector('#spaceInput' + spaceId).classList.add('noShow');

      button.classList.remove('show');
      button.classList.add('noShow');

      document.querySelector('#changeButton' + spaceId).classList.remove('noShow');
      document.querySelector('#changeButton' + spaceId).classList.add('show');
    };
  }
}

function addDeleteSpaceButtonListener(spaceId) {
  if (document.querySelector('#deleteButton'+spaceId)) {
    let button = document.querySelector('#deleteButton'+spaceId);
    button.onclick = async function() {
      const deleteResult = await deleteSpace(spaceId);
      document.querySelector('#spaceLi' + spaceId).remove();
      refreshSpaces();
    };
  }
}

function updateGameName(gameName) {
  var postRequest;
  var postUrl;
  postRequest = new XMLHttpRequest();
  postUrl = "/play/game/"+document.querySelector("#gameId").value+"/update";

  try
    {
      postRequest.onreadystatechange=getPostStatus;
      postRequest.open('POST',postUrl,true);
      postRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      postRequest.send('gameName='+document.querySelector('#gameName').value + '&status=' + document.querySelector('#gameStatus').value);
    }
  catch(e)
    {
      alert("Unable to process POST request");
    }
 
  function getPostStatus() {
    if(postRequest.readyState==4) {
      var game=JSON.parse(postRequest.responseText);
      if (!game) {
        // Response is null
        console.log('GET request yielded null response.');
      } else {
        // Hide our input box.
        input = document.querySelector('#gameName');
        input.classList.remove('show');
        input.classList.add('noShow');

        // Hide our save button.
        document.querySelector('#gameNameSaveButton').classList.remove('show');
        document.querySelector('#gameNameSaveButton').classList.add('noShow');

        // Put the new game name in its div.
        document.querySelector('#gameNameDiv').innerText = game.name;

        // Show the update button.
        document.querySelector('#gameNameChangeButton').classList.remove('noShow');
        document.querySelector('#gameNameChangeButton').classList.add('show');
     }
    }
  }
}

function toggleGameStatus(currentStatus) {
  //Tweaking this to make this less of a toggle and more of a one-way change.
  //Rather than letting users endlessly go back and forth, now we expose
  //A hidden div (later could animate) with a confirmation request
  //Starting a game is now one-way. 
  var postRequest;
  var postUrl;
  postRequest = new XMLHttpRequest();
  postUrl = '/play/game/'+document.querySelector('#gameId').value+'/update';
  if (currentStatus == 'false') {
    var gameStatus = 'true';
  } else {
    var gameStatus = 'false';
  }

  try
    {
      postRequest.onreadystatechange=getPostStatus;
      postRequest.open("POST",postUrl,true);
      postRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      postRequest.send('gameName='+document.querySelector('#gameName').value + '&gameStatus=' + gameStatus);
  }
  catch(e)
    {
      alert("Unable to process POST request");
    }
 
  function getPostStatus() {
    if(postRequest.readyState==4) {
      var game=JSON.parse(postRequest.responseText);
      if (!game) {
        // Response is null
        console.log('GET request yielded null response.');
      } else {
        document.querySelector('#gameStatus').value = game.status;
        document.querySelector('#gameStatusText').innerText = parseGameStatus(game.status);
        if (game.status == true) {
          document.querySelector('#requestCardButtonBox').classList.remove('noShow');
          document.querySelector('#requestCardButtonBox').classList.add('show');
          document.querySelector('#spaceRow').classList.add('noShow');
          document.querySelector('#gameControlsBox').classList.remove('show');
          document.querySelector('#gameControlsBox').classList.add('noShow');
          document.querySelector('#gameStateConfirmBox').classList.remove('show');
          document.querySelector('#gameStateConfirmBox').classList.add('noShow');
          document.querySelector('#gameNameChangeButton').classList.remove('show');
          document.querySelector('#gameNameChangeButton').classList.add('noShow');
        } else {
          document.querySelector('#requestCardButtonBox').classList.remove('show');
          document.querySelector('#requestCardButtonBox').classList.add('noShow');
          document.querySelector('#startGameButton').innerText = 'Start Game';
        }
     }
    }
  }
}

function refreshSpaces() {
  var getRequest;
  var getUrl;
  getRequest = new XMLHttpRequest();
  getUrl = "/play/spaces?gameId="+document.getElementById("gameId").value;

  try
    {
      getRequest.onreadystatechange=getGetStatus;
      getRequest.open("GET",getUrl,true);
      getRequest.send();
    }
  catch(e)
    {
      alert("Unable to process GET request");
    }

 
  function getGetStatus() {
    if(getRequest.readyState==4) {
      var allSpaces=JSON.parse(getRequest.responseText);
      if (!allSpaces) {
        // Response is null
        console.log("GET request yielded null response.");
      } else {
        while (document.querySelector("#spaceList").firstChild.id != "newSpaceLi") {
          document.querySelector("#spaceList").removeChild(document.querySelector("#spaceList").firstChild);
        }
        
       for (i = 0; i < allSpaces.length; i++) {
          let spaceId = allSpaces[i].id;
          // Create the li for each space
          let li = document.createElement('li');
          li.setAttribute('id', 'spaceLi' + spaceId);

          // And a div to hold the text
          let div = document.createElement('div');
          div.setAttribute('id', 'spaceDiv' + spaceId);
          div.appendChild(document.createTextNode(allSpaces[i].desc));
          li.appendChild(div);

          // Use a hidden input to keep track of the space id
          let hiddenInput = document.createElement('input');
          hiddenInput.setAttribute('type', 'hidden');
          hiddenInput.setAttribute('id', 'spaceId' + spaceId);
          hiddenInput.setAttribute('value', allSpaces[i].id);
          li.appendChild(hiddenInput);

          // And an input box for edit mode
          let input = document.createElement('input');
          input.setAttribute('type', 'text');
          input.setAttribute('id', 'spaceInput' + spaceId);
          input.setAttribute('value', allSpaces[i].desc);
          input.classList.add('noShow');
          li.appendChild(input);

          // Adding a change button
          let changeButton = document.createElement('button');
          changeButton.innerText = 'Change';
          changeButton.setAttribute('id', 'changeButton' + spaceId);
          changeButton.classList.add('show');
          li.appendChild(changeButton);

          // And a save button
          let saveButton = document.createElement('button');
          saveButton.innerText = 'Save';
          saveButton.setAttribute('id', 'saveButton' + spaceId);
          saveButton.classList.add('noShow');
          li.appendChild(saveButton);

          // And a delete button
          let deleteButton = document.createElement('button');
          deleteButton.innerText = 'Delete';
          deleteButton.setAttribute('id', 'deleteButton' + spaceId);
          deleteButton.classList.add('show');
          li.appendChild(deleteButton);

          document.querySelector('#spaceList').insertBefore(li, document.querySelector('#newSpaceLi'));
          addChangeSpaceButtonListener(spaceId);
          addSaveSpaceButtonListener(spaceId);
          addDeleteSpaceButtonListener(spaceId);
        }
      }
    }
  }
}

refreshSpaces();

addSpaceButton.onclick = function() {
  var postRequest;
  var postUrl;
  postRequest = new XMLHttpRequest();
  postUrl = "/play/space/create";

  try
    {
      postRequest.onreadystatechange=getPostStatus;
      postRequest.open("POST",postUrl,true);
      postRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      postRequest.send("desc="+document.getElementById("newSpace").value+"&gameId="+document.getElementById("gameId").value);
    }
  catch(e)
    {
      alert("Unable to connect to server");
    }
  
  function getPostStatus() {
    if(postRequest.readyState==4) {
      var val=postRequest.status;
      if (val===200) {
        refreshSpaces();
      }
    }
  }
  document.getElementById('newSpace').value = '';
}

startGameButton.onclick = function() {
  updateGame(document.querySelector("#gameName"),document.querySelector("#gameStatus"));
}

gameNameSaveButton.onclick = function() {
  updateGameName(document.querySelector("#gameName").value);
}

gameNameChangeButton.onclick = function() {
  document.querySelector('#gameName').value = document.querySelector('#gameNameDiv').innerText;
  document.querySelector('#gameNameDiv').innerText = '';
  document.querySelector('#gameName').classList.remove('noShow');
  document.querySelector('#gameName').classList.add('show');
  document.querySelector('#gameNameSaveButton').classList.remove('noShow');
  document.querySelector('#gameNameSaveButton').classList.add('show');
  document.querySelector('#gameNameChangeButton').classList.remove('show');
  document.querySelector('#gameNameChangeButton').classList.add('noShow');
}

startGameButton.onclick = function() {
  document.querySelector("#gameControlsBox").classList.remove("show")
  document.querySelector("#gameControlsBox").classList.add("noShow")
  document.querySelector("#gameStateConfirmBox").classList.remove("noShow")
  document.querySelector("#gameStateConfirmBox").classList.add("show")
}

gameStartYesButton.onclick = function() {
  toggleGameStatus(document.querySelector('#gameStatus').value);
}

gameStartNoButton.onclick = function() {
  document.querySelector("#gameControlsBox").classList.remove("noShow")
  document.querySelector("#gameControlsBox").classList.add("show")
  document.querySelector("#gameStateConfirmBox").classList.remove("show")
  document.querySelector("#gameStateConfirmBox").classList.add("noShow")
}

refresh.onclick = refreshSpaces();



generate.onclick = () => {
  var postRequest;
  var postUrl;
  postRequest = new XMLHttpRequest();
  postUrl = '/play/generate_spaces';

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
    postRequest.send('gameId=' + document.querySelector('#gameId').value);
  }).then(resolve => {
    refreshSpaces();
  });
}
