const url = 'http://localhost:3000';

/*populate entrepreneur list*/
fetch(url + '/internal/ent')
  .then(response => response.json())
  .then(users => {
    for (u of users) {
      let select = document.querySelector('.entrepreneur');
      let option = document.createElement('option');
      let text = document.createTextNode(`${u.name}`);
      option.appendChild(text);
      option.setAttribute('value', `${u.id}`);
      select.appendChild(option);
    }
  })

  




