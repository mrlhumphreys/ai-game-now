const uniq = function<T>(array: Array<T>): Array<T> {
  return array.filter((e: T, i: number, a: Array<T>) => {
    return a.indexOf(e) === i;
  });
};

export default uniq
