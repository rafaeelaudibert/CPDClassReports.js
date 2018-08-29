/* eslint-disable no-console */
const bodyParser = require('body-parser');
const path = require('path');
const Sort = require('./sort');
const express = require('express');
const routes = require('express-namespace-routes');
const app = express();

/*********************\
|**** API CALLS ******|
\********************/

/* SORTED ARRAYS */
routes.prefix('/sorted', sorted => {
  sorted.get('/bubble/:size', (req, res) => {
    Sort.createSortedArray(req.params.size)
      .then(array => Sort.bubbleSort(array))
      .then(data => res.json(data))
      .catch(err => res.send(err));
  });
  sorted.get('/insertion/:size', (req, res) => {
    Sort.createSortedArray(req.params.size)
      .then(array => Sort.insertionSort(array))
      .then(data => res.json(data))
      .catch(err => res.send(err));
  });
  sorted.get('/binaryInsertion/:size', (req, res) => {
    Sort.createSortedArray(req.params.size)
      .then(array => Sort.binaryInsertionSort(array))
      .then(data => res.json(data))
      .catch(err => res.send(err));
  });
  sorted.get('/shell/:id/:size', (req, res) => {
    Sort.createSortedArray(req.params.size)
      .then(array => Sort.shellSort(array, req.params.id))
      .then(data => res.json(data))
      .catch(err => console.error("Shit", err));
  });
});

/* REVERSED ARRAYS */
routes.prefix('/reversed', reversed => {
  reversed.get('/bubble/:size', (req, res) => {
    Sort.createReversedArray(req.params.size)
      .then(array => Sort.bubbleSort(array))
      .then(data => res.json(data))
      .catch(err => res.send(err));
  });
  reversed.get('/insertion/:size', (req, res) => {
    Sort.createReversedArray(req.params.size)
      .then(array => Sort.insertionSort(array))
      .then(data => res.json(data))
      .catch(err => res.send(err));
  });
  reversed.get('/binaryInsertion/:size', (req, res) => {
    Sort.createReversedArray(req.params.size)
      .then(array => Sort.binaryInsertionSort(array))
      .then(data => res.json(data))
      .catch(err => res.send(err));
  });
  reversed.get('/shell/:id/:size', (req, res) => {
    Sort.createReversedArray(req.params.size)
      .then(array => Sort.shellSort(array, req.params.id))
      .then(data => res.json(data))
      .catch(err => console.error("Shit", err));
  });
});


/* RANDOM ARRAYS */
routes.prefix('/random', random => {
  random.get('/bubble/:size', (req, res) => {
    Sort.createRandomArray(req.params.size)
      .then(array => Sort.bubbleSort(array))
      .then(data => res.json(data))
      .catch(err => res.send(err));
  });
  random.get('/insertion/:size', (req, res) => {
    Sort.createRandomArray(req.params.size)
      .then(array => Sort.insertionSort(array))
      .then(data => res.json(data))
      .catch(err => res.send(err));
  });
  random.get('/binaryInsertion/:size', (req, res) => {
    Sort.createRandomArray(req.params.size)
      .then(array => Sort.binaryInsertionSort(array))
      .then(data => res.json(data))
      .catch(err => res.send(err));
  });
  random.get('/shell/:id/:size', (req, res) => {
    Sort.createRandomArray(req.params.size)
      .then(array => Sort.shellSort(array, req.params.id))
      .then(data => res.json(data))
      .catch(err => console.error("Shit", err));
  });
});

app.use(routes);
app.use(express.static('src/assets'));
app.use(express.static('node_modules/chartjs-plugin-zoom'));
app.use(express.static('notebookCcsv'));

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('cache-control', 'private, max-age=0, no-cache, no-store, must-revalidate');
  res.setHeader('expires', '0');
  res.setHeader('pragma', 'no-cache');
  next();
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});
app.listen(5000, () => console.log('App ready and running in port 5000!'));