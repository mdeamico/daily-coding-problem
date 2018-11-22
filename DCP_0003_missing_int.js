// From https://www.dailycodingproblem.com/

// Given an array of integers, find the first missing positive integer in linear 
// time and constant space. In other words, find the lowest positive integer 
// that does not exist in the array. The array can contain duplicates and 
// negative numbers as well.

// For example, the input [3, 4, -1, 1] should give 2. 
// The input [1, 2, 0] should give 3.

// You can modify the input array in-place.


// ---------------- My Solution --------------------------------

findMissingInteger = function(input) {
  
  // Helper function to mutates the input array by swapping
  // the values at positions i and j.
  swap = function(array, i, j) {
    let tmp_i = array[i];
    array[i] = array[j];
    array[j] = tmp_i;
  }

  // The solution must be between 1 and the positive array length (inclusive). 
  // Given [99, 100], array length is 2. smallest missing integer is 1.
  // Given [1, 7],    array length is 2. smallest missing integer is 2.
  // Given [8, 2, 1], array length is 3. smallest missing integer is 3.

  // If we put the positive integers into their corresponding index by swapping 
  // we can find the smallest missing one. sort [8, 2, 1] ---> [1, 2, 8]. 
  // we see that 8 is in index 2, so the answer is 2 + 1 = 3. We can determine the 
  // index of interest by marking visited values as negative. [-1, -2, 8]
  // Values larger than the array length are left wherever they occur and not 
  // marked negative because they are not valid solutions.

  positionSort = function(array) {
    for (let i = 0, len = array.length; i < len; ++i) {
      // Negatives already visited
      if (array[i] <= 0) continue; 
      
      // values larger than array length are not valid solutions
      if (array[i] > len) continue;

      // Subtract 1 for position swap because of zero based array indices.
      let j = array[i] - 1;  
      swap(array, i, j);

      // mark i as visisted by making it negative. (i is now in position j)
      // marking is last operation because swap needs positive values.
      array[j] = -array[j];
    }
  }


  // ---- Main Routine -----

  // Remove negatives and zeros because they are not valid solutions. 
  // Splice modifies in place; assume Javascript does this in O(1) time & space.
  for (let i = input.length - 1; i >= 0; --i) {
    if (input[i] <= 0) {
      input.splice(i, 1);
    }
  }

  // Run position sort twice because swapped values are skipped in the first loop
  positionSort(input);
  positionSort(input);

  // default answer is the next number in the sequence.
  // If given [0, 1, 2], return 3.
  let answer = -(input[input.length - 1]) + 1;

  for (let i = 0; i < input.length; ++i) {
    if (input[i] > 0) {
      answer = i + 1;
      break;
    }
  }
  
  return answer;
}

// Tests
console.log(findMissingInteger([3, 4, -1, 1]) === 2);
console.log(findMissingInteger([2, 3, 7, 6, 8, -1, -10, 15]) === 1);
console.log(findMissingInteger([15, 3, 7, 6, 8, -1, -10, 2]) === 1);
console.log(findMissingInteger([-100, 99, 98]) === 1);
console.log(findMissingInteger([2, 3, 7, 0, -1, -10, 15]) === 1);
console.log(findMissingInteger([-1, -2, 1, 2, 3]) === 4);
console.log(findMissingInteger([0, 1, 2]) === 3);
