const compact = function<T>(a: Array<T | undefined | null>): Array<T> {
  return a.filter((e: T | undefined | null): e is T => {
    return typeof e !== 'undefined' && e !== null; 
  });
};

export default compact;
