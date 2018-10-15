/* eslint-disable no-console */
const bodyParser = require('body-parser');
const path = require('path');
const Sort = require('./sort');
const Hash = require('./hash')
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
	sorted.get('/quick/:size', async (req, res) => {
		try {
			console.log(`GET/ > Quick/Sorted - Array Size: ${req.params.size}`)
			arr = await Sort.createSortedArray(req.params.size);
			data = await Sort.quickSort(arr)
			res.json(data)
		} catch (e) {
			console.log(e);
		}
	});
	sorted.get('/merge/:size', async (req, res) => {
		try {
			console.log(`GET/ > Merge/Sorted - Array Size: ${req.params.size}`)
			arr = await Sort.createSortedArray(req.params.size);
			data = await Sort.mergeSort(arr)
			res.json(data)
		} catch (e) {
			console.log(e);
		}
	});
	sorted.get('/radix/:size', async (req, res) => {
		try {
			console.log(`GET/ > Radix/Sorted - Array Size: ${req.params.size}`)
			arr = await Sort.createSortedArray(req.params.size);
			data = await Sort.radixSort(arr)
			res.json(data)
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
	reversed.get('/quick/:size', async (req, res) => {
		try {
			console.log(`GET/ > Quick/Reversed - Array Size: ${req.params.size}`)
			arr = await Sort.createReversedArray(req.params.size);
			data = await Sort.quickSort(arr)
			res.json(data)
		} catch (e) {
			console.log(e);
		}
	});
	reversed.get('/merge/:size', async (req, res) => {
		try {
			console.log(`GET/ > Merge/Reversed - Array Size: ${req.params.size}`)
			arr = await Sort.createReversedArray(req.params.size);
			data = await Sort.mergeSort(arr)
			res.json(data)
		} catch (e) {
			console.log(e);
		}
	});
	reversed.get('/radix/:size', async (req, res) => {
		try {
			console.log(`GET/ > Radix/Reversed - Array Size: ${req.params.size}`)
			arr = await Sort.createReversedArray(req.params.size);
			data = await Sort.radixSort(arr)
			res.json(data)
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
	random.get('/quick/:size', async (req, res) => {
		try {
			console.log(`GET/ > Quick/Random - Array Size: ${req.params.size}`)
			arr = await Sort.createRandomArray(req.params.size);
			data = await Sort.quickSort(arr)
			res.json(data)
		} catch (e) {
			console.log(e);
		}
	});
	random.get('/merge/:size', async (req, res) => {
		try {
			console.log(`GET/ > Merge/Random - Array Size: ${req.params.size}`)
			arr = await Sort.createRandomArray(req.params.size);
			data = await Sort.mergeSort(arr)
			res.json(data)
		} catch (e) {
			console.log(e);
		}
	});
	random.get('/radix/:size', async (req, res) => {
		try {
			console.log(`GET/ > Radix/Random - Array Size: ${req.params.size}`)
			arr = await Sort.createRandomArray(req.params.size);
			data = await Sort.radixSort(arr)
			res.json(data)
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
	custom.get('/quick/:array', async (req, res) => {
		try {
			console.log(`GET/ > Quick/Custom - Array Size: ${req.params.array.split(',').length}`)
			const data = await Sort.quickSort(req.params.array.split(','))
			res.json(data)
		} catch (e) {
			console.log(e);
		}
	});
	custom.get('/merge/:array', async (req, res) => {
		try {
			console.log(`GET/ > Merge/Custom - Array Size: ${req.params.array.split(',').length}`)
			const data = await Sort.mergeSort(req.params.array.split(','))
			res.json(data)
		} catch (e) {
			console.log(e);
		}
	});
	custom.get('/radix/:array', async (req, res) => {
		try {
			console.log(`GET/ > Radix/Custom - Array Size: ${req.params.array.split(',').length}`)
			const data = await Sort.radixSort(req.params.array.split(','))
			res.json(data)
		} catch (e) {
			console.log(e);
		}
	});
});

let hashTable;
routes.prefix('/hash', async hash => {
	hash.post('/', async (req, res) => {
		try {
			console.log(`POST/ > Hash - NEW`)
			hashTable = new Hash(1009, 'openDoubleHashing');
			res.json(hashTable)
		} catch (e) {
			console.error(e);
		}
	});

	hash.post('/:key/:data', async (req, res) => {
		try {
			console.log(`POST/ > Hash - Adding info`);
			if (!hashTable) hashTable = new Hash(1009, 'openDoubleHashing');
			let {
				conflicts,
				exist
			} = hashTable.insert(req.params.key, req.params.data);
			res.json({
				key: req.params.key,
				data: req.params.data,
				conflicts: conflicts,
				exist: exist
			})
		} catch (e) {
			console.error(e);
		}
	});

	hash.get('/:key', async (req, res) => {
		try {
			console.log(`GET/ > Hash - Retrieve info from key ${req.params.key}`)
			res.json(hashTable.search(req.params.key))
		} catch (e) {
			console.error(e);
		}
	});
});

app.use(routes);
app.use(express.static('assets'));
app.use(express.static('node_modules/chartjs-plugin-zoom'));
app.use(express.static('Lab1'));
app.use(express.static('Lab2+3'));
app.use(express.static('Lab4'));
app.use(express.static('Lab1/csv'));
app.use(express.static('Lab2+3/csv'));

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
app.get('/lab1', async (req, res) => {
	res.sendFile(path.join(__dirname + '/lab1.html'));
});
app.get('/lab2', async (req, res) => {
	res.sendFile(path.join(__dirname + '/lab2.html'));
});
app.get('/lab3', async (req, res) => {
	res.sendFile(path.join(__dirname + '/lab2.html'));
});
app.get('/lab4', async (req, res) => {
	res.sendFile(path.join(__dirname + '/lab4.html'));
});

app.listen(5000, async () => console.log('Everything is ready! You can find it in localhost:5000'));
