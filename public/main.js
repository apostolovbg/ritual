const content = document.getElementById('content');
let token = localStorage.getItem('token') || '';
let userRole = localStorage.getItem('role') || '';
let userId = parseInt(localStorage.getItem('uid') || '0');

function updateNav() {
  document.getElementById('nav-login').style.display = token ? 'none' : 'inline';
  document.getElementById('nav-logout').style.display = token ? 'inline' : 'none';
  document.getElementById('nav-profile').style.display = token ? 'inline' : 'none';
  document.getElementById('nav-create-event').style.display = token && userRole === 'club' ? 'inline' : 'none';
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
    // Retrieve the user record so we know which role is logged in
    const me = await fetch('/me', { headers: { Authorization: 'Bearer ' + token } }).then(r => r.json());
    userRole = me.role;
    userId = me.id;
    localStorage.setItem('role', userRole);
    localStorage.setItem('uid', userId);
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
  localStorage.removeItem('role');
  localStorage.removeItem('uid');
  userRole = '';
  userId = 0;
  updateNav();
  show('login');
}

function renderProfile() {
  if (!token) { content.textContent = 'Please log in'; return; }
  Promise.all([
    fetch('/me', { headers: { Authorization: 'Bearer ' + token } }).then(r => r.json()),
    fetch('/me/profile', { headers: { Authorization: 'Bearer ' + token } }).then(r => r.json())
  ]).then(([user, profile]) => {
    userRole = user.role;
    userId = user.id;
    localStorage.setItem('role', userRole);
    localStorage.setItem('uid', userId);
    updateNav();

    if (user.role === 'artist') {
      content.innerHTML = `
        <h2>Artist Profile</h2>
        ID: ${user.id}<br>
        <input id="email" placeholder="Email" value="${user.email}"><br>
        <input id="given_name" placeholder="Given name" value="${profile.given_name || ''}"><br>
        <input id="father_name" placeholder="Father name" value="${profile.father_name || ''}"><br>
        <input id="family_name" placeholder="Family name" value="${profile.family_name || ''}"><br>
        <label><input type="checkbox" id="use_real" ${profile.uses_real_name ? 'checked' : ''}> Using real name</label><br>
        <input id="stage_names" placeholder="Stage names comma separated" value="${profile.stage_name || ''}"><br>
        <input id="country" placeholder="Country" value="${profile.country || ''}"><br>
        <input id="city" placeholder="City" value="${profile.city || ''}"><br>
        <input id="birth_date" type="date" value="${profile.birth_date || ''}"> Age: <span id="age"></span><br>
        <input id="genres" placeholder="Genres" value="${profile.genres || ''}"><br>
        <textarea id="bio" placeholder="Bio">${profile.bio || ''}</textarea><br>
        <button id="save">Save</button>
      `;
      const ageEl = document.getElementById('age');
      function updateAge() {
        const d = document.getElementById('birth_date').value;
        if (d) {
          const age = new Date().getFullYear() - new Date(d).getFullYear();
          ageEl.textContent = age;
        }
      }
      updateAge();
      document.getElementById('birth_date').onchange = updateAge;
      document.getElementById('use_real').onchange = e => {
        document.getElementById('stage_names').disabled = e.target.checked;
      };
      document.getElementById('save').onclick = () => {
        fetch('/me/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
          body: JSON.stringify({
            email: document.getElementById('email').value,
            given_name: document.getElementById('given_name').value,
            father_name: document.getElementById('father_name').value,
            family_name: document.getElementById('family_name').value,
            uses_real_name: document.getElementById('use_real').checked ? 1 : 0,
            stage_name: document.getElementById('stage_names').value,
            country: document.getElementById('country').value,
            city: document.getElementById('city').value,
            birth_date: document.getElementById('birth_date').value,
            genres: document.getElementById('genres').value,
            bio: document.getElementById('bio').value
          })
        }).then(renderProfile);
      };
    } else {
      content.innerHTML = `
        <h2>Venue Profile</h2>
        ID: ${user.id}<br>
        <input id="email" placeholder="Email" value="${user.email}"><br>
        <input id="name" placeholder="Name" value="${profile.name || ''}"><br>
        <input id="country" placeholder="Country" value="${profile.country || ''}"><br>
        <input id="city" placeholder="City" value="${profile.city || ''}"><br>
        <input id="address" placeholder="Address" value="${profile.address || ''}"><br>
        <input id="capacity" placeholder="Capacity" value="${profile.capacity || ''}"><br>
        <input id="genres" placeholder="Genres" value="${profile.genres || ''}">
        <label><input type="checkbox" id="various" ${profile.genres === 'All' ? 'checked' : ''}> All/Various</label><br>
        <input id="hours" placeholder="Working hours" value="${profile.hours || ''}"><br>
        <textarea id="about" placeholder="History and description">${profile.about || ''}</textarea><br>
        <button id="save">Save</button>
        <div id="venue-events"></div>
      `;
      document.getElementById('various').onchange = e => {
        const g = document.getElementById('genres');
        if (e.target.checked) { g.value = 'All'; g.disabled = true; } else { g.disabled = false; }
      };
      document.getElementById('save').onclick = () => {
        fetch('/me/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
          body: JSON.stringify({
            email: document.getElementById('email').value,
            name: document.getElementById('name').value,
            country: document.getElementById('country').value,
            city: document.getElementById('city').value,
            address: document.getElementById('address').value,
            capacity: document.getElementById('capacity').value,
            genres: document.getElementById('genres').value,
            hours: document.getElementById('hours').value,
            about: document.getElementById('about').value
          })
        }).then(renderProfile);
      };

      fetch(`/clubs/${userId}/events`).then(r => r.json()).then(events => {
        document.getElementById('venue-events').innerHTML = '<h3>Upcoming events</h3>' +
          events.map(ev => `<div>${ev.title} (${ev.date})</div>`).join('');
      });
    }
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
  if (!token || userRole !== 'club') { content.textContent = 'Club login required'; return; }
  content.innerHTML = `
    <h2>Create Event</h2>
    <form id="eventForm">
      <input name="title" placeholder="Title"><br>
      <input name="date" placeholder="Date"><br>
      <input name="start_time" placeholder="Start time"><br>
      <input name="end_time" placeholder="End time"><br>
      <button type="submit">Create</button>
    </form>
    <div id="my-events"></div>`;
  function load() {
    fetch(`/clubs/${userId}/events`).then(r => r.json()).then(list => {
      document.getElementById('my-events').innerHTML = '<h3>Your events</h3>' +
        list.map(ev => `<div>${ev.title} <button data-id="${ev.id}" class="edit">Edit</button></div>`).join('');
      document.querySelectorAll('.edit').forEach(btn => {
        btn.onclick = () => editEvent(btn.dataset.id);
      });
    });
  }
  load();
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
    }).then(load);
  };

  function editEvent(id) {
    fetch(`/events/${id}`).then(r => r.json()).then(ev => {
      document.querySelector('#eventForm [name=title]').value = ev.title;
      document.querySelector('#eventForm [name=date]').value = ev.date;
      document.querySelector('#eventForm [name=start_time]').value = ev.start_time;
      document.querySelector('#eventForm [name=end_time]').value = ev.end_time;
      document.getElementById('eventForm').onsubmit = e => {
        e.preventDefault();
        fetch(`/events/${id}`, {
          method: 'PUT',
          headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + token},
          body: JSON.stringify({
            title: e.target.title.value,
            date: e.target.date.value,
            start_time: e.target.start_time.value,
            end_time: e.target.end_time.value
          })
        }).then(load);
      };
    });
  }
}

