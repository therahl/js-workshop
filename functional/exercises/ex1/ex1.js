
// 1
function bar(x) {
	var y = 5, z;
	foo(x);
	return [z, y];
	function foo(x) {
		y++;
		z = x * y;
	}
}
console.log("bar(20)", bar(20));

// 2
// Pretend this function cannot be moved or changed.
// How can we encapsulate it?
function foo(x) {
	y++;
	z = x * y;
}

function barTwo(curX, curY) {
	// cache original state, since we know foo() will mutate and we should reverse the side effect
	// How would this work for arguments that are not primitives?
	// Would they need to be cloned?
	var [origY, origZ] = [y, z];
	y = curY;
	foo(curX);
	var [newY, newZ] = [z, y];
	// return values to original state from cached values, since foo() has mutated the original state
	[y, z] = [origY, origZ];
	return [newY, newZ];
}

var y = 5, z;
console.log("barTwo(20, y), z, y", barTwo(20, y), z, y);
