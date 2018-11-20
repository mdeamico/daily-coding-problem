// From https://www.dailycodingproblem.com/

// Given an array of integers, return a new array such that each element at 
// index i of the new array is the product of all the numbers in the original 
// array except the one at i.

// My solutions 

// Test case inputs
let input1 = [1, 2, 3, 4, 5];
let input2 = [3, 2, 1]

// error checking to determine if inputs are numeric
validateInput = function(input) {
  if (input.length < 1) return false;

  if (!(input.every((value) => typeof(value) === "number"))) return false;

  return true;
}

// Solution1 utilizes division. Determine product of all elements in the input,
// then divide by the value at the current position in the array.
let solution1 = function(input) {

  if (!validateInput(input)) return false;

  let totalProduct = input.reduce((prev, curr) => prev * curr, 1);

  let output = [];

  input.forEach((value) => {
    output.push(totalProduct / value)
  });

  return output;
}

// Solution2 does not use division. For each position i in the input, slice the
// input into a head array of all elements before i, and tail array of all
// elements after i. Find the product of the elements in the head and tail.

let solution2 = function(input) {
  let output = [];

  for(let i = 0; i < input.length; ++i) {

    let head = input.slice(0, i);
    let tail = input.slice(i + 1, input.length);
    let headProduct = head.reduce((prev, curr) => prev * curr, 1);
    let tailProduct = tail.reduce((prev, curr) => prev * curr, 1);

    output.push(headProduct * tailProduct);
  }

  return output;
}

// test input 1
console.log(solution1(input1));
console.log(solution2(input1));

// test input 2
console.log(solution1(input2));
console.log(solution2(input2));
