interface searchFunc {
    (source: string, substring: string): boolean;
}

let mySearch: searchFunc;
mySearch = function(src: string, sub: string): boolean {
    let result = src.search(sub);
    return result > -1;
}
console.log(mySearch('abcdefg', 'defg'));
