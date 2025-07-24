const content = document.getElementById('content');
let token = localStorage.getItem('token') || '';

function updateNav() {
  document.getElementById('nav-login').style.display = token ? 'none' : 'inline';
  document.getElementById('nav-logout').style.display = token ? 'inline' : 'none';
  document.getElementById('nav-profile').style.display = token ? 'inline' : 'none';
  document.getElementById('nav-create-event').style.display = token ? 'inline' : 'none';
}

function show(name) {
const pages = {
    register: renderRegister,
    login: renderLogin,
    profile: renderProfile,
    events: renderEvents,
    create: renderCreateEvent,
    artists: renderArtists,
    clubs: renderClubs
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
    updateNav();
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

function logout() {
  token = '';
  localStorage.removeItem('token');
  updateNav();
  show('login');
}

function renderProfile() {
  if (!token) { content.textContent = 'Please log in'; return; }
  Promise.all([
    fetch('/me', { headers: { Authorization: 'Bearer ' + token } }).then(r => r.json()),
    fetch('/me/profile', { headers: { Authorization: 'Bearer ' + token } }).then(r => r.json())
  ]).then(([user, profile]) => {
    content.innerHTML = `
      <h2>Profile</h2>
      <pre>${JSON.stringify(user, null, 2)}</pre>
      <input id="given_name" placeholder="Given name" value="${profile.given_name || ''}"><br>
      <textarea id="bio" placeholder="Bio">${profile.bio || ''}</textarea><br>
      <button id="save">Save</button>
    `;
    document.getElementById('save').onclick = () => {
      fetch('/me/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        body: JSON.stringify({
          given_name: document.getElementById('given_name').value,
          bio: document.getElementById('bio').value
        })
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
      <input name="date" placeholder="Date"><br>
      <input name="start_time" placeholder="Start time"><br>
      <input name="end_time" placeholder="End time"><br>
      <button type="submit">Create</button>
    </form>`;
  document.getElementById('eventForm').onsubmit = e => {
    e.preventDefault();
    fetch('/events', {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + token},
      body: JSON.stringify({
        title: e.target.title.value,
        date: e.target.date.value,
        start_time: e.target.start_time.value,
        end_time: e.target.end_time.value
      })
    });
  };
}

function renderArtists() {
  fetch('/artists').then(r => r.json()).then(list => {
    content.innerHTML = '<h2>Artists</h2>' + list.map(a => `<div>${a.stage_name}</div>`).join('');
  });
}

function renderClubs() {
  fetch('/clubs').then(r => r.json()).then(list => {
    content.innerHTML = '<h2>Venues</h2>' + list.map(c => `<div>${c.name}</div>`).join('');
  });
}

// navigation buttons
document.getElementById('nav-register').onclick = () => show('register');
document.getElementById('nav-login').onclick = () => show('login');
document.getElementById('nav-logout').onclick = () => logout();
document.getElementById('nav-profile').onclick = () => show('profile');
document.getElementById('nav-artists').onclick = () => show('artists');
document.getElementById('nav-clubs').onclick = () => show('clubs');
document.getElementById('nav-events').onclick = () => show('events');
document.getElementById('nav-create-event').onclick = () => show('create');

updateNav();
show('events');
