const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.content');

tabs.forEach(tab => {

  tab.addEventListener('click', () => {

    tabs.forEach(btn => {
      btn.classList.remove('active');
    });

    contents.forEach(content => {
      content.classList.remove('active-content');
    });

    tab.classList.add('active');

    document
      .getElementById(tab.dataset.tab)
      .classList.add('active-content');

  });

});

const form = document.getElementById('contactForm');

const historyDiv = document.getElementById('history');

const successMsg = document.getElementById('successMsg');

function loadMessages(){

  const messages =
    JSON.parse(localStorage.getItem('messages')) || [];

  historyDiv.innerHTML = '';

  messages.reverse().forEach((msg,index)=>{

    const div = document.createElement('div');

    div.classList.add('message');

    div.innerHTML = `
      <h3>${msg.name}</h3>
      <p>${msg.email}</p>
      <p>${msg.message}</p>

      <button
        class="delete-btn"
        onclick="deleteMessage(${index})"
      >
        Delete
      </button>
    `;

    historyDiv.appendChild(div);

  });

}

form.addEventListener('submit',(e)=>{

  e.preventDefault();

  const name =
    document.getElementById('name').value;

  const email =
    document.getElementById('email').value;

  const message =
    document.getElementById('message').value;

  const messages =
    JSON.parse(localStorage.getItem('messages')) || [];

  messages.push({
    name,
    email,
    message
  });

  localStorage.setItem(
    'messages',
    JSON.stringify(messages)
  );

  successMsg.innerText =
    'Message Sent Successfully ✅';

  form.reset();

  loadMessages();

});

function deleteMessage(index){

  const messages =
    JSON.parse(localStorage.getItem('messages'));

  messages.splice(index,1);

  localStorage.setItem(
    'messages',
    JSON.stringify(messages)
  );

  loadMessages();

}

loadMessages();