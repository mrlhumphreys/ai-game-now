const sum = function<T>(array: Array<T>, callback: (e: T) => number): number {
  if (array.length === 0) {
    return 0;
  }
  return array.map(callback).reduce(function(memo, n) {
    if (memo === undefined) {
      memo = 0;
    }
    memo += n;
    return memo;
  });
};

export default sum;
