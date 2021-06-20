document.addEventListener('DOMContentLoaded', () => {
  const createMonster = document.querySelector('#create-monster');
  const mostersContainer = document.querySelector('#monster-container');
  const forward = document.querySelector('#forward');
  const back = document.querySelector('#back');
  let page = 1;

  const renderCreateMonster = () => {
    const form = document.createElement('form');
    const name = document.createElement('input');
    const age = document.createElement('input');
    const description = document.createElement('input');
    const submit = document.createElement('input');

    name.type ='text';
    name.placeholder = 'Name';
    age.type = 'number';
    age.placeholder = 'Age';
    description.type = 'text';
    description.placeholder = 'Description';
    submit.type = 'submit';

    form.appendChild(name);
    form.appendChild(age);
    form.appendChild(description);
    form.appendChild(submit);
    createMonster.appendChild(form);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      
      fetch('http://localhost:3000/monsters', {
        method: 'post',
        headers: 
        {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name.value,
          age: parseInt(age.value),
          description: description.value
        })
      });

      name.value = '';
      age.value = '';
      description.value = '';
    });
  }

  const renderMonsters = (json) => {
    json.forEach((monster) => {
      const name = document.createElement('h2');
      const age = document.createElement('p');
      const description = document.createElement('p');

      name.innerText = monster.name;
      age.innerText = monster.age;
      description.innerText = monster.description;

      mosterInfo = [name, age, description];

      mosterInfo.forEach(item => {
        mostersContainer.appendChild(item);
      });
    });
  }

  const fetchMonsters = () => {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(response => response.json())
    .then(json => renderMonsters(json));
  }
  
  forward.addEventListener('click', () => {
    page++;
    mostersContainer.querySelectorAll('*').forEach(n => n.remove());
    fetchMonsters();
  });

  back.addEventListener('click', () => {
    if (page === 1) {
      alert('There no monsters that way!');
    } else {
      page--;
      mostersContainer.querySelectorAll('*').forEach(n => n.remove());
      fetchMonsters();
    }
  });

  renderCreateMonster();
  fetchMonsters();
});