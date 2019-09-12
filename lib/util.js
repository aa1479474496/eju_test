var util = {
    arrayUnique(arr, keys) {
        let obj = {};
        let newArr = [];
        function getVal(item, keys) {
            if (Object.prototype.toString.call(keys) == '[object Array]') {
                let val = [];
                keys.forEach(key => {
                    val.push(item[key])
                });
                return val.join('|')
            }
            return item[keys]
        }
        let len = arr.length;
        for (let i = 0; i < len; i++) {
            let key = getVal(arr[i], keys);
            if (obj[key]) {
                break
            }
            obj[key] = true;
            newArr.push(arr[i])
        }
        return newArr;
    },

    assignSameKey(key, arr) {
        let hash = {};
        let newArr = [];
        arr.forEach((item, index) => {
            if (!hash[item[key]]) {
                hash[item[key]] = item;
                return;
            }
            Object.assign(hash[item[key]], item);
        });

        Object.keys(hash).forEach(item => {
            newArr.push(hash[item]);
        });
        return newArr;

    }
}

let arr = [
    { firstName: 'Bob1', lastName: 'john1', gender: 'man1', age: 11, id: 1 },
    { firstName: 'Bob2', lastName: 'john2', gender: 'man2', age: 11, id: 2 },
    { firstName: 'Bob3', lastName: 'john3', gender: 'man3', age: 11, id: 3 },
    { firstName: 'modify', lastName: 'john1', gender: 'man1', age: 11, id: 1 },
]

// console.log(util.assignSameKey('id', arr));
// case 
// [
//     { firstName: 'modify', lastName: 'john1', gender: 'man1', age: 11, id: 1 },
//     { firstName: 'Bob2', lastName: 'john2', gender: 'man2', age: 11, id: 2 },
//     { firstName: 'Bob3', lastName: 'john3', gender: 'man3', age: 11, id: 3 }
// ]

// console.log(util.arrayUnique(arr, 'id'));
// case
// [
//     { firstName: 'Bob1', lastName: 'john1', gender: 'man1', age: 11, id: 1 },
//     { firstName: 'Bob2', lastName: 'john2', gender: 'man2', age: 11, id: 2 },
//     { firstName: 'Bob3', lastName: 'john3', gender: 'man3', age: 11, id: 3 }
// ]