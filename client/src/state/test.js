function indexOfCallback(arr, callback, startIndex) {
  if (typeof startIndex == 'undefined') {
    startIndex = 0;
  }
  for (var i = startIndex; i < arr.length; i++) {
    if (callback(arr[i])) {
      return i;
    }
  }
  return -1;
}

var array = [
  { id: 1, value: 5 },
  { id: 2, value: 6 },
  { id: 3, value: 7 },
  { id: 4, value: 8 },
];
// Search on id === 3
console.log(
  indexOfCallback(array, function (obj) {
    return obj.id === 4;
  })
);
// Search on value === 6
console.log(
  indexOfCallback(array, function (obj) {
    return obj.value === 6;
  })
);
