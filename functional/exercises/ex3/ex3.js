function foo(x, y) {
  return () => x + y;
}

var x = foo(3,4);

x();	// 7
x();	// 7
console.log("x()", x());
