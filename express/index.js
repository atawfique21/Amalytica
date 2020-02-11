const express = require('express');
const PORT = process.env.PORT || 3001;
const Scraper = require('./test.js')

const cors = require('cors')
const logger = require('morgan');

const app = express();
app.use(cors())
app.use(logger('dev'));
console.log(typeof Scraper)


// routes

app.get('/:id', (req, res) => {
  Scraper(req.params.id)
})

// error handler

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
