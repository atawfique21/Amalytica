const express = require('express');
const PORT = process.env.PORT || 3001;
// const Scraper = require('./test_files/test1.js/index.js')
const getVitals = require('./getVitals.js')
const getBuyBox = require('./getBuyBox.js')
const getOffer = require('./getOffer.js')


const cors = require('cors')
const logger = require('morgan');

const app = express();
app.use(cors())
app.use(logger('dev'));

// routes

// app.get('/:id', async (req, res) => {
//   const rel = await Scraper(req.params.id)
//   res.send(rel)
// })

app.get('/vitals/:id', async (req, res) => {
  const rel = await getVitals(req.params.id)
  res.send(rel)
})

app.get('/buybox/:id', async (req, res) => {
  const rel = await getBuyBox(req.params.id)
  res.send(rel)
})

app.get('/offer/:id/:number', async (req, res) => {
  const rel = await getOffer(req.params.id, req.params.number)
  res.send(rel)
})

// error handler

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err.message);
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
