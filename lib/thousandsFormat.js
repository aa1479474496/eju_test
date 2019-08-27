

function thousandsFormat(num, precision = 0) {
    // debugger;
    num = isNaN(Number(num)) ? num : parseFloat(num);
    num = (num.toFixed ? num.toFixed(precision) : num) + '';
    if (!num.includes('.')) num += '.';
    return num.replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
        return $1 + ',';
    }).replace(/\.$/, '');
}

console.log(thousandsFormat('2019年'));
console.log(thousandsFormat('2019'));
console.log(thousandsFormat('2019-6-8'));
console.log(thousandsFormat('569875.206'));