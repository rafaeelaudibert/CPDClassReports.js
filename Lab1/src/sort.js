module.exports = class Sort {

	static get NS_PER_SEC() {
		return 1e9;
	}
	constructor(muted) {
		this.muted = muted;
	}

	/* SORTING FUNCTION */
	static async bubbleSort(array) {
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
		if (!this.muted) console.log("Array ordenado? " + await this.isArraySorted(array));

		return {
			"changes": changes,
			"time": diff[0] + diff[1] / 1000000000 + " s",
			"ordered": await this.isArraySorted(array)
		};
	}

	static async insertionSort(array) {
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
		if (!this.muted) console.log("Array ordenado? " + await this.isArraySorted(array));

		return {
			"changes": changes,
			"time": diff[0] + diff[1] / 1000000000 + " s",
			"ordered": await this.isArraySorted(array)
		};
	}

	static async binarySearch(array, inf, sup, key) {
		let half = inf + Math.floor((sup - inf) / 2);

		if (inf == sup) return inf;
		else if (key > array[half]) return this.binarySearch(array, half + 1, sup, key);
		else if (key < array[half]) return this.binarySearch(array, inf, half, key);
		else return half;
	}

	static async binaryInsertionSort(array) {
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
		if (!this.muted) console.log("Array ordenado? " + await this.isArraySorted(array));

		return {
			"changes": changes,
			"time": diff[0] + diff[1] / 1000000000 + " s",
			"ordered": await this.isArraySorted(array)
		};
	}

	static async insertionShellSort(array, h, f) {
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

		return changes;
	}

	static async shellSort(array, type) {
		let sequence = await this.generateGapSequence(array.length, type);
		let changes = 0;
		if (!this.muted) console.log("Sequencia " + sequence);

		const time = process.hrtime();
		for (let i = sequence.length = 1; i >= 0; i--) {
			let h = sequence[i];
			for (let f = 0; f < h; f++) {
				changes += await this.insertionShellSort(array, h, f);
			}
		}
		const diff = process.hrtime(time);
		if (!this.muted) console.log("Array ordenado? " + await this.isArraySorted(array));

		return {
			"changes": changes,
			"time": diff[0] + diff[1] / 1000000000 + " s",
			"ordered": await this.isArraySorted(array)
		};
	}

	static async generateGapSequence(maxElem, type) {
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
				for (let i = 0; i < numElems; i++) {
					seq[i] = e;
					e *= 2;
				}
				break;
			case 1: // (Knuth,1971) - sequencia 1, 4, 13, 40, 121, 364, ...
			case '1':
				while (e < maxElem) {
					e = e * 3 + 1;
					numElems++;
				}
				numElems--;
				e = 1;
				for (let i = 0; i < numElems; i++) {
					seq[i] = e;
					e = e * 3 + 1;
				}
				break;
			case 2: // (Tokuda,1992) - sequencia 1, 4, 9, 20, 46, 103, ...
			case '2':
				numElems = 0;
				while (e < maxElem) {
					e = (Math.ceil((9.0 * Math.pow(9.0, numElems) / Math.pow(4.0, numElems) - 4.0) / 5.0));
					numElems++;
				}
				numElems--;
				for (let i = 0; i < numElems; i++) {
					e = (Math.ceil((9.0 * Math.pow(9.0, i) / Math.pow(4.0, i) - 4.0) / 5.0));
					seq[i] = e;
				}
				break;
			default:
				throw new Error('Tipo de sequencia invalida');
				break;
		}

		return seq;
	}

	/* ARRAY METHODS */
	static async createSortedArray(size) {
		let array = [];
		for (let i = 0; i < size; i++) {
			array[i] = i;
		}
		return array;
	}

	static async createReversedArray(size) {
		let array = [];
		let j = size - 1;
		for (let i = 0; i < size; i++) {
			array[i] = j--;
		}
		return array;
	}

	static async createRandomArray(size) {
		let array = await this.createSortedArray(size);
		for (let s = size; s > 0; s--) {
			let index = Math.floor(Math.random() * s);

			let temp = array[s - 1];
			array[s - 1] = array[index];
			array[index] = temp;
		}
		return array;
	}

	static async isArraySorted(array) {
		for (let i = 0; i < array.length; i++) {
			if (array[i] > array[i + 1]) return false;
		}
		return true;
	}
}
