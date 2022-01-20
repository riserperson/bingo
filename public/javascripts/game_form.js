function parseGameStatus(gameStatus) {
  // Parse a bool status to string
  if (gameStatus == true) {
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

  try
    {
      postRequest.onreadystatechange=getPostStatus;
      postRequest.open("POST",postUrl,true);
      postRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      postRequest.send("id="+id);
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

function addChangeSpaceButtonListener(i) {
  if (document.querySelector('#changeButton'+i)) {
    let button = document.querySelector('#changeButton'+i);
    button.onclick = function() {
      document.querySelector('#spaceDiv' + i).classList.remove('show');
      document.querySelector('#spaceDiv' + i).classList.add('noShow');

      document.querySelector('#spaceInput' + i).classList.remove('noShow');
      document.querySelector('#spaceInput' + i).classList.add('show');

      button.classList.remove('show');
      button.classList.add('noShow');

      document.querySelector('#saveButton' +i ).classList.remove('noShow');
      document.querySelector('#saveButton' + i).classList.add('show');
    };
  }
}

function addSaveSpaceButtonListener(i, id) {
  if (document.querySelector('#saveButton'+i)) {
    let button = document.querySelector('#saveButton'+i);
    button.onclick = function() {
      let desc = document.querySelector('#spaceInput'+i).value;
      document.querySelector('#spaceDiv' + i).innerText = desc;
      document.querySelector('#spaceDiv' + i).classList.remove('noShow');
      document.querySelector('#spaceDiv' + i).classList.add('show');
      
      // Update using previously defined function
      updateSpaceDesc(id, desc);

      document.querySelector('#spaceInput' + i).classList.remove('show');
      document.querySelector('#spaceInput' + i).classList.add('noShow');

      button.classList.remove('show');
      button.classList.add('noShow');

      document.querySelector('#changeButton' +i ).classList.remove('noShow');
      document.querySelector('#changeButton' + i).classList.add('show');
    };
  }
}

function addDeleteSpaceButtonListener(i, id) {
  if (document.querySelector('#deleteButton'+i)) {
    let button = document.querySelector('#deleteButton'+i);
    button.onclick = function() {
      deleteSpace(id);
      document.querySelector('#spaceLi' + i).remove();
      setTimeOut(() => refreshSpaces(), 200000);
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
      postRequest.open("POST",postUrl,true);
      postRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      postRequest.send("gameName="+document.querySelector("#gameName").value);
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
          // Create the li for each space
          let li = document.createElement('li');
          li.setAttribute('id', 'spaceLi' + i);

          // And a div to hold the text
          let div = document.createElement('div');
          div.setAttribute('id', 'spaceDiv' + i);
          div.appendChild(document.createTextNode(allSpaces[i].desc));
          li.appendChild(div);

          // And an input box for edit mode
          let input = document.createElement('input');
          input.setAttribute('type', 'text');
          input.setAttribute('id', 'spaceInput' + i);
          input.setAttribute('value', allSpaces[i].desc);
          input.classList.add('noShow');
          li.appendChild(input);

          // Adding a change button
          let changeButton = document.createElement('button');
          changeButton.innerText = 'Change';
          changeButton.setAttribute('id', 'changeButton' + i);
          changeButton.classList.add('show');
          li.appendChild(changeButton);

          // And a save button
          let saveButton = document.createElement('button');
          saveButton.innerText = 'Save';
          saveButton.setAttribute('id', 'saveButton' +i );
          saveButton.classList.add('noShow');
          li.appendChild(saveButton);

          // And a delete button
          let deleteButton = document.createElement('button');
          deleteButton.innerText = 'Delete';
          deleteButton.setAttribute('id', 'deleteButton' +i );
          deleteButton.classList.add('show');
          li.appendChild(deleteButton);

          document.querySelector("#spaceList").insertBefore(li, document.querySelector("#spaceList").firstChild);
          addChangeSpaceButtonListener(i);
          addSaveSpaceButtonListener(i, allSpaces[0].id);
          addDeleteSpaceButtonListener(i, allSpaces[0].id);
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
  document.querySelector('#gameNameDiv').innerText = '';
  document.querySelector('#gameName').classList.remove('noShow');
  document.querySelector('#gameName').classList.add('show');
  document.querySelector('#gameNameSaveButton').classList.remove('noShow');
  document.querySelector('#gameNameSaveButton').classList.add('show');
  document.querySelector('#gameNameChangeButton').classList.remove('show');
  document.querySelector('#gameNameChangeButton').classList.add('noShow');
}
