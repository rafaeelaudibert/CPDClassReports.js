module.exports = class Sort {

	static get NS_PER_SEC() {
		return 1e9;
	}
	constructor(muted) {
		this.muted = muted;
	}

	/* SORTING FUNCTION */
	static async bubbleSort(array) {
		return new Promise((resolve, reject) => {
			try {
				let changes = 0;
				let m = array.length - 1;
				let k = 1;
				let changed = false;

				const time = process.hrtime();
				do {
					changed = false;
					for (let i = 0; i < m; i++) {
						if (array[i] > array[i + 1]) {
							// Swap
							let temp = array[i];
							array[i] = array[i + 1];
							array[i + 1] = temp;

							k = i;
							changed = true;
							changes++;
						}
					}
					m = k;
				} while (changed);
				const diff = process.hrtime(time);

				resolve({
					"changes": changes,
					"time": diff[0] + diff[1] / 1000000000 + " s"
				})
			} catch (e) {
				reject(e);
			}
		})

	}

	static async insertionSort(array) {
		return new Promise((resolve, reject) => {
			try {
				let changes = 0;

				const time = process.hrtime();
				for (let j = 1; j < array.length; j++) {
					let key = array[j];
					let i = j - 1;
					while (i >= 0 && array[i] > key) {
						array[i + 1] = array[i];
						i--;
						changes++;
					}
					array[i + 1] = key;
				}

				const diff = process.hrtime(time);

				resolve({
					"changes": changes,
					"time": diff[0] + diff[1] / 1000000000 + " s"
				});
			} catch (e) {
				reject(e);
			}
		})
	}

	static async binarySearch(array, inf, sup, key) {
		return new Promise(async (resolve, reject) => {
			try {
				let half = inf + Math.floor((sup - inf) / 2);
				let ans;

				if (inf == sup) ans = inf;
				else if (key > array[half]) ans = await this.binarySearch(array, half + 1, sup, key);
				else if (key < array[half]) ans = await this.binarySearch(array, inf, half, key);
				else ans = half;

				resolve(ans);
			} catch (e) {
				reject(e);
			}
		})

	}

	static async binaryInsertionSort(array) {
		return new Promise(async (resolve, reject) => {
			try {
				let changes = 0;
				const time = process.hrtime();
				for (let j = 1; j < array.length; j++) {
					let key = array[j];
					let i = j - 1;
					let posicao = await this.binarySearch(array, 0, j, key);
					while (i >= posicao) {
						array[i + 1] = array[i];
						i--;
						changes++
					}
					array[posicao] = key;
				}


				const diff = process.hrtime(time);
				// console.log(await this.isArraySorted(array))

				resolve({
					changes: changes,
					time: diff[0] + diff[1] / 1000000000 + " s"
				})
			} catch (e) {
				reject(e);
			}
		})

	}

	static async insertionShellSort(array, h, f) {
		return new Promise((resolve, reject) => {
			try {
				let changes = 0;
				for (let j = f + h; j < array.length; j += h) {
					let key = array[j];
					let i = j - h;
					while (i >= 0 && array[i] > key) {
						array[i + h] = array[i];
						i -= h;
						changes++;
					}
					array[i + h] = key;
				}

				resolve(changes);
			} catch (e) {
				reject(e);
			}
		});
	}

	static async shellSort(array, type) {
		return new Promise(async (resolve, reject) => {
			try {
				let sequence = await this.generateGapSequence(array.length, type)
				let changes = 0

				const time = process.hrtime();
				for (let i = sequence.length = 1; i >= 0; i--) {
					let h = sequence[i];
					for (let f = 0; f < h; f++) {
						changes += await this.insertionShellSort(array, h, f);
					}
				}
				const diff = process.hrtime(time);

				resolve({
					"changes": changes,
					"time": diff[0] + diff[1] / 1000000000 + " s"
				})

			} catch (e) {
				reject(e);
			}
		});
	}

	static async generateGapSequence(maxElem, type) {
		return new Promise((resolve, reject) => {
			try {
				let seq = [];
				let e = 1;
				let numElems = 1;
				switch (type) {
					case 0: // (Shell,1959) - sequencia 1, 2, 4, 8, 16, 32, ...
					case '0':
						while (e < maxElem) {
							e *= 2;
							numElems++;
						}
						numElems--;
						e = 1;
						for (let i = 0; i < numElems; i++, e = e << 1) seq[i] = e;
						break;
					case 1: // (Knuth,1971) - sequencia 1, 4, 13, 40, 121, 364, ...
					case '1':
						while (e < maxElem) {
							e = e * 3 + 1;
							numElems++;
						}
						numElems--;
						e = 1;
						for (let i = 0; i < numElems; i++, e = 3 * e + 1) seq[i] = e;
						break;
					case 2: // (Tokuda,1992) - sequencia 1, 4, 9, 20, 46, 103, ...
					case '2':
						numElems = 0;
						while (e < maxElem) {
							e = (Math.ceil((9.0 * Math.pow(9.0, numElems) / Math.pow(4.0, numElems) - 4.0) / 5.0));
							numElems++;
						}
						numElems--;
						for (let i = 0; i < numElems; i++) seq[i] = (Math.ceil((9.0 * Math.pow(9.0, i) / Math.pow(4.0, i) - 4.0) / 5.0));
						break;
					default:
						throw new Error('Tipo de sequencia invalida');
						break;
				}

				resolve(seq);

			} catch (e) {
				reject(e);
			}
		})
	}

	/* ARRAY METHODS */
	static async createSortedArray(size) {
		return new Promise((resolve, reject) => {
			try {
				let array = [];
				for (let i = 0; i < size; i++) {
					array[i] = i;
				}
				resolve(array);
			} catch (e) {
				reject(e);
			}
		})

	}

	static async createReversedArray(size) {
		return new Promise((resolve, reject) => {
			try {
				let array = [];
				let j = size - 1;
				for (let i = 0; i < size; i++) {
					array[i] = j--;
				}
				resolve(array);
			} catch (e) {
				reject(e);
			}
		})

	}

	static async createRandomArray(size) {
		return new Promise(async (resolve, reject) => {
			try {
				let array = await this.createSortedArray(size);
				for (let s = size; s > 0; s--) {
					let index = Math.floor(Math.random() * s);

					let temp = array[s - 1];
					array[s - 1] = array[index];
					array[index] = temp;
				}
				resolve(array);
			} catch (e) {
				reject(e);
			}
		})

	}

	static async isArraySorted(array) {
		return new Promise((resolve, reject) => {
			try {
				for (let i = 0; i < array.length; i++) {
					if (array[i] > array[i + 1]) resolve(false);
				}
				resolve(true);
			} catch (e) {
				reject(e);
			}
		})
	}
}
