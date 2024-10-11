const max = function(array: Array<number>): number | undefined {
  let result = Math.max(...array);
  if (result === -Infinity) {
    return undefined;
  } else {
    return result;
  }
};

export default max;
