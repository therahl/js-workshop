function increment(x) { return x + 1; }
function decrement(x) { return x - 1; }
function double(x) { return x * 2; }
function half(x) { return x / 2; }

function compose(...args) {
  return function (result) {
    for (var i = args.length; i > 0; i--) {
      result = args[i - 1](result);
    }
    return result;
  }
}
// wrong order, but otherwise good
function compose (...args) {
  return function composed (result, i) {
    if (i === result.length) {
      return result;
    }
    result = args[i](result);
    return composed(result, ++i);
  }
}

function pipe(...fns) {
  return compose(...fns.reverse());
}

var f = compose(decrement,double,increment,half);
var p = pipe(half,increment,double,decrement);

console.log('f(3) === 4', f(3) === 4, f(3));
// true

console.log('f(3) === p(3)', f(3) === p(3));
// true
