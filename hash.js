/* tamanho da tabela (modifique aqui para testar outros valores de M) */
const M = 293

class Element {
	constructor(key, data) {
		this.key = key;
		this.data = data;
	}
}

module.exports = class HashTable {
	constructor(hashSize, hashAddressing) {
		this.tableSize = hashSize;
		this.table = new Array(hashSize);
		this.method = hashAddressing;

		// Inicializa com valores padroes, embora alguns métodos não utilizarão alguns valores da array
		for (let i = 0; i < hashSize; i++) {
			this.table[i] = {
				elem: null, // Usado no endereçamento aberto
				elems: [] // Usado no endereçamento fechado
			}
		}

		return this;
	}

	insert(key, data) {

		let conflicts = 0;
		const hashedValue = this.computeHash(key);
		const hashedValueExtra = this.computeHashExtra(key);

		let exist = false;
		let endl = hashedValue; // Endereço livre

		switch (this.method) {
			case 'openLinearSearch':
				do {
					if (this.table[endl].elem) {
						if (this.table[endl].elem.key == key)
							exist = true; // Chave já existe; encerra.
						else {
							endl = (endl + 1) % this.tableSize; // Passa para o próximo
							conflicts++;
						}
					} else {
						this.table[endl].elem = new Element(key, data);
						break;
					}
				} while (hashedValue != endl && !exist);

				if (hashedValue == endl && !exist && this.table[endl].elem.key != key)
					throw new Error('Tabela lotada!')
				break;
			case 'openDoubleHashing':
				do {
					if (this.table[endl].elem) {
						if (this.table[endl].elem.key == key)
							exist = true; // Chave já existe; encerra.
						else {
							endl = (endl + hashedValueExtra) % this.tableSize; // Passa para o próximo
							conflicts++;
						}
					} else {
						this.table[endl].elem = new Element(key, data);
						break;
					}
				} while (hashedValue != endl && !exist);

				if (hashedValue == endl && !exist && this.table[endl].elem.key != key)
					throw new Error('Tabela lotada!')
				break;
			case 'closedChaining':
				this.table[endl].elems.push(new Element(key, data));
				break;
			default:
				throw new Error('Modo de hashing inválido');
		}

		return {
			conflicts,
			exist
		};
	}

	search(key) {

		const hashedValue = this.computeHash(key);
		const hashedValueExtra = this.computeHashExtra(key);

		let endl = hashedValue;
		let conflicts = 0;

		switch (this.method) {
			case 'openLinearSearch':
				do {
					if (this.table[endl].elem) {
						if (this.table[endl].elem.key == key) {
							return {
								found: true,
								elem: this.table[endl].elem,
								conflicts: conflicts
							}
						} else {
							endl = (endl + 1) % this.tableSize;
							conflicts++;
						}
					} else {
						return {
							found: false,
							elem: undefined,
							conflicts: conflicts
						}
					}
				} while (endl != hashedValue);
				break;
			case 'openDoubleHashing':
				do {
					if (this.table[endl].elem) {
						if (this.table[endl].elem.key == key) {
							return {
								found: true,
								elem: this.table[endl].elem,
								conflicts: conflicts
							}
						} else {
							endl = (endl + hashedValueExtra) % this.tableSize;
							conflicts++;
						}
					} else {
						return {
							found: false,
							elem: undefined,
							conflicts: conflicts
						}
					}
				} while (endl != hashedValue);
				break;
			case 'closedChaining':
				for (let elem of this.table[endl].elems) {
					if (elem.key == key)
						return {
							found: true,
							elem: elem,
							conflicts: conflicts
						}
					conflicts++;
				}
				break;
			default:
				break;
		}

		return {
			found: false,
			elem: undefined,
			conflicts: conflicts
		}
	}

	computeHash(key) {
		let encrypted = 0;
		for (let i = 0; i < key.length; i++)
			encrypted = (encrypted >> 1) + ((encrypted & 1) << 15) + key.charCodeAt(i);

		return encrypted % this.tableSize;
	}

	computeHashExtra(key) {
		let encrypted = 0;
		for (let i = 0; i < key.length; i++)
			encrypted += key.charCodeAt(i);

		return (encrypted % 53) + 1;
	}
}

function main() {

	let hashTable = new HashTable(M, 'closedChaining');
	let totalCollisions = 0;
	$.ajax('dataset.txt')
		.then(dataset => {
			dataset = dataset.split('\n')
				.map(info => info.split(';'))
				.filter(info => info != ''); // Remove empty array if file has an empty line in the end

			for (let entry of dataset) {
				let numCollisions = hashTable.insert(entry[0], entry[1]);
				totalCollisions += numCollisions;
			}
			console.log(totalCollisions);

			$.ajax('queries.txt')
				.then(queries => {
					queries = queries.split('\n')
						.filter(info => info != '');

					for (query of queries) {
						let {
							found,
							elem
						} = hashTable.search(query);

						if (found) {
							console.log(`${elem.key} é ${elem.data}`)
						} else {
							console.log(`ERRO: ${query} não encontrado no dataset!`)
						}
					}
				})
				.catch(console.error)

		})
		.catch(console.error)


	return
}
