submit.onclick = () => {
  var postRequest;
  var postUrl;
  postRequest = new XMLHttpRequest();
  postUrl = '/play/card_request';

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
    postRequest.send('gameId=' + document.querySelector('#gameId').value + '&email=' + document.querySelector('#email'));
  })
  .then( (card) => {
    console.log('hello');
    if (card.hashedId) {
      document.querySelector('#cardLink').innerHTML = '<a href="https://iserbingo.herokuapp.com/play/card/' + card.hashedId +'">View Your Card</a>'
    }
  });
}


