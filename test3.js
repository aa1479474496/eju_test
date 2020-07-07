let data = [23.22, 40, 30.8, 38, 37, 36, 33];


function getDataExtremes(data) {
  let extremes = { min: 1000, max: 0};
  let _len = data.length;
  for (let i = 0; i < _len; i++) {
    let point = data[i];
    if (point < extremes.min) {
      extremes.min = point;
    }
    if (point > extremes.max) {
      extremes.max = point;
    }
  }
  return extremes;
}

let extremes = getDataExtremes(data);
console.log('extremes', extremes);

let _min = 0;
let _max = 0;

_max = Math.max.apply(null, data);
_min = Math.min.apply(null, data);

let _range = _max - _min;


function initMeans(k, dataExtremes = {}) {
  if (!k) {
    k = 3;
  }
  let means = [];
  while (k--) {
    let mean = dataExtremes.min + (Math.random() * _range);
    means.push(mean);
  }

  return means;
}

let means = initMeans(3, {min: _min, max: _max});

function makeAssignment(means, point) {
  let _len = means.length;
  let distances = [];
  for (let i = 0; i < _len; i++) {
    let mean = means[i];
    let sum = 0;
    let difference = point - mean;
    difference *= difference;
    sum += difference;

    distances[i] = Math.sqrt(sum);
  }

  return distances.indexOf(Math.min.apply(null, distances));
}
data.forEach(item => {
  let assignment = makeAssignment(means, item);
  console.log('assignment', assignment);
})
console.log('mmmm', means);



function tranItem(setting, key, val) {
  let current = setting;
  let arrkeys = key.split(".");
  let lastkey = arrkeys.pop();
  for (let i = 0; i < arrkeys.length; i++) {
    if (current[arrkeys[i]] == undefined) {
      current[arrkeys[i]] = {};
    }
    current = current[arrkeys[i]];
  }
  current[lastkey] = val;
}

// 合并配置
function tranSetting(setting, conf) {
  for (let key in conf) {
    tranItem(setting, key, conf[key]);
  }
  return setting;
}


let res = tranSetting({title: 'aaa' }, {'yAxis.1.axisLabel.fontFamily': "FangSong,STFangsong"});
console.log('rrrr', res);



