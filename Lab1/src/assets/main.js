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
