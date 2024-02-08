const deepClone = function(obj: any): any {
  return JSON.parse(JSON.stringify(obj));
};

export default deepClone;
