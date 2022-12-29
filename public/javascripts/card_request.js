$('#confirmation').hide();

document.querySelector('#submit').addEventListener('click', () => {
  if(document.querySelector('#phoneNumber').value != '') {
    var postRequest;
    var postUrl;
    postRequest = new XMLHttpRequest();
    postUrl = '/bingo/card_request';

    return new Promise(function (resolve, reject) {
      postRequest.onreadystatechange = function() {
        if (postRequest.readyState !== 4) return;
        if (postRequest.status >= 200 && postRequest.status < 300) {
          resolve(postRequest);
        } else {
          reject({ status: postRequest.status,
            statusText: postRequest.statusText
          });
        }
      };
      postRequest.open('POST', postUrl, true);
      postRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      postRequest.send('gameId=' + document.querySelector('#gameId').value + '&email=' + document.querySelector('#email').value);
    })
    .then( (card) => {
      console.log(JSON.parse(card.response));
      if (JSON.parse(card.response).hashedId) {
        $("#requestForm").hide();
        $("#confirmation").show();
        document.querySelector('#cardLink').innerHTML = '<a href="http://'+location.host+'/bingo/card/' + JSON.parse(card.response).hashedId +'">View Your Card</a>'
      }
    });
  } 
});

(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()