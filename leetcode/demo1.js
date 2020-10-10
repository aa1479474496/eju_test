// require('@babel/register');
// 1.两数之和
// 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
// 示例:
// 给定 nums = [2, 7, 11, 15], target = 9
// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]
function twoSum(nums, target) {
  let handleMap = new Map();
  let tmp;
  let result;
  nums.some((ele, index) => {
    tmp = target - ele;
    if (handleMap.get(ele) !== void 0) {
      result = [handleMap.get(ele), index];
      return true;
    }
    else {
      handleMap.set(tmp, index);
    }
  });
  // console.log('handleMap:', handleMap);
  return result;
}
// console.log('1:::', twoSum([2, 18,7, 11, 15], 9));

// 2.无重复字符的最长子串
// 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
// 示例 1:
// 输入: "abcabcbb"
// 输出: 3
// 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

// abcdefgakpb
function lengthOfLongestSubstring(str) {
  let len = str.length;
  let handleMap = new Map();
  let max = 0;
  let i = 0;
  for (let j = 0; j < len; j++) {
    if (handleMap.has(str[j])) {
      i = j;
    }

    max = Math.max(max, j - i + 1);
    handleMap.set(str[j], j);
  }
  return max;
}
// console.log('2:::1', lengthOfLongestSubstring('abcdefgakpb'));
// console.log('2:::2', lengthOfLongestSubstring('abcabcbb'));
// console.log('2:::3', lengthOfLongestSubstring('aaa'));


function doSomething(name) {
  console.log(`Hello ${name}`);
}

function loggingDecorator(wrapped) {
  return function() {
    console.log('starting');
    const result = wrapped.apply(this, arguments);
    console.log('finishing');
    return result;
  }
}
const wrapped = loggingDecorator(doSomething);
// wrapped('jack');



class Math {
  @log
  add(a, b) {
    return a + b;
  }
}

function log(target, name, descriptor) {
  let oldValue = descriptor.value;

  console.log('--', descriptor);
  
  descriptor.value = function () {
    console.log(`Calling ${name} width`, arguments);
    return oldValue.apply(this, arguments);
  }

  return descriptor;
}

const math = new Math();
math.add(2, 4);