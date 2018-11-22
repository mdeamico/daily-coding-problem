
// From https://www.dailycodingproblem.com/
// cons(a, b) constructs a pair, and car(pair) and cdr(pair) returns the first 
// and last element of that pair. 
//
// For example, 
//     car(cons(3, 4)) returns 3, and 
//     cdr(cons(3, 4)) returns 4.
//
// Given this implementation of cons:
//
// (python)
// def cons(a, b):
//     def pair(f):
//         return f(a, b)
//     return pair
// 
// Implement car and cdr.

// javascript translation of given python implementation
cons = function(a, b) {
    pair = function(f) {
        return(f(a, b))
    }
    return(pair);
}

// ---------- My implementation of car and cdr ----------

car = function(cons) {
    first = cons((a, b) => a);
    return(first);
}

cdr = function(cons) {
    second = cons((a, b) => b);
    return(second);
}

// Test
console.log(car(cons(3, 4)) === 3);
console.log(cdr(cons(3, 4)) === 4);
