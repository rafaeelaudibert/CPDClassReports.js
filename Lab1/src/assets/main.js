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
    if(line == textLines[0]) continue;
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
const generateArrays = (n, f0, f1, f2, incremento=1) => {
  let labels = [], arr0 = [], arr1 = [], arr2 = [];
  for(let i=0; i < n; i+=incremento){
    labels.push(i);
  }

  return {
    labels: labels,
    arr0: labels.map(f0),
    arr1: labels.map(f1),
    arr2: labels.map(f2)
  }
}

$('document').ready(() => {
  // COMPLEXITY CHARTS \\
  //Complexity 1
  (async () => {
    let {labels, arr0, arr1, arr2} = generateArrays(50, n => 40 * n, n => 50 * n, n => 60 * n);
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
  })})();

  //Complexity 2
  (async () => {
    let {labels, arr0, arr1, arr2} = generateArrays(50, n => n * n, n => n * n + 2 * n + 10, n => 2 * n * n);
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
          mode: 'x'
        },
        zoom: {
          sensitivity: 0.5,
          enabled: true,
          mode: 'x'
        }
      }
  })})();

  //Complexity 3
  (async () => {
    let {labels, arr0, arr1, arr2} = generateArrays(500, n => n, n => n + Math.log(n), n => 2 * n, 10);
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
    let {labels, arr0, arr1, arr2} = generateArrays(250, n => n * n * n, n => n * n * n - 100 * n * n, n => (n * n * n) / 2);
    console.log(labels, arr0, arr1, arr2);
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
    let {labels, arr0, arr1, arr2} = generateArrays(50, n => 1, n => (2 * n * n) / (3 * n * n - 1), n => 1/3);
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
    let {labels, arr0, arr1, arr2} = generateArrays(50000, n => 10 * n * Math.log(n, 2), n => 10 * n * Math.log(2 * n, 2), n => 11 * n * Math.log(n, 2), 1000);
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



});
