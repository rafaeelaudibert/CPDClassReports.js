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
		try {
			console.log(`GET/ > Bubble/Sorted - Array Size: ${req.params.size}`)
			arr = await Sort.createSortedArray(req.params.size);
			data = await Sort.bubbleSort(arr)
			res.json(data)
		} catch (e) {
			console.log(e);
		}
	});
	sorted.get('/insertion/:size', async (req, res) => {
		try {
			console.log(`GET/ > Insertion/Sorted - Array Size: ${req.params.size}`)
			arr = await Sort.createSortedArray(req.params.size);
			data = await Sort.insertionSort(arr)
			res.json(data)
		} catch (e) {
			console.log(e);
		}
	});
	sorted.get('/binaryInsertion/:size', async (req, res) => {
		try {
			console.log(`GET/ > BinaryInsertion/Sorted - Array Size: ${req.params.size}`)
			arr = await Sort.createSortedArray(req.params.size);
			data = await Sort.binaryInsertionSort(arr)
			res.json(data)
		} catch (e) {
			console.log(e);
		}
	});
	sorted.get('/shell/:id/:size', async (req, res) => {
		try {
			console.log(`GET/ > Shell${req.params.id}/Sorted - Array Size: ${req.params.size}`)
			arr = await Sort.createSortedArray(req.params.size)
			data = await Sort.shellSort(arr, req.params.id)
			res.json(data);
		} catch (e) {
			console.log(e);
		}
	});
});

/* REVERSED ARRAYS */
routes.prefix('/reversed', async reversed => {
	reversed.get('/bubble/:size', async (req, res) => {
		try {
			console.log(`GET/ > Bubble/Reversed - Array Size: ${req.params.size}`)
			arr = await Sort.createReversedArray(req.params.size);
			data = await Sort.bubbleSort(arr)
			res.json(data)
		} catch (e) {
			console.log(e);
		}
	});
	reversed.get('/insertion/:size', async (req, res) => {
		try {
			console.log(`GET/ > Insertion/Reversed - Array Size: ${req.params.size}`)
			arr = await Sort.createReversedArray(req.params.size);
			data = await Sort.insertionSort(arr)
			res.json(data)
		} catch (e) {
			console.log(e);
		}
	});
	reversed.get('/binaryInsertion/:size', async (req, res) => {
		try {
			console.log(`GET/ > BinaryInsertion/Reversed - Array Size: ${req.params.size}`)
			arr = await Sort.createReversedArray(req.params.size);
			data = await Sort.binaryInsertionSort(arr)
			res.json(data)
		} catch (e) {
			console.log(e);
		}
	});
	reversed.get('/shell/:id/:size', async (req, res) => {
		try {
			console.log(`GET/ > Shell${req.params.id}/Reversed - Array Size: ${req.params.size}`)
			arr = await Sort.createReversedArray(req.params.size)
			data = await Sort.shellSort(arr, req.params.id)
			res.json(data);
		} catch (e) {
			console.log(e);
		}
	});
});


/* RANDOM ARRAYS */
routes.prefix('/random', async random => {
	random.get('/bubble/:size', async (req, res) => {
		try {
			console.log(`GET/ > Bubble/Random - Array Size: ${req.params.size}`)
			arr = await Sort.createRandomArray(req.params.size);
			data = await Sort.bubbleSort(arr)
			res.json(data)
		} catch (e) {
			console.log(e);
		}
	});
	random.get('/insertion/:size', async (req, res) => {
		try {
			console.log(`GET/ > Insertion/Random - Array Size: ${req.params.size}`)
			arr = await Sort.createRandomArray(req.params.size);
			data = await Sort.insertionSort(arr)
			res.json(data)
		} catch (e) {
			console.log(e);
		}
	});
	random.get('/binaryInsertion/:size', async (req, res) => {
		try {
			console.log(`GET/ > binaryInsertion/Random - Array Size: ${req.params.size}`)
			arr = await Sort.createRandomArray(req.params.size);
			data = await Sort.binaryInsertionSort(arr)
			res.json(data)
		} catch (e) {
			console.log(e);
		}
	});
	random.get('/shell/:id/:size', async (req, res) => {
		try {
			console.log(`GET/ > Shell${req.params.id}/Random - Array Size: ${req.params.size}`)
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
		try {
			console.log(`GET/ > Bubble/Custom - Array Size: ${req.params.array.split(',').length}`)
			const data = await Sort.bubbleSort(req.params.array.split(','))
			res.json(data)
		} catch (e) {
			console.log(e);
		}
	});
	custom.get('/insertion/:array', async (req, res) => {
		try {
			console.log(`GET/ > Insertion/Custom - Array Size: ${req.params.array.split(',').length}`)
			const data = await Sort.insertionSort(req.params.array.split(','))
			res.json(data)
		} catch (e) {
			console.log(e);
		}
	});
	custom.get('/binaryInsertion/:array', async (req, res) => {
		try {
			console.log(`GET/ > BinaryInsertion/Custom - Array Size: ${req.params.array.split(',').length}`)
			const data = await Sort.binaryInsertionSort(req.params.array.split(','))
			res.json(data)
		} catch (e) {
			console.log(e);
		}
	});
	custom.get('/shell/:id/:array', async (req, res) => {
		try {
			console.log(`GET/ > Shell${req.params.id}/Custom - Array Size: ${req.params.array.split(',').length}`)
			const data = await Sort.shellSort(req.params.array.split(','), req.params.id);
			res.json(data);
		} catch (e) {
			console.log(e);
		}
	});
});

app.use(routes);
app.use(express.static('src'));
app.use(express.static('src/assets'));
app.use(express.static('node_modules/chartjs-plugin-zoom'));
app.use(express.static('csv'));

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
app.listen(5000, async () => console.log('Everything is ready! You can find it in localhost:5000'));
