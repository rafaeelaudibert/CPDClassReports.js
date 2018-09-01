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
routes.prefix('/sorted', async sorted => {
	sorted.get('/bubble/:size', async (req, res) => {
		Sort.createSortedArray(req.params.size)
			.then(array => Sort.bubbleSort(array))
			.then(data => res.json(data))
			.catch(console.error);
	});
	sorted.get('/insertion/:size', async (req, res) => {
		Sort.createSortedArray(req.params.size)
			.then(array => Sort.insertionSort(array))
			.then(data => res.json(data))
			.catch(console.error);
	});
	sorted.get('/binaryInsertion/:size', async (req, res) => {
		Sort.createSortedArray(req.params.size)
			.then(array => Sort.binaryInsertionSort(array))
			.then(data => res.json(data))
			.catch(console.error);
	});
	sorted.get('/shell/:id/:size', async (req, res) => {
		Sort.createSortedArray(req.params.size)
			.then(array => Sort.shellSort(array, req.params.id))
			.then(data => res.json(data))
			.catch(console.error);
	});
});

/* REVERSED ARRAYS */
routes.prefix('/reversed', async reversed => {
	reversed.get('/bubble/:size', async (req, res) => {
		Sort.createReversedArray(req.params.size)
			.then(array => Sort.bubbleSort(array))
			.then(data => res.json(data))
			.catch(console.error);
	});
	reversed.get('/insertion/:size', async (req, res) => {
		Sort.createReversedArray(req.params.size)
			.then(array => Sort.insertionSort(array))
			.then(data => res.json(data))
			.catch(console.error);
	});
	reversed.get('/binaryInsertion/:size', async (req, res) => {
		Sort.createReversedArray(req.params.size)
			.then(array => Sort.binaryInsertionSort(array))
			.then(data => res.json(data))
			.catch(console.error);
	});
	reversed.get('/shell/:id/:size', async (req, res) => {
		Sort.createReversedArray(req.params.size)
			.then(array => Sort.shellSort(array, req.params.id))
			.then(data => res.json(data))
			.catch(console.error);
	});
});


/* RANDOM ARRAYS */
routes.prefix('/random', async random => {
	random.get('/bubble/:size', async (req, res) => {
		try {
			arr = await Sort.createRandomArray(req.params.size);
			data = await Sort.bubbleSort(arr)
			res.json(data)
		} catch (e) {
			console.log(e);
		}
	});
	random.get('/insertion/:size', async (req, res) => {
		try {
			arr = await Sort.createRandomArray(req.params.size);
			data = await Sort.insertionSort(arr)
			res.json(data)
		} catch (e) {
			console.log(e);
		}
	});
	random.get('/binaryInsertion/:size', async (req, res) => {
		try {
			arr = await Sort.createRandomArray(req.params.size);
			data = await Sort.binaryInsertionSort(arr)
			res.json(data)
		} catch (e) {
			console.log(e);
		}
	});
	random.get('/shell/:id/:size', async (req, res) => {
		try {
			arr = await Sort.createRandomArray(req.params.size)
			data = await Sort.shellSort(arr, req.params.id)
			res.json(data);
		} catch (e) {
			console.log(e);
		}
	});
});

/* CUSTOM ARRAYS */
routes.prefix('/custom', async custom => {
	custom.get('/bubble/:array', async (req, res) => {
		Sort.bubbleSort(req.params.array.split(','))
			.then(data => res.json(data))
			.catch(console.error);
	});
	custom.get('/insertion/:array', async (req, res) => {
		Sort.insertionSort(req.params.array.split(','))
			.then(data => res.json(data))
			.catch(console.error);
	});
	custom.get('/binaryInsertion/:array', async (req, res) => {
		Sort.binaryInsertionSort(req.params.array.split(','))
			.then(data => res.json(data))
			.catch(console.error);
	});
	custom.get('/shell/:id/:array', async (req, res) => {
		Sort.bubbleSort(req.params.array.split(','), req.params.id)
			.then(data => res.json(data))
			.catch(console.error);
	});
});

let startTime;
setInterval(function() {
	if (!startTime) {
		startTime = Date.now();
	}
	console.log((Date.now() - startTime) / 1000);
}, 100)

app.use(routes);
app.use(express.static('src/assets'));
app.use(express.static('node_modules/chartjs-plugin-zoom'));
app.use(express.static('notebookCcsv'));

app.use(bodyParser.json());
app.use(async (req, res, next) => {
	res.setHeader('cache-control', 'private, max-age=0, no-cache, no-store, must-revalidate');
	res.setHeader('expires', '0');
	res.setHeader('pragma', 'no-cache');
	next();
});

app.get('/', async (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
});
app.listen(5000, async () => console.log('App ready and running in port 5000!'));
