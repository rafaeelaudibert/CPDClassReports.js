//Chart.js configuration
Chart.defaults.global.tooltips.titleFontFamily = 'Montserrat'
Chart.defaults.global.tooltips.bodyFontFamily = 'Montserrat'
Chart.defaults.global.title.fontFamily = 'Montserrat'
Chart.defaults.global.title.fontSize = 18

// Transpose matrix function
const transpose = a => a[0].map((_, c) => a.map(r => parseFloat(r[c])))
const processData = text => {
	const textLines = text.split(/\r\n|\n/);
	const headers = textLines[0].split(',');
	const lines = [];

	for (let line of textLines) {
		if (line == textLines[0]) continue;
		const data = line.split(',');
		if (data.length == headers.length) {

			const tarr = [];
			for (let val of data) tarr.push(val);
			lines.push(tarr);
		}
	}
	return {
		headers: headers,
		lines: lines
	}
}
const generateArrays = (n, f0, f1, f2, incremento = 1) => {
	let labels = [],
		arr0 = [],
		arr1 = [],
		arr2 = [];
	for (let i = 0; i < n; i += incremento) {
		labels.push(i);
	}

	return {
		labels: labels,
		arr0: labels.map(f0),
		arr1: labels.map(f1),
		arr2: labels.map(f2)
	}
}

