# What is the purpose of code?
Primary purpose is not to instruct the computer, but rather to communicate with other humans.

<!-- As soon as we started abstracting binary into a programming language,  -->
Programming is the action of giving the computer a set of constraints, rather than direct orders.  These are 'suggestions' not commands - the computer decides how to interpret.

- Note: ask about that blog post of JS assumptions

### Imperative vs Declarative
Imperative: focuses mostly on how to do something. 'How?'
Declarative: focuses mostly on what the outcome should be. 'Why?'

Declarative is future-proofing your code, allowing the compiler to make the 'how' decisions and improve on them over time. Embrace the things that more your code more declarative (example: es6 classes, new features).

### How to improve code
Most improvements are focused on developer tools.  It may be more valuable to **improve the readability** of your code.  Make your code more readable and it is better code - easy syntax, familiarity are the most important.  `An automated metric for code readability` book.  (Grammarly for code? Pretty sweet idea). Optimize for readability - aka declarative.
##### Code that more clearly communicates to the future reader is better code!

### Why Functional?
Functional programming, when applied correctly, makes your code more readable.
- Instant recognition
- Immediate understanding of the outcome
- No need to focus, allocate mental resources due to simplicity

Increased **readability of code lowers cost and increases productivity**. Investing in readability rather than writability, cost of product goes down.

##### Code comments - always 'Why', sometimes 'How', and never 'What'

# Functional-light Programming

## What is a function?
### Function vs Procedure
Any function that does not have a return is not a function, but rather a procedure. It is not a function if it does not meaningfully return something.  Procedure is creating a side effect and functions in functional programming have no side effects. Functions take direct input and give a direct output.

Unary is a function that takes a single input, binary is a function that takes two inputs, enary/variatic is three or more

Functional programming cares about how many inputs and how it impacts the function's design.  

## The problems of side effects and impure functions

Side causes/effects contribute to the degradation of readability. Functions dependent on the execution of other lines of code (aka side effects) destroy readability. Organize code where possible to avoid side effects. Side effects/causes are implicit, or hidden, inputs and outputs.

##### Side effects are necessary and unavoidable.  

Keep the inner core of your program side effect free, and move all side effects to the outer shell.  Side effects are the most likely culprits of bugs. Collecting them - organizing them - isolating them makes your code easier to debug.

## Pure functions
- A function without side causes and side effects.
- A pure function is one that doesn't rely on a variable outside itself (side cause) and doesn't change a variable outside itself (side effect).
- It doesn't rely on variables outside itself.
- Execution at any point in your program has a predictable and consistent result.

### How to refactor an impure function/dealing with side effects?
You can wrap an impure function with a pure function to encapsulate as holder of state - making the interaction with that function pure.

```
function F(x) {
  var y;
  f(x);
  return y;

  function f() {
    y = 2 * Math.pow(x, 2) + 3;
  }
}
```
When you can't do that (maybe you do not have access to the impure function), you can create an interface that captures state and restores it.
```
// function located in library, or elsewhere
function f() {
  y = 2 * Math.pow(x, 2) + 3;
}

function F(curX) {
  var [origX, origY] = [x, y];
  x = curX;
  f();
  var newY = y;
  [x, y] = [origX, origY];
  return newY;
}
```
Maybe, you cannot cache state, the final alternative is to add a comment/make it obvious there is a side effect.

## Function Composition
Abstraction takes two things that when together, are too hard to reason about, puts a semantic barrier between them, so that they can be easily reasoned about. We can think independently about the 'how' and the 'what'.

A **higher order function** is a function that has inputs or outputs or both that are other functions.

```
function mult(x, y) {
  return x * y;
}
function sum(x, y) {
  return x + y;
}
// Higher order function
function composeBinary(fn1, fn2) {
  return function comp(arg1, rg2, arg3) {
    return fn2(fn1(arg1, arg2), arg3);
  };
}
var multAndSum = composeBinary(mult, sum);
multAndSum(3, 4, 5);
```
Functional programming is intentionally inserting abstraction. Layer upon layer of functions. Like building with blocks of legos.

Compose lists its arguments in the order they appear in the code, not in the order of execution (ie, inner to outer)
For example:
```
compose(fn2, fn1){
  return fn2(fn1())
}
```
pipe does the opposite:
```
pipe(fn1, fn2){
  return fn2(fn1())
}
```

## Closures
Closure is when a function 'remembers' the (lexical) variables around it even when that function is executed elsewhere. Are closures and objects the same thing? Pretty much.

## Curry vs partial application
### How are they alike?
- Both are techniques for specializing a generalized function.
- Both allow you to provide initial input and defer execution until later.
- Don't need to know all arguments up front.

```
// generalized function
function foo(a, b) {
  return a + b
}

// specialized (partial application)
var addTen = (x) => foo(10, x);
addTen(3) // 13
```
(A generalized function is one that is fully parameterized. Specializing it is the act of assigning it in a way that provides a static argument, without having all arguments)

### How are they different?
- Partial application provides some of the arguments now, and **all of the remaining** arguments on the next call.
- Currying provides **one argument at a time** in each function call.

Javascript curry implementation often accepts multiple arguments ('loose currying'), but in the strictest sense, currying should only accept on argument.
```
var f = curry(foo, 3) // 3 is the number of arguments
f(1)(2)(3)
// loose curry
f(1, 2)(3)
```
partial
```
function partial (fn, ...firstArgs) {
  return function applied(...lastArgs) {
    return fn(...firstArgs, ...lastArgs);
  };
}
```
curry (my own, broken implementation...)
```
function curry(fn, argumentCount) {
  let args = [];
  return (x) => {
    args.push(x);
    if (args.length === argumentCount) return fn(...args);
  }
}
```

Are closures a violation of our definition of a pure function? Javascript function purity is a level of confidence, rather than a binary condition. A matter of confidence that you will get the same output given the same input.

The module pattern says to encapsulate state that changes over time - a usage of closure that is not consistent with functional programming.
