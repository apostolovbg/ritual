const content = document.getElementById('content');
let token = localStorage.getItem('token') || '';

function show(name) {
  const pages = {
    register: renderRegister,
    login: renderLogin,
    profile: renderProfile,
    events: renderEvents,
    create: renderCreateEvent
  };
  pages[name]();
}

function renderRegister() {
  content.innerHTML = `
    <h2>Register</h2>
    <form id="regForm">
      <input name="email" placeholder="Email"><br>
      <input name="password" type="password" placeholder="Password"><br>
      <select name="role">
        <option value="artist">Artist</option>
        <option value="club">Club</option>
      </select><br>
      <button type="submit">Register</button>
    </form>
  `;
  document.getElementById('regForm').onsubmit = async e => {
    e.preventDefault();
    const f = e.target;
    await fetch('/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: f.email.value, password: f.password.value, role: f.role.value})
    });
    await login(f.email.value, f.password.value);
  };
}

async function login(email, password) {
  const res = await fetch('/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({email, password})
  });
  if (res.ok) {
    const data = await res.json();
    token = data.access_token;
    localStorage.setItem('token', token);
    show('profile');
  } else {
    alert('Login failed');
  }
}

function renderLogin() {
  content.innerHTML = `
    <h2>Login</h2>
    <form id="loginForm">
      <input name="email" placeholder="Email"><br>
      <input name="password" type="password" placeholder="Password"><br>
      <button type="submit">Login</button>
    </form>
  `;
  document.getElementById('loginForm').onsubmit = e => {
    e.preventDefault();
    login(e.target.email.value, e.target.password.value);
  };
}

function renderProfile() {
  if (!token) { content.textContent = 'Please log in'; return; }
  fetch('/me', {headers: {Authorization: 'Bearer ' + token}})
    .then(res => res.json())
    .then(data => {
      content.innerHTML = `
        <h2>Profile</h2>
        <pre>${JSON.stringify(data, null, 2)}</pre>
        <textarea id="bio" placeholder="Bio"></textarea><br>
        <button id="save">Save</button>
      `;
      document.getElementById('save').onclick = () => {
        fetch('/me/profile', {
          method: 'PUT',
          headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + token},
          body: JSON.stringify({bio: document.getElementById('bio').value})
        });
      };
    });
}

function renderEvents() {
  fetch('/events')
    .then(res => res.json())
    .then(evts => {
      content.innerHTML = '<h2>Events</h2>' + evts.map(e => {
        return `<div> ${e.title} <button data-id="${e.id}" class="book">Book</button></div>`;
      }).join('');
      document.querySelectorAll('.book').forEach(btn => {
        btn.onclick = () => {
          if (!token) { alert('login first'); return; }
          fetch('/bookings', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + token},
            body: JSON.stringify({club_id: 1, event_id: btn.dataset.id})
          });
        };
      });
    });
}

function renderCreateEvent() {
  if (!token) { content.textContent = 'Please log in'; return; }
  content.innerHTML = `
    <h2>Create Event</h2>
    <form id="eventForm">
      <input name="title" placeholder="Title"><br>
      <button type="submit">Create</button>
    </form>`;
  document.getElementById('eventForm').onsubmit = e => {
    e.preventDefault();
    fetch('/events', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + token},
      body: JSON.stringify({title: e.target.title.value})
    });
  };
}

// navigation buttons
document.getElementById('nav-register').onclick = () => show('register');
document.getElementById('nav-login').onclick = () => show('login');
document.getElementById('nav-profile').onclick = () => show('profile');
document.getElementById('nav-events').onclick = () => show('events');
document.getElementById('nav-create-event').onclick = () => show('create');

show('events');