function renderArtists() {
  fetch('/artists').then(r => r.json()).then(list => {
    content.innerHTML = '<h2>Artists</h2>' + list.map(a => `<div>${a.user_id}: <a href="#" data-id="${a.user_id}" class="prof">${a.stage_name}</a></div>`).join('');
    document.querySelectorAll('.prof').forEach(a => {
      a.onclick = e => { e.preventDefault(); renderPublicProfile(a.dataset.id); };
    });
  });
}

function renderClubs() {
  fetch('/clubs').then(r => r.json()).then(list => {
    content.innerHTML = '<h2>Venues</h2>' + list.map(c => `<div>${c.user_id}: <a href="#" data-id="${c.user_id}" class="prof">${c.name}</a></div>`).join('');
    document.querySelectorAll('.prof').forEach(a => {
      a.onclick = e => { e.preventDefault(); renderPublicProfile(a.dataset.id); };
    });
  });
}

function renderPublicProfile(id) {
  fetch(`/profiles/${id}`).then(r => r.json()).then(p => {
    let html = `<h2>Profile ${id}</h2>`;
    if (p.role === 'artist') {
      html += `<div>Stage name: ${p.stage_name}</div>`;
      html += `<div>Country: ${p.country}</div>`;
      html += `<div>City: ${p.city}</div>`;
      html += `<div>Bio: ${p.bio}</div>`;
    } else {
      html += `<div>Name: ${p.name}</div>`;
      html += `<div>Country: ${p.country}</div>`;
      html += `<div>City: ${p.city}</div>`;
      html += `<div>About: ${p.about}</div>`;
      fetch(`/clubs/${id}/events`).then(r => r.json()).then(evts => {
        html += '<h3>Upcoming events</h3>' + evts.map(ev => `<div>${ev.title}</div>`).join('');
        content.innerHTML = html;
      });
      return;
    }
    content.innerHTML = html;
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
