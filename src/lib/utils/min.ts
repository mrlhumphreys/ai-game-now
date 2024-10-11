const min = function(array: Array<number>): number | null {
  let result = Math.min(...array);
  if (result === Infinity) {
    return null;
  } else {
    return result;
  }
};

export default min;
