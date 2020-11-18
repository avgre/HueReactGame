function divideSegments(number, parts, min) {
  const randombit = number - min * parts;
  const out = [];
  for (var i = 0; i < parts; i++) {
    out.push(Math.random());
  }
  const mult =
    randombit /
    out.reduce(function (a, b) {
      return a + b;
    });
  return out.map(function (el) {
    return el * mult + min;
  });
}
function addDelay(array, type) {
  let delay = 2000;
  if (type === 'pos') {
    delay = 0;
  }
  var newArr = [...array]
    .map((e, i) => (i < array.length - 1 ? [e, delay] : [e]))
    .reduce((a, b) => a.concat(b));
  return newArr;
}
function sumArray(array) {
  const result = array.reduce((acc, item, index) => {
    if (index === 0) {
      acc.push(item);
    } else {
      acc.push(acc[index - 1] + item);
    }
    return acc;
  }, []);
  return result;
}
function addZero(array, type) {
  let delay = 0;
  if (type === 'time') {
    delay = 2000;
  }
  array.unshift(delay);
  return array;
}

export function createGameArray(total, segments, spread, type) {
  let array = addZero(
    sumArray(addDelay(divideSegments(total, segments, spread), type))
  );
  return array;
}
