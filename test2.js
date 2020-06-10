var data = [
  [1, 2],
  [2, 1],
  [2, 4],
  [1, 3],
  [2000, 2],
  [3, 1],
  [1, 1],

  [7, 3],
  [8, 2],
  [6000, 4],
  [7, 4],
  [8, 1],
  [9, 2],

  [10, 8],
  [9, 10],
  [7, 8],
  [7, 9],
  [8, 11],
  [9, 9],
];

function getDataRanges(extremes) {
  var ranges = [];

  for (var dimension in extremes) {
    ranges[dimension] = extremes[dimension].max - extremes[dimension].min;
  }

  return ranges;

}

function getDataExtremes(points) {

  var extremes = [];

  for (var i in data) {
    var point = data[i];

    for (var dimension in point) {
      if (!extremes[dimension]) {
        extremes[dimension] = { min: 1000, max: 0 };
      }

      if (point[dimension] < extremes[dimension].min) {
        extremes[dimension].min = point[dimension];
      }

      if (point[dimension] > extremes[dimension].max) {
        extremes[dimension].max = point[dimension];
      }
    }
  }

  return extremes;
}

let dataExtremes = getDataExtremes();
console.log('dataExtremes', dataExtremes);

let dataRange = getDataRanges(dataExtremes);
console.log('dataRange', dataRange);

function initMeans(k) {

  if (!k) {
    k = 3;
  }
  let means = [];

  while (k--) {
    var mean = [];

    for (var dimension in dataExtremes) {
      mean[dimension] = dataExtremes[dimension].min + (Math.random() * dataRange[dimension]);
    }

    means.push(mean);
  }

  return means;

};
let means = initMeans(5);
console.log(['means', means]);

var assignments = [];
function makeAssignments() {

  for (var i in data) {
    var point = data[i];
    var distances = [];

    for (var j in means) {
      var mean = means[j];
      var sum = 0;

      for (var dimension in point) {
        var difference = point[dimension] - mean[dimension];
        difference *= difference;
        sum += difference;
      }

      distances[j] = Math.sqrt(sum);
    }

    assignments[i] = distances.indexOf(Math.min.apply(null, distances));
  }

}

makeAssignments();
console.log('assignments', assignments);
