const diff = function<T>(a: Array<T>, b: Array<T>): Array<T> {
  return a.filter((x) => {
    return !b.includes(x);
  });
};

export default diff;
