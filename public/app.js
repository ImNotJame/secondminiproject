const API = '/api/games';
const list = document.getElementById('list');
const form = document.getElementById('form');

const titleInput = document.getElementById('title');
const results = document.getElementById('results');
let picked = null;
let timer;

titleInput.oninput = () => {
  picked = null;
  clearTimeout(timer);
  const q = titleInput.value.trim();
  if(q.length < 2){results.innerHTML = ''; return; }
  timer = setTimeout(() => searchSteam(q), 350);
}

async function searchSteam(q) {
  const res = await fetch(`/api/steam/search?q=${encodeURIComponent(q)}`);
  if (!res.ok) { results.innerHTML = ''; return; }
  const games = await res.json();
  results.innerHTML = '';

  for (const g of games) {
    const row = document.createElement('div');
    row.className = 'result';

    const img = document.createElement('img');
    img.src = g.thumb || '';
    img.alt = '';

    const name = document.createElement('span');
    name.textContent = g.title;

    row.append(img, name);
    row.onclick = () => pickGame(g);
    results.appendChild(row);
  }
}

async function pickGame(g) {
  titleInput.value = g.title;
  results.innerHTML = '';
  picked = {appid: g.appid, title: g.title, cover: g.thumb, genre: '' };   

  const res = await fetch(`/api/steam/details/${g.appid}`);
  if (res.ok) picked = await res.json();                    
}

async function loadGames() {
  const res = await fetch(API);
  const games = await res.json();
  list.innerHTML = '';

  for (const g of games) {
    const li = document.createElement('li');
    li.dataset.status = g.status

    const name = document.createElement('span');
    name.className = 'name';
    name.textContent = g.title;

    const platform = document.createElement('span');
    platform.className = 'platform';
    platform.textContent = [g.platform, g.genre].filter(Boolean).join(' · ');

    if (g.cover) {
      const img = document.createElement('img');
      img.className = 'cover';
      img.src = g.cover;
      img.alt = '';

      const appid = g.appid || (g.cover.match(/\/apps\/(\d+)\//) || [])[1];

      if (appid) {
        const a = document.createElement('a');
        a.className = 'cover-link';
        a.href = `https://store.steampowered.com/app/${appid}`;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.title = 'Open on Steam';
        a.append(img);
        li.append(a);
      } else {
        li.append(img);
      }
    }

    li.append(name, platform);

    const stars = document.createElement('div');
    stars.className = 'stars';

    const paint = () =>{
      [...stars.children].forEach((b,i) =>
        b.classList.toggle('on', i  < (g.rating || 0))
      );
    };

    for (let n = 1; n <= 5; n++){
      const b = document.createElement('button');
      b.type = 'button'
      b.textContent = '★';
      b.setAttribute('aria-label', `Rate ${n} out of 5`);
      b.onclick = async () =>{
        g.rating = g.rating === n ? null : n;
        paint();
        await fetch(`${API}/${g._id}`, {
          method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: g.rating }),
        });
      };
    stars.append(b);
    }

    paint();
    li.append(stars)


    const select = document.createElement('select');
    for (const s of ['backlog', 'playing', 'completed', 'dropped']) {
      const opt = new Option(s, s, false, s === g.status);
      select.add(opt);
    }

    select.onchange = async () => {
      li.dataset.status = select.value;
      await fetch(`${API}/${g._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: select.value }),
      });
    };

    const del = document.createElement('button');
    del.textContent = 'Delete';
    del.onclick = async () => {
      await fetch(`${API}/${g._id}`, { method: 'DELETE' });
      loadGames();
    };

    li.append(select, del);
    list.appendChild(li);
  }
}

form.onsubmit = async (e) => {
  e.preventDefault();
  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: titleInput.value,
      platform: 'PC',
      appid: picked?.appid || null,
      cover: picked?.cover || '',
      genre: picked?.genre || '',
    }),
  });
  form.reset();
  picked = null;
  results.innerHTML = '';
  loadGames();
};

loadGames();