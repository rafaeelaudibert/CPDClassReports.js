module.exports = class Sort {

	static get NS_PER_SEC() {
		return 1e9;
	}

	static get max_digits() {
		return 6;
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

	static async quickSort(array) {
		return new Promise(async (resolve, reject) => {
			try {

				const time = process.hrtime();
				const changes = await this.recursiveQuickSort(array, 0, array.length - 1);
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

	static async mergeSort(array) {
		return new Promise(async (resolve, reject) => {
			try {

				let auxiliar = new Array(array.length);

				const time = process.hrtime();
				const changes = await this.recursiveMergeSort(array, auxiliar, 0, array.length - 1);
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

	static async radixSort(array) {

		return new Promise(async (resolve, reject) => {
			try {

				let changes = 0; //Será sempre zero, pois não usamos comparações
				let C = new Array(10);
				let B = new Array(array.length);

				console.warn(`Somente ordenará numeros com no máximo ${this.max_digits} digitos`)

				const time = process.hrtime();
				for (let d = 0; d < this.max_digits; d++) {
					for (let i = 0; i < 10; i++)
						C[i] = 0; // Zera array contadora

					for (let i = 0; i < array.length; i++)
						C[await this.digito(array[i], d)]++; // Conta os digitos

					for (let i = 1; i < 10; i++)
						C[i] += C[i - 1];

					for (let i = array.length - 1; i >= 0; i--) {
						let dj = await this.digito(array[i], d);
						B[C[dj] - 1] = array[i];
						C[dj]--;
					}

					for (let i = 0; i < array.length; i++)
						array[i] = B[i];
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


	/* HELPERS */
	static async generateGapSequence(maxElem, type) { // Shell Sort Helper
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

	static async recursiveMergeSort(array, aux, pi, pf) { //QuickSort perse
		let m;
		let changes = 0;

		if (pf > pi) {
			m = Math.floor((pi + pf) / 2);
			changes += await this.recursiveMergeSort(array, aux, pi, m);
			changes += await this.recursiveMergeSort(array, aux, m + 1, pf);
			changes += await this.merge(array, aux, pi, m, pf);
		}

		return changes;
	}

	static async merge(array, aux, pi, m, pf) {

		let changes = 0;
		for (let k = pi; k <= pf; k++)
			aux[k] = array[k];

		let j = m + 1;
		for (let k = pi; k <= pf; k++, changes++) {
			if (pi > m)
				array[k] = aux[j++];
			else if (j > pf)
				array[k] = aux[pi++];
			else if (aux[pi] <= aux[j])
				array[k] = aux[pi++];
			else
				array[k] = aux[j++];
		}

		return changes;

	}

	static async recursiveQuickSort(array, pi, pf) { //QuickSort perse
		let totalChanges = 0;

		if (pf > pi) {
			const {
				i,
				changes
			} = await this.partition(array, pi, pf);
			totalChanges += await this.recursiveQuickSort(array, pi, i - 1);
			totalChanges += await this.recursiveQuickSort(array, i + 1, pf);
			totalChanges += changes; // Quantidades de swaps realizadas, são as trocas
		}

		return totalChanges;
	}


	static async partition(array, pi, pf) { // Partitioning on recursiveQuickSort
		let random = Math.floor(pi + (Math.random() * (pf - pi)));
		let p = pf;
		let i = pi - 1;
		let changes = 0;

		// Random pivot to make it better sorted
		this.swap(array, random, pf);

		for (let j = pi; j <= pf - 1; j++) {
			if (array[j] <= array[p]) {
				changes++;
				i++;
				this.swap(array, i, j);
			}
		}

		changes++;
		i++;
		this.swap(array, i, p);
		return {
			i,
			changes
		};
	}

	static async digito(valor, posicao) {

		let t1 = Math.pow(10, posicao + 1);
		let r = valor % t1;

		if (posicao > 0)
			r = Math.floor(r / Math.pow(10, posicao));

		return r;

	}

	static swap(array, i, j) { //Swap two values in an array
		let temp = array[i];
		array[i] = array[j];
		array[j] = temp;
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
