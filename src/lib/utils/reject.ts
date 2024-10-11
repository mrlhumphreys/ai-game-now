const reject = function<T>(array: Array<T>, callback: (e: T) => boolean): Array<T> {
  return array.filter(function(e) {
    return !callback(e);
  });
};

export default reject;
