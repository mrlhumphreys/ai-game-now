const maxBy = function<T>(array: Array<T>, callback: (e: T) => number): T | undefined {
  let elements = array.map(callback);
  let result = Math.max(...elements);
  let index = elements.indexOf(result);
  return array[index];
};

export default maxBy;
