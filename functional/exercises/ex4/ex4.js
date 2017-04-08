// code here! :)
function foo () {
  return 5;
}

function bar () {
  return 3;
}

function foobar(a) {
  return function (b) {
    return a + b;
  };
}

function add (a, b) {
  return a + b;
}

// console.log("2. add(bar(), foo()", add(bar(), foo());

// 3
function add2(fn1, fn2) {
  return add(fn1(), fn2());
}

// console.log("3. add2(foo, bar)", add2(foo, bar));

// 4
// console.log("foobar(3)(5)", foobar(3)(5)); // 8

// 5
// function addn(fns) {
//   // reduce! -- doesn't work for more than two fns!!
//   return fns.reduce(function (a, b) {
//     a += add2(a, b)
//     return a;
//   })
// }
function addn (fns) {
  return fns.reduce(function(a,b) {
    return function () {
      return add2(a, b);
    };
  })();
}
// function addn(fns) {
//   // loop!
//   fns = fns.slice();
//   while (fns.length > 2) {
//     const [fn0, fn1, ...rest] = fns;
//     fns = [ function() { return add2(fn0, fn1)}, ...rest];
//   }
//   return add2(fns[0], fns[1]);
// }
// function addn(fns) {
//   // recursive
//   if (fns.length > 2) {
//     const [fn0, fn1, ...rest] = fns;
//     return addn([
//       function() { return add2(fn0, fn1) },
//       ...rest
//     ]);
//   }
//   return add2(fns[0], fns[1]);
// }
console.log("5. addn([foo, bar)", addn([foo, bar]));

function uniq (arr) {
  return arr.reduce(function(a, b) {
    if (!a.includes(b)) return a.concat(b);
    return a;
  }, []);
}
function even (arr) {
  return arr.filter(function(x) { return x % 2 === 0; })
}

let a = [1,2,3,4,5,2,3,5];
console.log("6. uniq(a", uniq(a));
console.log("7. even(a", even(a));
console.log("8.", addn(even(uniq(a)).map(function(x) {
  return (x) => x;
})));
