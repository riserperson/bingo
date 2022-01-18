function parseGameStatus(gameStatus) {
  // Parse a bool status to string
  if (gameStatus == true) {
    return "Game In Progress";
  } else {
    return "Game Pending Start"
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
        input.setAttribute('type', 'hidden');

        // Hide our save button.
        document.querySelector('#gameNameSaveButton').style.display = 'none';

        // Put the new game name in its div.
        document.querySelector('#gameNameDiv').innerText = game.name;

        // Show the update button.
        document.querySelector('#gameNameUpdateButton').style.display = 'block';
     }
    }
  }
}

function updateSpaces() {
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
          let li = document.createElement('li');
          let changeButton = document.createElement('button');
          // ADD STUFF HERE
          let deleteButton = document.createElement('button');
          li.appendChild(document.createTextNode(allSpaces[i].desc));
          
          document.querySelector("#spaceList").insertBefore(li, document.querySelector("#spaceList").firstChild);
          //document.querySelector('#spaceList').appendChild(li);
        }
      }
    }
  }
}

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
        updateSpaces();
      }
    }
  }
  document.getElementById('newSpace').value = '';
}

startGameButton.onclick = function() {
  updateGame(document.querySelector("#gameName"),document.querySelector("#gameStatus"));
}

gameNameSaveButton.onclick = function() {
  updateGameName(document.querySelector("#gameName"));
}

gameNameUpdateButton.onclick = function() {
  document.querySelector('#gameNameDiv').innerText = '';
  document.querySelector('#gameName').setAttribute('type', 'input');
  document.querySelector('#gameNameSaveButton').style.display = 'block';
  document.querySelector('#gameNameUpdateButton').style.display = 'none';
}
