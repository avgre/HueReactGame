const express = require('express');
const app = express();
const port = 5000;
const data = require('./data.js');
const games = data.games;

app.get('/api/games', (req, res) => {
  res.send(
    JSON.stringify({
      success: true,
      games: games,
    })
  );
});

// app.get('/', (req, res) => res.send('Hello World!'));
// app.get('/api/hello', (req, res) => res.json({ data: 'World!' }));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
