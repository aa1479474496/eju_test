var util = {
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

// let arr = [
//     { firstName: 'Bob1', lastName: 'john1', gender: 'man1', age: 11, id: 1 },
//     { firstName: 'Bob2', lastName: 'john2', gender: 'man2', age: 11, id: 2 },
//     { firstName: 'Bob3', lastName: 'john3', gender: 'man3', age: 11, id: 3 },
//     { firstName: 'modify', lastName: 'john1', gender: 'man1', age: 11, id: 1 },
// ]

// console.log(util.assignSameKey('id', arr));