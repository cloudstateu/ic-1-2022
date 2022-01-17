const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (_, res) => {
  res.json({ status: 'ok', data: process.env });
});

// /greet?name=Joe
app.get('/greet', (req, res) => {
  const name = req.query.name;
  res.json({ status: 'ok', data: name });
});

const port = process.env.PORT || 8081;
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
