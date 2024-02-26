function flat(arr, depth = 1) {
  if (depth > 0) {
    return arr.reduce((pre, cur) => {
      return pre.concat(Array.isArray(cur) ? flat(cur, depth - 1) : cur);
    }, []);
  }
  return arr.slice();
}

const arr = flat([1, [2, [3, [4]]]], 3);
console.log(arr);
