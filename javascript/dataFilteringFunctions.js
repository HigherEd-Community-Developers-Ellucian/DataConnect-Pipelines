// -------------------------------------------------------------
// DATA FILTERING FUNCTIONS
// Filters the keys on an Object based on an array of key names
const keepObjectKeys = (object, keysArray) => {
  // Handle optional object chaining in case we have an undfined here, return undefined
  if (object === undefined) {
    return undefined;
  }
  const newObject = {};
  keysArray?.forEach((key) => {
    if (key in object) {
      // That key exists in this object, pass it on
      newObject[key] = object[key];
    }
  });
  return newObject;
};

// Filters the keys on an Array of Objects based on an array of key names
// Requires keepObjectKeys
const keepArrayKeys = (array, keysArray) => {
  newArray = [];
  array?.forEach((object) => newArray.push(keepObjectKeys(object, keysArray)));
  return newArray;
};

// -------------------------------------------------------------
