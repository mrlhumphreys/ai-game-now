const range = function(a: Array<any>, i: number, n: number): Array<number> {
  return [...Array(n).keys()].map(function(j) { return a[i + j]; });
};

const eachCons = function(a: Array<any>, n: number): Array<Array<any>> {
  return [...Array(a.length - n + 1).keys()].map(function(i) { return range(a, i, n); });
};

export default eachCons;