$('document')
	.ready(() => {
		// COMPLEXITY CHARTS \\
		//Complexity 1
		(async () => {
			let {
				labels,
				arr0,
				arr1,
				arr2
			} = generateArrays(50, n => 40 * n, n => 50 * n, n => 60 * n);
			const complexity1 = new Chart(document.getElementById("complexity1"), {
				type: "line",
				data: {
					labels: labels,
					datasets: [{
							label: "40n",
							data: arr0,
							fill: false,
							borderColor: "rgb(75, 192, 192)",
							lineTension: 0.5
						},
						{
							label: "50n",
							data: arr1,
							fill: false,
							borderColor: "rgb(192, 75, 192)",
							lineTension: 0.5
						},
						{
							label: "60n",
							data: arr2,
							fill: false,
							borderColor: "rgb(192, 192, 75)",
							lineTension: 0.5
						}
					]
				},
				options: {
					pan: {
						enabled: true,
						mode: 'x'
					},
					zoom: {
						sensitivity: 0.5,
						enabled: true,
						mode: 'x'
					}
				}
			})
		})();

		//Complexity 2
		(async () => {
			let {
				labels,
				arr0,
				arr1,
				arr2
			} = generateArrays(50, n => n * n, n => n * n + 2 * n + 10, n => 2 * n * n);
			const chart1 = new Chart(document.getElementById("complexity2"), {
				type: "line",
				data: {
					labels: labels,
					datasets: [{
							label: "n²",
							data: arr0,
							fill: false,
							borderColor: "rgb(75, 192, 192)",
							lineTension: 0.5
						},
						{
							label: "n² + 2n + 10",
							data: arr1,
							fill: false,
							borderColor: "rgb(192, 75, 192)",
							lineTension: 0.5
						},
						{
							label: "2n²",
							data: arr2,
							fill: false,
							borderColor: "rgb(192, 192, 75)",
							lineTension: 0.5
						}
					]
				},
				options: {
					pan: {
						enabled: true,
						mode: 'xy'
					},
					zoom: {
						sensitivity: 0.5,
						enabled: true,
						mode: 'xy'
					}
				}
			})
		})();

		//Complexity 3
		(async () => {
			let {
				labels,
				arr0,
				arr1,
				arr2
			} = generateArrays(500, n => n, n => n + Math.log(n), n => 2 * n, 10);
			const complexity3 = new Chart(document.getElementById("complexity3"), {
				type: "line",
				data: {
					labels: labels,
					datasets: [{
							label: "n",
							data: arr0,
							fill: false,
							borderColor: "rgb(75, 192, 192)",
							lineTension: 0.5
						},
						{
							label: "n + log(n)",
							data: arr1,
							fill: false,
							borderColor: "rgb(192, 75, 192)",
							lineTension: 0.5
						},
						{
							label: "2n",
							data: arr2,
							fill: false,
							borderColor: "rgb(192, 192, 75)",
							lineTension: 0.5
						}
					]
				},
				options: {
					pan: {
						enabled: true,
						mode: 'x'
					},
					zoom: {
						sensitivity: 0.5,
						enabled: true,
						mode: 'x'
					}
				}
			})
		})();

		//Complexity 4
		(async () => {
			let {
				labels,
				arr0,
				arr1,
				arr2
			} = generateArrays(250, n => n * n * n, n => n * n * n - 100 * n * n, n => (n * n * n) / 2);
			const complexity4 = new Chart(document.getElementById("complexity4"), {
				type: "line",
				data: {
					labels: labels,
					datasets: [{
							label: "n^3",
							data: arr0,
							fill: false,
							borderColor: "rgb(75, 192, 192)",
							lineTension: 0.5
						},
						{
							label: "n^3 - 100n²",
							data: arr1,
							fill: false,
							borderColor: "rgb(192, 75, 192)",
							lineTension: 0.5
						},
						{
							label: "n^3/2",
							data: arr2,
							fill: false,
							borderColor: "rgb(192, 192, 75)",
							lineTension: 0.5
						}
					]
				},
				options: {
					pan: {
						enabled: true,
						mode: 'xy'
					},
					zoom: {
						sensitivity: 0.5,
						enabled: true,
						mode: 'xy'
					}
				}
			})
		})();

		//Complexity 5
		(async () => {
			let {
				labels,
				arr0,
				arr1,
				arr2
			} = generateArrays(20.5, n => 1, n => (2 * n * n) / (3 * n * n - 1), n => 1 / 3, 0.5);
			const complexity5 = new Chart(document.getElementById("complexity5"), {
				type: "line",
				data: {
					labels: labels,
					datasets: [{
							label: "1",
							data: arr0,
							fill: false,
							borderColor: "rgb(75, 192, 192)",
							lineTension: 0.5
						},
						{
							label: "(2n²)/(3n²-1)",
							data: arr1,
							fill: false,
							borderColor: "rgb(192, 75, 192)",
							lineTension: 0.5
						},
						{
							label: "1/3",
							data: arr2,
							fill: false,
							borderColor: "rgb(192, 192, 75)",
							lineTension: 0.5
						}
					]
				},
				options: {
					pan: {
						enabled: true,
						mode: 'x'
					},
					zoom: {
						sensitivity: 0.5,
						enabled: true,
						mode: 'x'
					}
				}
			});
		})();

		//Complexity 6
		(async () => {
			let {
				labels,
				arr0,
				arr1,
				arr2
			} = generateArrays(50000, n => 10 * n * Math.log(n, 2), n => 10 * n * Math.log(2 * n, 2), n => 11 * n * Math.log(n, 2), 1000);
			const complexity6 = new Chart(document.getElementById("complexity6"), {
				type: "line",
				data: {
					labels: labels,
					datasets: [{
							label: "10n logn",
							data: arr0,
							fill: false,
							borderColor: "rgb(75, 192, 192)",
							lineTension: 0.5
						},
						{
							label: "10n log(2n)",
							data: arr1,
							fill: false,
							borderColor: "rgb(192, 75, 192)",
							lineTension: 0.5
						},
						{
							label: "11n logn",
							data: arr2,
							fill: false,
							borderColor: "rgb(192, 192, 75)",
							lineTension: 0.5
						}
					]
				},
				options: {
					pan: {
						enabled: true,
						mode: 'x'
					},
					zoom: {
						sensitivity: 0.5,
						enabled: true,
						mode: 'x'
					}
				}
			})
		})();


		//SORTING CHARTS
		//Bubble Sort
		$(document)
			.ready(function() {
				$.ajax({
					type: "GET",
					url: "bubbleSorted.csv",
					dataType: "text",
					success: data => {
						const {
							headers,
							lines
						} = processData(data);
						const info = transpose(lines);

						const bubbleSortedChart = new Chart(document.getElementById("bubble-1"), {
							type: "bar",
							data: {
								labels: info[1],
								datasets: [{
										label: "Time",
										data: info[3],
										type: 'line',
										fill: true,
										borderColor: "rgb(192, 75, 192)",
										lineTension: 0.5,
										yAxisID: 'right'
									},
									{
										label: "Changes",
										data: info[2],
										backgroundColor: 'rgb(160, 200, 24)',
										lineTension: 0.5,
										yAxesIdsID: 'left'
									}
								]
							},
							options: {
								title: {
									display: true,
									text: 'Bubble Sort - SORTED'
								},
								tooltips: {
									callbacks: {
										title: (item, data) => `Size: ${item[0].xLabel}`
									}
								},
								scales: {
									yAxes: [{
										id: 'left',
										type: 'linear',
										position: 'left',
										ticks: {
											beginAtZero: true
										}
									}, {
										id: 'right',
										type: 'linear',
										position: 'right',
										ticks: {
											beginAtZero: true
										}
									}]
								}
							}
						});
					}
				});
			});

		$(document)
			.ready(function() {
				$.ajax({
					type: "GET",
					url: "bubbleReversed.csv",
					dataType: "text",
					success: data => {
						const {
							headers,
							lines
						} = processData(data);
						const info = transpose(lines);

						const bubbleSortedChart = new Chart(document.getElementById("bubble-2"), {
							type: "bar",
							data: {
								labels: info[1],
								datasets: [{
										label: "Time",
										data: info[3],
										type: 'line',
										fill: true,
										borderColor: "rgb(192, 75, 192)",
										lineTension: 0.5,
										yAxisID: 'right'
									},
									{
										label: "Changes",
										data: info[2],
										backgroundColor: 'rgb(160, 200, 24)',
										lineTension: 0.5,
										yAxesIdsID: 'left'
									}
								]
							},
							options: {
								title: {
									display: true,
									text: 'Bubble Sort - REVERSED'
								},
								tooltips: {
									callbacks: {
										title: (item, data) => `Size: ${item[0].xLabel}`
									}
								},
								scales: {
									yAxes: [{
										id: 'left',
										type: 'linear',
										position: 'left',
										ticks: {
											beginAtZero: true
										}
									}, {
										id: 'right',
										type: 'linear',
										position: 'right',
										ticks: {
											beginAtZero: true
										}
									}]
								}
							}
						});
					}
				});
			});

		$(document)
			.ready(function() {
				$.ajax({
					type: "GET",
					url: "bubbleRandom.csv",
					dataType: "text",
					success: data => {
						const {
							headers,
							lines
						} = processData(data);
						const info = transpose(lines);

						const bubbleSortedChart = new Chart(document.getElementById("bubble-3"), {
							type: "bar",
							data: {
								labels: info[1],
								datasets: [{
										label: "Time",
										data: info[3],
										type: 'line',
										fill: true,
										borderColor: "rgb(192, 75, 192)",
										lineTension: 0.5,
										yAxisID: 'right'
									},
									{
										label: "Changes",
										data: info[2],
										backgroundColor: 'rgb(160, 200, 24)',
										lineTension: 0.5,
										yAxesIdsID: 'left'
									}
								]
							},
							options: {
								title: {
									display: true,
									text: 'Bubble Sort - RANDOM (Logarithmic scale)'
								},
								tooltips: {
									callbacks: {
										title: (item, data) => `Size: ${item[0].xLabel}`
									}
								},
								scales: {
									yAxes: [{
										id: 'left',
										type: 'logarithmic',
										position: 'left',
										ticks: {
											beginAtZero: true
										}
									}, {
										id: 'right',
										type: 'logarithmic',
										position: 'right',
										ticks: {
											beginAtZero: true
										}
									}]
								}
							}
						});

						$('#bubbleScale')
							.click(e => {
								if (bubbleSortedChart.options.scales.yAxes[0].type == 'linear') {
									bubbleSortedChart.options.scales.yAxes[0].type = 'logarithmic';
									bubbleSortedChart.options.scales.yAxes[1].type = 'logarithmic';
									bubbleSortedChart.options.title.text = 'Bubble Sort - RANDOM (Logarithmic scale)';
								} else {
									bubbleSortedChart.options.scales.yAxes[0].type = 'linear';
									bubbleSortedChart.options.scales.yAxes[1].type = 'linear';
									bubbleSortedChart.options.title.text = 'Bubble Sort - RANDOM';
								}
								bubbleSortedChart.update();
							})
					}
				});
			});

		//INSERTION SORT
		$(document)
			.ready(function() {
				$.ajax({
					type: "GET",
					url: "insertionSorted.csv",
					dataType: "text",
					success: data => {
						const {
							headers,
							lines
						} = processData(data);
						const info = transpose(lines);

						const bubbleSortedChart = new Chart(document.getElementById("insertion-1"), {
							type: "bar",
							data: {
								labels: info[1],
								datasets: [{
										label: "Changes",
										data: info[2],
										"fill": false,
										backgroundColor: 'rgb(160, 200, 24)',
										lineTension: 0.5
									},
									{
										label: "Time",
										data: info[3],
										type: 'line',
										borderColor: "rgb(192, 75, 192)",
										lineTension: 0.5,
										yAxesId: 'right'
									}
								]
							},
							options: {
								title: {
									display: true,
									text: 'Insertion Sort - SORTED'
								},
								tooltips: {
									callbacks: {
										title: (item, data) => `Size: ${item[0].xLabel}`
									}
								},
								scales: {
									yAxes: [{
										id: 'left',
										type: 'linear',
										position: 'left',
										ticks: {
											beginAtZero: true
										}
									}, {
										id: 'right',
										type: 'linear',
										position: 'right',
										ticks: {
											beginAtZero: true
										}
									}]
								}
							}
						});
					}
				});
			});

		$(document)
			.ready(function() {
				$.ajax({
					type: "GET",
					url: "insertionReversed.csv",
					dataType: "text",
					success: data => {
						const {
							headers,
							lines
						} = processData(data);
						const info = transpose(lines);

						const bubbleSortedChart = new Chart(document.getElementById("insertion-2"), {
							type: "bar",
							data: {
								labels: info[1],
								datasets: [{
										label: "Time",
										data: info[3],
										type: 'line',
										fill: true,
										borderColor: "rgb(192, 75, 192)",
										lineTension: 0.5,
										yAxisID: 'right'
									},
									{
										label: "Changes",
										data: info[2],
										backgroundColor: 'rgb(160, 200, 24)',
										lineTension: 0.5,
										yAxesIdsID: 'left'
									}
								]
							},
							options: {
								title: {
									display: true,
									text: 'Insertion Sort - REVERSED'
								},
								tooltips: {
									callbacks: {
										title: (item, data) => `Size: ${item[0].xLabel}`
									}
								},
								scales: {
									yAxes: [{
										id: 'left',
										type: 'linear',
										position: 'left',
										ticks: {
											beginAtZero: true
										}
									}, {
										id: 'right',
										type: 'linear',
										position: 'right',
										ticks: {
											beginAtZero: true
										}
									}]
								}
							}
						});
					}
				});
			});

		$(document)
			.ready(function() {
				$.ajax({
					type: "GET",
					url: "insertionRandom.csv",
					dataType: "text",
					success: data => {
						const {
							headers,
							lines
						} = processData(data);
						const info = transpose(lines);

						const bubbleSortedChart = new Chart(document.getElementById("insertion-3"), {
							type: "bar",
							data: {
								labels: info[1],
								datasets: [{
										label: "Time",
										data: info[3],
										type: 'line',
										fill: true,
										borderColor: "rgb(192, 75, 192)",
										lineTension: 0.5,
										yAxisID: 'right'
									},
									{
										label: "Changes",
										data: info[2],
										backgroundColor: 'rgb(160, 200, 24)',
										lineTension: 0.5,
										yAxesIdsID: 'left'
									}
								]
							},
							options: {
								title: {
									display: true,
									text: 'Insertion Sort - RANDOM (Logarithmic scale)'
								},
								tooltips: {
									callbacks: {
										title: (item, data) => `Size: ${item[0].xLabel}`
									}
								},
								scales: {
									yAxes: [{
										id: 'left',
										type: 'logarithmic',
										position: 'left',
										ticks: {
											beginAtZero: true
										}
									}, {
										id: 'right',
										type: 'logarithmic',
										position: 'right',
										ticks: {
											beginAtZero: true
										}
									}]
								}
							}
						});

						$('#insertionScale')
							.click(e => {
								if (bubbleSortedChart.options.scales.yAxes[0].type == 'linear') {
									bubbleSortedChart.options.scales.yAxes[0].type = 'logarithmic';
									bubbleSortedChart.options.scales.yAxes[1].type = 'logarithmic';
									bubbleSortedChart.options.title.text = 'Insertion Sort - RANDOM (Logarithmic scale)';
								} else {
									bubbleSortedChart.options.scales.yAxes[0].type = 'linear';
									bubbleSortedChart.options.scales.yAxes[1].type = 'linear';
									bubbleSortedChart.options.title.text = 'Insertion Sort - RANDOM';
								}
								bubbleSortedChart.update();
							})
					}
				});
			});

		//BINARY INSERTION SORT
		$(document)
			.ready(function() {
				$.ajax({
					type: "GET",
					url: "binaryInsertionSorted.csv",
					dataType: "text",
					success: data => {
						const {
							headers,
							lines
						} = processData(data);
						const info = transpose(lines);

						const bubbleSortedChart = new Chart(document.getElementById("binary-1"), {
							type: "bar",
							data: {
								labels: info[1],
								datasets: [{
										label: "Changes",
										data: info[2],
										"fill": false,
										backgroundColor: 'rgb(160, 200, 24)',
										lineTension: 0.5
									},
									{
										label: "Time",
										data: info[3],
										type: 'line',
										borderColor: "rgb(192, 75, 192)",
										lineTension: 0.5,
										yAxesId: 'right'
									}
								]
							},
							options: {
								title: {
									display: true,
									text: 'Binary Insertion Sort - SORTED'
								},
								tooltips: {
									callbacks: {
										title: (item, data) => `Size: ${item[0].xLabel}`
									}
								},
								scales: {
									yAxes: [{
										id: 'left',
										type: 'linear',
										position: 'left',
										ticks: {
											beginAtZero: true
										}
									}, {
										id: 'right',
										type: 'linear',
										position: 'right',
										ticks: {
											beginAtZero: true
										}
									}]
								}
							}
						});
					}
				});
			});

		$(document)
			.ready(function() {
				$.ajax({
					type: "GET",
					url: "binaryInsertionReversed.csv",
					dataType: "text",
					success: data => {
						const {
							headers,
							lines
						} = processData(data);
						const info = transpose(lines);

						const bubbleSortedChart = new Chart(document.getElementById("binary-2"), {
							type: "bar",
							data: {
								labels: info[1],
								datasets: [{
										label: "Time",
										data: info[3],
										type: 'line',
										fill: true,
										borderColor: "rgb(192, 75, 192)",
										lineTension: 0.5,
										yAxisID: 'right'
									},
									{
										label: "Changes",
										data: info[2],
										backgroundColor: 'rgb(160, 200, 24)',
										lineTension: 0.5,
										yAxesIdsID: 'left'
									}
								]
							},
							options: {
								title: {
									display: true,
									text: 'Binary Insertion Sort - REVERSED'
								},
								tooltips: {
									callbacks: {
										title: (item, data) => `Size: ${item[0].xLabel}`
									}
								},
								scales: {
									yAxes: [{
										id: 'left',
										type: 'linear',
										position: 'left',
										ticks: {
											beginAtZero: true
										}
									}, {
										id: 'right',
										type: 'linear',
										position: 'right',
										ticks: {
											beginAtZero: true
										}
									}]
								}
							}
						});
					}
				});
			});

		$(document)
			.ready(function() {
				$.ajax({
					type: "GET",
					url: "binaryInsertionRandom.csv",
					dataType: "text",
					success: data => {
						const {
							headers,
							lines
						} = processData(data);
						const info = transpose(lines);

						const bubbleSortedChart = new Chart(document.getElementById("binary-3"), {
							type: "bar",
							data: {
								labels: info[1],
								datasets: [{
										label: "Time",
										data: info[3],
										type: 'line',
										fill: true,
										borderColor: "rgb(192, 75, 192)",
										lineTension: 0.5,
										yAxisID: 'right'
									},
									{
										label: "Changes",
										data: info[2],
										backgroundColor: 'rgb(160, 200, 24)',
										lineTension: 0.5,
										yAxesIdsID: 'left'
									}
								]
							},
							options: {
								title: {
									display: true,
									text: 'Binary Insertion Sort - RANDOM (Logarithmic scale)'
								},
								tooltips: {
									callbacks: {
										title: (item, data) => `Size: ${item[0].xLabel}`
									}
								},
								scales: {
									yAxes: [{
										id: 'left',
										type: 'logarithmic',
										position: 'left',
										ticks: {
											beginAtZero: true
										}
									}, {
										id: 'right',
										type: 'logarithmic',
										position: 'right',
										ticks: {
											beginAtZero: true
										}
									}]
								}
							}
						});

						$('#binaryScale')
							.click(e => {
								if (bubbleSortedChart.options.scales.yAxes[0].type == 'linear') {
									bubbleSortedChart.options.scales.yAxes[0].type = 'logarithmic';
									bubbleSortedChart.options.scales.yAxes[1].type = 'logarithmic';
									bubbleSortedChart.options.title.text = 'Binary Insertion Sort - RANDOM (Logarithmic scale)';
								} else {
									bubbleSortedChart.options.scales.yAxes[0].type = 'linear';
									bubbleSortedChart.options.scales.yAxes[1].type = 'linear';
									bubbleSortedChart.options.title.text = 'Binary Insertion Sort - RANDOM';
								}
								bubbleSortedChart.update();
							})
					}
				});
			});

		//SHELL SORT
		$(document)
			.ready(function() {
				$.ajax({
					type: "GET",
					url: "shell0Sorted.csv",
					dataType: "text",
					success: data => {
						const {
							headers,
							lines
						} = processData(data);
						const info = transpose(lines);

						const bubbleSortedChart = new Chart(document.getElementById("shell0-1"), {
							type: "bar",
							data: {
								labels: info[1],
								datasets: [{
										label: "Changes",
										data: info[2],
										"fill": false,
										backgroundColor: 'rgb(160, 200, 24)',
										lineTension: 0.5
									},
									{
										label: "Time",
										data: info[3],
										type: 'line',
										borderColor: "rgb(192, 75, 192)",
										lineTension: 0.5,
										yAxesId: 'right'
									}
								]
							},
							options: {
								title: {
									display: true,
									text: 'Shell Sort (Shell Sequence) - SORTED'
								},
								tooltips: {
									callbacks: {
										title: (item, data) => `Size: ${item[0].xLabel}`
									}
								},
								scales: {
									yAxes: [{
										id: 'left',
										type: 'linear',
										position: 'left',
										ticks: {
											beginAtZero: true
										}
									}, {
										id: 'right',
										type: 'linear',
										position: 'right',
										ticks: {
											beginAtZero: true
										}
									}]
								}
							}
						});
					}
				});
			});

		$(document)
			.ready(function() {
				$.ajax({
					type: "GET",
					url: "shell0Reversed.csv",
					dataType: "text",
					success: data => {
						const {
							headers,
							lines
						} = processData(data);
						const info = transpose(lines);

						const bubbleSortedChart = new Chart(document.getElementById("shell0-2"), {
							type: "bar",
							data: {
								labels: info[1],
								datasets: [{
										label: "Time",
										data: info[3],
										type: 'line',
										fill: true,
										borderColor: "rgb(192, 75, 192)",
										lineTension: 0.5,
										yAxisID: 'right'
									},
									{
										label: "Changes",
										data: info[2],
										backgroundColor: 'rgb(160, 200, 24)',
										lineTension: 0.5,
										yAxesIdsID: 'left'
									}
								]
							},
							options: {
								title: {
									display: true,
									text: 'Shell Sort (Shell Sequence) - REVERSED'
								},
								tooltips: {
									callbacks: {
										title: (item, data) => `Size: ${item[0].xLabel}`
									}
								},
								scales: {
									yAxes: [{
										id: 'left',
										type: 'linear',
										position: 'left',
										ticks: {
											beginAtZero: true
										}
									}, {
										id: 'right',
										type: 'linear',
										position: 'right',
										ticks: {
											beginAtZero: true
										}
									}]
								}
							}
						});
					}
				});
			});

		$(document)
			.ready(function() {
				$.ajax({
					type: "GET",
					url: "shell0Random.csv",
					dataType: "text",
					success: data => {
						const {
							headers,
							lines
						} = processData(data);
						const info = transpose(lines);

						const bubbleSortedChart = new Chart(document.getElementById("shell0-3"), {
							type: "bar",
							data: {
								labels: info[1],
								datasets: [{
										label: "Time",
										data: info[3],
										type: 'line',
										fill: true,
										borderColor: "rgb(192, 75, 192)",
										lineTension: 0.5,
										yAxisID: 'right'
									},
									{
										label: "Changes",
										data: info[2],
										backgroundColor: 'rgb(160, 200, 24)',
										lineTension: 0.5,
										yAxesIdsID: 'left'
									}
								]
							},
							options: {
								title: {
									display: true,
									text: 'Shell Sort (Shell Sequence) - RANDOM (Logarithmic scale)'
								},
								tooltips: {
									callbacks: {
										title: (item, data) => `Size: ${item[0].xLabel}`
									}
								},
								scales: {
									yAxes: [{
										id: 'left',
										type: 'logarithmic',
										position: 'left',
										ticks: {
											beginAtZero: true
										}
									}, {
										id: 'right',
										type: 'logarithmic',
										position: 'right',
										ticks: {
											beginAtZero: true
										}
									}]
								}
							}
						});

						$('#shell0Scale')
							.click(e => {
								if (bubbleSortedChart.options.scales.yAxes[0].type == 'linear') {
									bubbleSortedChart.options.scales.yAxes[0].type = 'logarithmic';
									bubbleSortedChart.options.scales.yAxes[1].type = 'logarithmic';
									bubbleSortedChart.options.title.text = 'Shell Sort (Shell Sequence) - RANDOM (Logarithmic scale)';
								} else {
									bubbleSortedChart.options.scales.yAxes[0].type = 'linear';
									bubbleSortedChart.options.scales.yAxes[1].type = 'linear';
									bubbleSortedChart.options.title.text = 'Shell Sort (Shell Sequence) - RANDOM ';
								}
								bubbleSortedChart.update();
							})
					}
				});
			});

		$(document)
			.ready(function() {
				$.ajax({
					type: "GET",
					url: "shell1Sorted.csv",
					dataType: "text",
					success: data => {
						const {
							headers,
							lines
						} = processData(data);
						const info = transpose(lines);

						const bubbleSortedChart = new Chart(document.getElementById("shell1-1"), {
							type: "bar",
							data: {
								labels: info[1],
								datasets: [{
										label: "Changes",
										data: info[2],
										"fill": false,
										backgroundColor: 'rgb(160, 200, 24)',
										lineTension: 0.5
									},
									{
										label: "Time",
										data: info[3],
										type: 'line',
										borderColor: "rgb(192, 75, 192)",
										lineTension: 0.5,
										yAxesId: 'right'
									}
								]
							},
							options: {
								title: {
									display: true,
									text: 'Shell Sort (Knuth Sequence) - SORTED'
								},
								tooltips: {
									callbacks: {
										title: (item, data) => `Size: ${item[0].xLabel}`
									}
								},
								scales: {
									yAxes: [{
										id: 'left',
										type: 'linear',
										position: 'left',
										ticks: {
											beginAtZero: true
										}
									}, {
										id: 'right',
										type: 'linear',
										position: 'right',
										ticks: {
											beginAtZero: true
										}
									}]
								}
							}
						});
					}
				});
			});

		$(document)
			.ready(function() {
				$.ajax({
					type: "GET",
					url: "shell1Reversed.csv",
					dataType: "text",
					success: data => {
						const {
							headers,
							lines
						} = processData(data);
						const info = transpose(lines);

						const bubbleSortedChart = new Chart(document.getElementById("shell1-2"), {
							type: "bar",
							data: {
								labels: info[1],
								datasets: [{
										label: "Time",
										data: info[3],
										type: 'line',
										fill: true,
										borderColor: "rgb(192, 75, 192)",
										lineTension: 0.5,
										yAxisID: 'right'
									},
									{
										label: "Changes",
										data: info[2],
										backgroundColor: 'rgb(160, 200, 24)',
										lineTension: 0.5,
										yAxesIdsID: 'left'
									}
								]
							},
							options: {
								title: {
									display: true,
									text: 'Shell Sort (Knuth Sequence) - REVERSED'
								},
								tooltips: {
									callbacks: {
										title: (item, data) => `Size: ${item[0].xLabel}`
									}
								},
								scales: {
									yAxes: [{
										id: 'left',
										type: 'linear',
										position: 'left',
										ticks: {
											beginAtZero: true
										}
									}, {
										id: 'right',
										type: 'linear',
										position: 'right',
										ticks: {
											beginAtZero: true
										}
									}]
								}
							}
						});
					}
				});
			});

		$(document)
			.ready(function() {
				$.ajax({
					type: "GET",
					url: "shell1Random.csv",
					dataType: "text",
					success: data => {
						const {
							headers,
							lines
						} = processData(data);
						const info = transpose(lines);

						const bubbleSortedChart = new Chart(document.getElementById("shell1-3"), {
							type: "bar",
							data: {
								labels: info[1],
								datasets: [{
										label: "Time",
										data: info[3],
										type: 'line',
										fill: true,
										borderColor: "rgb(192, 75, 192)",
										lineTension: 0.5,
										yAxisID: 'right'
									},
									{
										label: "Changes",
										data: info[2],
										backgroundColor: 'rgb(160, 200, 24)',
										lineTension: 0.5,
										yAxesIdsID: 'left'
									}
								]
							},
							options: {
								title: {
									display: true,
									text: 'Shell Sort (Knuth Sequence) - RANDOM (Logarithmic scale)'
								},
								tooltips: {
									callbacks: {
										title: (item, data) => `Size: ${item[0].xLabel}`
									}
								},
								scales: {
									yAxes: [{
										id: 'left',
										type: 'logarithmic',
										position: 'left',
										ticks: {
											beginAtZero: true
										}
									}, {
										id: 'right',
										type: 'logarithmic',
										position: 'right',
										ticks: {
											beginAtZero: true
										}
									}]
								}
							}
						});

						$('#shell1Scale')
							.click(e => {
								if (bubbleSortedChart.options.scales.yAxes[0].type == 'linear') {
									bubbleSortedChart.options.scales.yAxes[0].type = 'logarithmic';
									bubbleSortedChart.options.scales.yAxes[1].type = 'logarithmic';
									bubbleSortedChart.options.title.text = 'Shell Sort (Knuth Sequence) - RANDOM (Logarithmic scale)';
								} else {
									bubbleSortedChart.options.scales.yAxes[0].type = 'linear';
									bubbleSortedChart.options.scales.yAxes[1].type = 'linear';
									bubbleSortedChart.options.title.text = 'Shell Sort (Knuth Sequence) - RANDOM ';
								}
								bubbleSortedChart.update();
							})
					}
				});
			});

		$(document)
			.ready(function() {
				$.ajax({
					type: "GET",
					url: "shell2Sorted.csv",
					dataType: "text",
					success: data => {
						const {
							headers,
							lines
						} = processData(data);
						const info = transpose(lines);

						const bubbleSortedChart = new Chart(document.getElementById("shell2-1"), {
							type: "bar",
							data: {
								labels: info[1],
								datasets: [{
										label: "Changes",
										data: info[2],
										"fill": false,
										backgroundColor: 'rgb(160, 200, 24)',
										lineTension: 0.5
									},
									{
										label: "Time",
										data: info[3],
										type: 'line',
										borderColor: "rgb(192, 75, 192)",
										lineTension: 0.5,
										yAxesId: 'right'
									}
								]
							},
							options: {
								title: {
									display: true,
									text: 'Shell Sort (Tokuda Sequence) - SORTED'
								},
								tooltips: {
									callbacks: {
										title: (item, data) => `Size: ${item[0].xLabel}`
									}
								},
								scales: {
									yAxes: [{
										id: 'left',
										type: 'linear',
										position: 'left',
										ticks: {
											beginAtZero: true
										}
									}, {
										id: 'right',
										type: 'linear',
										position: 'right',
										ticks: {
											beginAtZero: true
										}
									}]
								}
							}
						});
					}
				});
			});

		$(document)
			.ready(function() {
				$.ajax({
					type: "GET",
					url: "shell2Reversed.csv",
					dataType: "text",
					success: data => {
						const {
							headers,
							lines
						} = processData(data);
						const info = transpose(lines);

						const bubbleSortedChart = new Chart(document.getElementById("shell2-2"), {
							type: "bar",
							data: {
								labels: info[1],
								datasets: [{
										label: "Time",
										data: info[3],
										type: 'line',
										fill: true,
										borderColor: "rgb(192, 75, 192)",
										lineTension: 0.5,
										yAxisID: 'right'
									},
									{
										label: "Changes",
										data: info[2],
										backgroundColor: 'rgb(160, 200, 24)',
										lineTension: 0.5,
										yAxesIdsID: 'left'
									}
								]
							},
							options: {
								title: {
									display: true,
									text: 'Shell Sort (Tokuda Sequence) - REVERSED'
								},
								tooltips: {
									callbacks: {
										title: (item, data) => `Size: ${item[0].xLabel}`
									}
								},
								scales: {
									yAxes: [{
										id: 'left',
										type: 'linear',
										position: 'left',
										ticks: {
											beginAtZero: true
										}
									}, {
										id: 'right',
										type: 'linear',
										position: 'right',
										ticks: {
											beginAtZero: true
										}
									}]
								}
							}
						});
					}
				});
			});

		$(document)
			.ready(function() {
				$.ajax({
					type: "GET",
					url: "shell2Random.csv",
					dataType: "text",
					success: data => {
						const {
							headers,
							lines
						} = processData(data);
						const info = transpose(lines);

						const bubbleSortedChart = new Chart(document.getElementById("shell2-3"), {
							type: "bar",
							data: {
								labels: info[1],
								datasets: [{
										label: "Time",
										data: info[3],
										type: 'line',
										fill: true,
										borderColor: "rgb(192, 75, 192)",
										lineTension: 0.5,
										yAxisID: 'right'
									},
									{
										label: "Changes",
										data: info[2],
										backgroundColor: 'rgb(160, 200, 24)',
										lineTension: 0.5,
										yAxesIdsID: 'left'
									}
								]
							},
							options: {
								title: {
									display: true,
									text: 'Shell Sort (Tokuda Sequence) - RANDOM (Logarithmic scale)'
								},
								tooltips: {
									callbacks: {
										title: (item, data) => `Size: ${item[0].xLabel}`
									}
								},
								scales: {
									yAxes: [{
										id: 'left',
										type: 'logarithmic',
										position: 'left',
										ticks: {
											beginAtZero: true
										}
									}, {
										id: 'right',
										type: 'logarithmic',
										position: 'right',
										ticks: {
											beginAtZero: true
										}
									}]
								}
							}
						});

						$('#shell2Scale')
							.click(e => {
								if (bubbleSortedChart.options.scales.yAxes[0].type == 'linear') {
									bubbleSortedChart.options.scales.yAxes[0].type = 'logarithmic';
									bubbleSortedChart.options.scales.yAxes[1].type = 'logarithmic';
									bubbleSortedChart.options.title.text = 'Shell Sort (Tokuda Sequence) - RANDOM (Logarithmic scale)';
								} else {
									bubbleSortedChart.options.scales.yAxes[0].type = 'linear';
									bubbleSortedChart.options.scales.yAxes[1].type = 'linear';
									bubbleSortedChart.options.title.text = 'Shell Sort (Tokuda Sequence) - RANDOM ';
								}
								bubbleSortedChart.update();
							})
					}


				});
			});

		$.when($.ajax('bubbleSorted.csv'),
				$.ajax('insertionSorted.csv'),
				$.ajax('binaryInsertionSorted.csv'),
				$.ajax('shell0Sorted.csv'),
				$.ajax('shell1Sorted.csv'),
				$.ajax('shell2Sorted.csv'))
			.done((...data) => {
				let parsedData = data.map(each => processData(each[0]));
				let labels = parsedData.map(sort => transpose(sort['lines'])[0]);
				let times = parsedData.map(sort => transpose(sort['lines'])[3]);

				const sortedChart = new Chart(document.getElementById("sorted"), {
					type: "line",
					data: {
						labels: labels[5].map(n => Math.pow(2, n)),
						datasets: [{
								label: "Bubble Sort",
								data: times[0],
								fill: false,
								borderColor: "rgb(75, 192, 192)",
								lineTension: 0.5
							},
							{
								label: "Insertion Sort",
								data: times[1],
								fill: false,
								borderColor: "rgb(192, 75, 192)",
								lineTension: 0.5
							},
							{
								label: "Binary Insertion Sort",
								data: times[2],
								fill: false,
								borderColor: "rgb(192, 192, 75)",
								lineTension: 0.5
							},
							{
								label: "Shell Sort - Shell Sequence",
								data: times[3],
								fill: false,
								borderColor: "rgb(75, 75, 192)",
								lineTension: 0.5
							},
							{
								label: "Shell Sort - Knuth Sequence",
								data: times[4],
								fill: false,
								borderColor: "rgb(192, 75, 75)",
								lineTension: 0.5
							},
							{
								label: "Shell Sort - Tokuda Sequence",
								data: times[5],
								fill: false,
								borderColor: "rgb(75, 192, 75)",
								lineTension: 0.5
							}
						]
					},
					options: {
						title: {
							display: true,
							text: "Sorted array times"
						},
						pan: {
							enabled: true,
							mode: 'xy'
						},
						zoom: {
							sensitivity: 0.5,
							enabled: true,
							mode: 'xy'
						},
						scales: {
							yAxes: [{
								type: 'linear',
								position: 'left',
								ticks: {
									beginAtZero: true
								}
							}]
						}
					}
				})

				$('#sortedScale')
					.click(e => {
						if (sortedChart.options.scales.yAxes[0].type == 'linear') {
							sortedChart.options.scales.yAxes[0].type = 'logarithmic';
							sortedChart.options.title.text = 'Sorted array times (Logarithmic scale)';
						} else {
							sortedChart.options.scales.yAxes[0].type = 'linear';
							sortedChart.options.title.text = 'Sorted array times';
						}
						sortedChart.update();
					})
			})

		$.when($.ajax('bubbleReversed.csv'),
				$.ajax('insertionReversed.csv'),
				$.ajax('binaryInsertionReversed.csv'),
				$.ajax('shell0Reversed.csv'),
				$.ajax('shell1Reversed.csv'),
				$.ajax('shell2Reversed.csv'))
			.done((...data) => {
				let parsedData = data.map(each => processData(each[0]));
				let labels = parsedData.map(sort => transpose(sort['lines'])[0]);
				let times = parsedData.map(sort => transpose(sort['lines'])[3]);

				const sortedChart = new Chart(document.getElementById("reversed"), {
					type: "line",
					data: {
						labels: labels[5].map(n => Math.pow(2, n)),
						datasets: [{
								label: "Bubble Sort",
								data: times[0],
								fill: false,
								borderColor: "rgb(75, 192, 192)",
								lineTension: 0.5
							},
							{
								label: "Insertion Sort",
								data: times[1],
								fill: false,
								borderColor: "rgb(192, 75, 192)",
								lineTension: 0.5
							},
							{
								label: "Binary Insertion Sort",
								data: times[2],
								fill: false,
								borderColor: "rgb(192, 192, 75)",
								lineTension: 0.5
							},
							{
								label: "Shell Sort - Shell Sequence",
								data: times[3],
								fill: false,
								borderColor: "rgb(75, 75, 192)",
								lineTension: 0.5
							},
							{
								label: "Shell Sort - Knuth Sequence",
								data: times[4],
								fill: false,
								borderColor: "rgb(192, 75, 75)",
								lineTension: 0.5
							},
							{
								label: "Shell Sort - Tokuda Sequence",
								data: times[5],
								fill: false,
								borderColor: "rgb(75, 192, 75)",
								lineTension: 0.5
							}
						]
					},
					options: {
						title: {
							display: true,
							text: "Reversed array times"
						},
						pan: {
							enabled: true,
							mode: 'xy'
						},
						zoom: {
							sensitivity: 0.5,
							enabled: true,
							mode: 'xy'
						},
						scales: {
							yAxes: [{
								type: 'linear',
								position: 'left',
								ticks: {
									beginAtZero: true
								}
							}]
						}
					}
				})

				$('#reversedScale')
					.click(e => {
						if (sortedChart.options.scales.yAxes[0].type == 'linear') {
							sortedChart.options.scales.yAxes[0].type = 'logarithmic';
							sortedChart.options.title.text = 'Reversed array times (Logarithmic scale)';
						} else {
							sortedChart.options.scales.yAxes[0].type = 'linear';
							sortedChart.options.title.text = 'Reversed array times';
						}
						sortedChart.update();
					})
			})

		$.when($.ajax('bubbleRandom.csv'),
				$.ajax('insertionRandom.csv'),
				$.ajax('binaryInsertionRandom.csv'),
				$.ajax('shell0Random.csv'),
				$.ajax('shell1Random.csv'),
				$.ajax('shell2Random.csv'))
			.done((...data) => {
				let parsedData = data.map(each => processData(each[0]));
				let labels = parsedData.map(sort => transpose(sort['lines'])[0]);
				let times = parsedData.map(sort => transpose(sort['lines'])[3]);

				const sortedChart = new Chart(document.getElementById("random"), {
					type: "line",
					data: {
						labels: labels[5].map(n => Math.pow(2, n)),
						datasets: [{
								label: "Bubble Sort",
								data: times[0],
								fill: false,
								borderColor: "rgb(75, 192, 192)",
								lineTension: 0.5
							},
							{
								label: "Insertion Sort",
								data: times[1],
								fill: false,
								borderColor: "rgb(192, 75, 192)",
								lineTension: 0.5
							},
							{
								label: "Binary Insertion Sort",
								data: times[2],
								fill: false,
								borderColor: "rgb(192, 192, 75)",
								lineTension: 0.5
							},
							{
								label: "Shell Sort - Shell Sequence",
								data: times[3],
								fill: false,
								borderColor: "rgb(75, 75, 192)",
								lineTension: 0.5
							},
							{
								label: "Shell Sort - Knuth Sequence",
								data: times[4],
								fill: false,
								borderColor: "rgb(192, 75, 75)",
								lineTension: 0.5
							},
							{
								label: "Shell Sort - Tokuda Sequence",
								data: times[5],
								fill: false,
								borderColor: "rgb(75, 192, 75)",
								lineTension: 0.5
							}
						]
					},
					options: {
						title: {
							display: true,
							text: "Random array times"
						},
						pan: {
							enabled: true,
							mode: 'xy'
						},
						zoom: {
							sensitivity: 0.5,
							enabled: true,
							mode: 'xy'
						},
						scales: {
							yAxes: [{
								type: 'linear',
								position: 'left',
								ticks: {
									beginAtZero: true
								}
							}]
						}
					}
				})

				$('#randomScale')
					.click(e => {
						if (sortedChart.options.scales.yAxes[0].type == 'linear') {
							sortedChart.options.scales.yAxes[0].type = 'logarithmic';
							sortedChart.options.title.text = 'Random array times (Logarithmic scale)';
						} else {
							sortedChart.options.scales.yAxes[0].type = 'linear';
							sortedChart.options.title.text = 'Random array times';
						}
						sortedChart.update();
					})
			})

		$.when($.ajax('shell0Random.csv'),
				$.ajax('shell1Random.csv'),
				$.ajax('shell2Random.csv'))
			.done((...data) => {
				let parsedData = data.map(each => processData(each[0]));
				let labels = parsedData.map(sort => transpose(sort['lines'])[0]);
				let times = parsedData.map(sort => transpose(sort['lines'])[3]);
				labels[0].splice(21, 7);
				labels[0].splice(0, 14);
				times[0].splice(21, 7);
				times[0].splice(0, 14);
				times[1].splice(21, 7);
				times[1].splice(0, 14);
				times[2].splice(21, 7);
				times[2].splice(0, 14);

				const sortedChart = new Chart(document.getElementById("shell-random"), {
					type: "line",
					data: {
						labels: labels[0].map(n => Math.pow(2, n)),
						datasets: [{
								label: "Shell Sort - Shell Sequence",
								data: times[0],
								fill: false,
								borderColor: "rgb(75, 75, 192)",
								lineTension: 0.5
							},
							{
								label: "Shell Sort - Knuth Sequence",
								data: times[1],
								fill: false,
								borderColor: "rgb(192, 75, 75)",
								lineTension: 0.5
							},
							{
								label: "Shell Sort - Tokuda Sequence",
								data: times[2],
								fill: false,
								borderColor: "rgb(75, 192, 75)",
								lineTension: 0.5
							}
						]
					},
					options: {
						title: {
							display: true,
							text: "Random array times ZOOMED  - Shell Algorithm"
						},
						pan: {
							enabled: true,
							mode: 'xy'
						},
						zoom: {
							sensitivity: 0.5,
							enabled: true,
							mode: 'xy'
						},
						scales: {
							yAxes: [{
								type: 'linear',
								position: 'left',
								ticks: {
									beginAtZero: true
								}
							}]
						}
					}
				})

				$('#zoomedScale')
					.click(e => {
						if (sortedChart.options.scales.yAxes[0].type == 'linear') {
							sortedChart.options.scales.yAxes[0].type = 'logarithmic';
							sortedChart.options.title.text = 'Random array times ZOOMED  - Shell Algorithm (Logarithmic scale)';
						} else {
							sortedChart.options.scales.yAxes[0].type = 'linear';
							sortedChart.options.title.text = 'Random array times ZOOMED  - Shell Algorithm';
						}
						sortedChart.update();
					})
			})


	});
