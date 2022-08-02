const isObjectHasProperty = (obj, propName) => Object.prototype.hasOwnProperty.call(obj, propName);
const isTwoObjectsHasProperty = (obj1, obj2, propName) => isObjectHasProperty(obj1, propName)
  && isObjectHasProperty(obj2, propName);
export { isObjectHasProperty, isTwoObjectsHasProperty };
