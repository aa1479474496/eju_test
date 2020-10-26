// lib/core/Axios.js
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    // TODO
    request: new InterceptorManager(),
    response: new InterceptorManager()
  }
}


// lib/core/InterceptorManager.js
function InterceptorManager() {
  this.handlers = [];
}

InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });

  return this.handlers.length - 1;
}



const maxSubArray = function(nums) {
  const len = nums.length;
  if (!len) {
    return nums[0];
  }
  const dp = new Array(len);
  let ans = nums[0];
  dp[0] = nums[0];
  for (let i = 1; i < len; i++) {
    dp[i] = Math.max(nums[i], dp[i - 1] + nums[i]);
    ans = Math.max(dp[i], ans);
  }
  console.log('dp::', dp);
  return ans;
}

let nums = [-2,1,-3,4,-1,2,1,-5,4, 7];
let ans = maxSubArray(nums);
console.log('ans:::', ans);