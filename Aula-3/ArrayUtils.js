module.exports = {
  isEmpty: function (array) {
    if (array.length === 0) {
      return true;
    } else {
      return false;
    }
  },

  max: function (array) {
    var m = array[0];
    for (var i = 0; i < array.length; i++) {
      if (array[i] > m) {
        m = array[i];
      }
    }
    return m;
  },

  min: function (array) {
    var m = array[0];
    for (var i = 0; i < array.length; i++) {
      if (array[i] < m) {
        m = array[i];
      }
    }
    return m;
  },

  average: function (array) {
    var sum = 0;
    for (var i = 0; i < array.length; i++) {
      sum += array[i];
    }
    return sum / array.length;
  },

  indexOf: function (array, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] === value) {
        return i;
      }
    }
    return -1;
  },

  arraySubArray: function (array, startIndex, endIndex) {
    var subArray = [];
    for (var i = startIndex; i < endIndex; i++) {
      subArray.push(array[i]);
    }
    return subArray;
  },

  isSameLength: function (array1, array2) {
    if (array1.length === array2.length) {
      return true;
    } else {
      return false;
    }
  },

  reverse: function (array) {
    var reverseArray = [];
    for (let i = array.length - 1; i >= 0; i--) {
      reverseArray.push(array[i]);
    }
    return reverseArray;
  },

  swap: function (array, index1, index2) {
    let temp = array[index1];
    array[index1] = array[index2];
    array[index2] = temp;
    return array;
  },

  contains: function (array, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == value) {
        return true;
      }
      return false;
    }
  },

  concatenate: function (array1, array2) {
    var concatenatedArray = [];
    for (var i = 0; i < array1.length; i++) {
      concatenatedArray.push(array1[i]);
    }
    for (var i = 0; i < array2.length; i++) {
      concatenatedArray.push(array2[i]);
    }
    return concatenatedArray;
  },
};
