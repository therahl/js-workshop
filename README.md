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
- A function is pure if it has referential transparency.  **Referential transparency means you could replace the function call with its return value without effecting the rest of the program.**

### How to refactor an impure function/dealing with side effects?
You can wrap an impure function with a pure function to encapsulate as holder of state - making the interaction with that function pure.

```javascript
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
```javascript
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

```javascript
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
```javascript
compose(fn2, fn1){
  return fn2(fn1())
}
```
pipe does the opposite:
```javascript
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

```javascript
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
```javascript
var f = curry(foo, 3) // 3 is the number of arguments
f(1)(2)(3)
// loose curry
f(1, 2)(3)
```
partial
```javascript
function partial (fn, ...firstArgs) {
  return function applied(...lastArgs) {
    return fn(...firstArgs, ...lastArgs);
  };
}
```
curry (my own, broken implementation...)
```javascript
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


## Immutability
Don't change stuff! :wink:

...huge rant against using `const` because 'people do not understand it' -> da fuq?

In my opinion, `const` increases readability.  You would only find it confusing (ie, you assume it means Immutability of values, rather than assignment) if you didn't know javascript... Simpson says otherwise - says not to use it because some people might find it confusing (wtf? May as well not use recursion or reduce, etc.  Argument makes no sense).

We use immutability to increase readability confidence.
`var z = Object.freeze([1, 2, 3])` <- not for the purpose of the code, but for the purpose of telling the reader it cannot change.

## Lists
Start looking at the logic of your program as the data structure. Operations over lists.
### Map: Transformation
We do not transform the values in place, but rather create a new data structure that is a transformation of the original data (projecting the data to the new data structure).
### Filter
Big rant on filtering, mostly regard the name stating that it implies 'filter out' but in practice is 'filter in' and that the creators have misnamed this method and that Simpson creates his own `filterIn` and `filterOut` methods.
### Reduce
Javascript reduce does not require an initial value, and will just use the first value in place of initial value.
### Fusion
Composed map functions
### Transduce


------------------------------------------------------------------

# Rethinking Async
Time is the most difficult state to manage.  Async patterns attempt to make time related state more declarative.
## Async Patterns
  * Parallel vs Async
  * Callbacks
  * Thunks
  * Promises
  * Generators / Coroutines
    - A fundamentally different kind of function
  * Reactive (Observables)
    - Starting to grow exponentially
  * CSP (channel-oriented concurrency)
    - Next year's big thing
    - Redux Saga is CSP
    - Introduced to JS by om framework


  The new baseline for async patterns is weaving together Promises and Generators, which is the async/await pattern.

### Parallel vs Async
Javascript is single threaded. The program written with javascript is only given a single thread, while the Javascript engine uses many threads; however, the 2017 spec added shared memory locations (think about service worker/client interaction) and mutexes (aka multithreading).

### Callbacks
Inversion control. Code you cannot trust is code you do not understand.
Callbacks are not reasonable due to the visual, syntactic nature in which they are expressed.  At any time there is a divergence from how your brain organizes data and how your code is organized, there are bugs.

Synchronous sequential and blocking progression of code is more reasonable.

### Thunks
A thunk is a function that does not need any arguments. It can run and compute its answer and return it. It can have a callback, but it isn't necessary to complete its work (ie an async thunk would need a callback for assignment of response).

### Promises
  * Future values - Promises are future cheeseburgers.
  * Time independent
  * Completion events
  * It is a callback manager - manages callbacks in a predictable and trustable way
  * An un-inversion of control, they revert the inversion of control due to callbacks
  * Designed to address problems that callbacks alone cannot address
    - Only received once
    - Either success OR error
    - Messages passed/kept
    - Exceptions become errors
    - Immutable once resolved
  * Can only resolve a single value

#### Promise abstractions
##### The gate - Promise.all
Waits until all promises in array are complete.
##### The timeout - Promise.race
Takes a list of promises and waits until one resolves.  A sort of promise timeout
```javascript
var p = trySomeAsyncThing();
Promise.race([
  p,
  new Promise(function(_, reject){
    setTimeout(function(){
        reject('Timeout!!');
    }, 3000);
  })
])
.then(success, error)
```
##### The sequence - automatically chained promises
A pattern from the Asynquence library.

### Generators / Co-routines
Does not have the run to completion semantic that regular js functions possess.  They do no have to run to completion. 'Cooperative' concurrency aka 'co-routines', can yield execution, or pause, and allow something else to run in the thread.
Acceptable syntax:
```javascript
function* () {}
function* name() {}
function * name() {}
function *name() {}
```
Example:
```javascript
function * gen() {
  console.log('hello');
  yield;
  console.log('world');
}
var it = gen(); // no console log
it.next(); // hello
it.next(); // world
```
You can think of a generator as an iterable data source. Yield is not just a flow control mechanism - it is a **message passing mechanism**;
Example:
```javascript
function * main() {
  yield 1;
  yield 2;
  yield 3;
}
var it = main();
it.next(); // { value: 1, done: false}
it.next(); // { value: 2, done: false}
it.next(); // { value: 3, done: false}
it.next(); // { value: undefined, done: true}
```
`.next()` can accept an argument to use as the value of yield

```javascript
function *run() {
  var x = 1 + (yield);
  var y = 1 + (yield);
  yield (x + y);
}
let a = run();
a.next();
a.next(10);
console.log('Meaning of life ' + a.next(30).value);
```
Async example - factoring out time.
```javascript
function getData(d) {
  setTimeout(function(){
    run.next(d); // go to next step in generator >!! inversion of control
  }, 1000)
}

var run = function*() {
  var x = 1 + (yield getData(10));
  var y = 1 + (yield getData(30));
  var answer = (yield getData('Meaning of life: ' + (x + y)));
  console.log(answer);
}
run.next();
```
### Generators + Promises
Yielding out a promise, iterate generator after promise resolved. Yield out a promise, then resume, yield promise, then resume, etc...

You can use a generator in place of promise chains.  It gives you a synchronous flow of asynchronous data. Native js now allows this pattern with the `async` `await` pattern.
```javascript
async function main() {
  var person = await getPerson();
  var orders = await getOrders(person.id);
  console.log(orders);
}
main();
```
Downsides: engine can only deal with promises being awaited
A library abstraction like Asynquence accepts any type to be awaited.  Also, yield must be directly inside the generator.


What is callback hell?
Callbacks don't model out programs in a way that we think about them, they are not synchronous
Promises
A manager of callbacks, a future value, solves inversion of control by maintaining control and waiting on a message rather than a callback.

### Reactive Programming
General Theory of Reactivity
https://github.com/kriskowal/gtor

|       - | Single         | Multiple       |
| :------ | :------------- | :------------- |
| Push    |  Callbacks     | Observables    |
| Pull    |  Promise       | Generators     |

#### Observables
An event source where data can come in, with a series of steps/transformations.  It is a lazy array. An array like structure that we can add data to over time.  Subscribers of the observable will receive the updated observable. We add the data to the observable, and that triggers the transformations.
Rxjs is the most popular library. However, it is HUGE.  Check out RxMarbles.com it has demos of the most popular rx operators.

Asynquence has reactive sequences.

#### Communicating Sequential Processes using Channels
(aka **go**-style concurrency)
Note: Didn't follow this closely. Do some reading on Go and get more understanding of generators and channels.

# Summary
Code is about readability.
