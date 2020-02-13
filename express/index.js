const express = require('express');
const PORT = process.env.PORT || 3001;
const Scraper = require('./test1.js')

const cors = require('cors')
const logger = require('morgan');

const app = express();
app.use(cors())
app.use(logger('dev'));
console.log(typeof Scraper)


// routes

app.get('/:id', async (req, res) => {
  const rel = await Scraper(req.params.id)
  res.send({ rel })
})

// error handler

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
