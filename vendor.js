// Downloads the three.js scripts into game/lib so the game runs fully offline.
const fs = require('fs'), path = require('path');
const file = path.join(__dirname, '..', 'game', 'index.html');
const libDir = path.join(__dirname, '..', 'game', 'lib');
fs.mkdirSync(libDir, { recursive: true });
(async () => {
  let html = fs.readFileSync(file, 'utf8');
  const urls = [...html.matchAll(/<script src="(https:[^"]+)"><\/script>/g)].map(m => m[1]);
  for (const u of urls) {
    const name = u.split('/').pop();
    const res = await fetch(u);
    if (!res.ok) throw new Error(u + ' -> ' + res.status);
    fs.writeFileSync(path.join(libDir, name), Buffer.from(await res.arrayBuffer()));
    html = html.split(u).join('lib/' + name);
    console.log('saved', name);
  }
  fs.writeFileSync(file, html);
  console.log('Done: game is now offline-ready.');
})().catch(e => { console.error(e); process.exit(1); });
