var allButtons = document.querySelectorAll('.button');

function setCheckButtonListener(button, id) {
  button.onclick = () => {
    document.querySelector('#td'+id).classList.add('checked');
  }
}

for (var i = 0; i < allButtons.length; i++) {
  setCheckButtonListener(allButtons[i], allButtons[i].id);
}
