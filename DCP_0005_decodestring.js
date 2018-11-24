// From https://www.dailycodingproblem.com/

// Given the mapping a = 1, b = 2, ... z = 26, and an encoded message, 
// count the number of ways it can be decoded.

// For example, the message '111' would give 3, since it could be decoded as:
// 'aaa', 'ka', and 'ak'.

// You can assume that the messages are decodable. 
// For example, '001' is not allowed.


// ------------------------- My Solutions --------------------------------------
//
// ---------- Version 1 (v1) ----------
//
// try an example: "hello" encodes to: "85121215"
// "85121215" can be decoded to:
// heababae  using each individual digit
// helabae   "12" can be decoded as "l" or just decode the "1" as "a"
// heab...  
// heau...   
// ...
// Each pair of digits spawns 2 potential decoding sequences. 
// If we have a "decode" function we can recursively look at the encoded input.
// first two digits "85" do not form a valid pair, so there is only one 
// decoding of "85" --> decode("85") = "he"
// "he" + decode("121215")
// "he" + "a" + decode("21215")
// "he" + "l" + decode("1215")
//
// Generalize to decoding an input of length n to be:
// decode(n) = decode(n - 1) + decode(n - 2)

// recursive helper to count the ways to decode the input string.
// memoizes subproblem solutions (memo)
// n is the input string length
function decode_v1_helper(input, n, memo) {
  if (n <= 1) return 1;

  if (memo[n] !== null) {
    return memo[n];
  }

  if (input[n - 1] !== 0) {
    memo[n] = decode_v1_helper(input, n - 1, memo);
  }

  if (input.slice(n - 2, n) <= 26) {
    memo[n] += decode_v1_helper(input, n - 2, memo); 
  }
      
  return memo[n];
}

// decodes input string. (assumes valid input)
function decode_v1(input) {
  let memo = new Array(input.length + 1).fill(null);
  memo[0] = 1;
  memo[1] = 1;

  let answer = decode_v1_helper(input, input.length, memo);

  return answer;
}


// ---------------- Version 2 (v2) ----------------

// Because we are only interested in the final number of ways to decode, we only
// need to keep track of the last two values in the memo array from version 1.
// Call these values prev1 and prev2. Then we can build the solution from the
// bottom up, instead of using recursion.
// v1 -> memo[1, 1, ..., n-1, n] last postion n is answer
// v2 ->      ..., prev1, prev2
// keep rolling totals in prev1, prev2

function decode_v2(input) {

  if (input.length <= 1) return 1;

  let prev1 = 1;
  let prev2 = 1;
  let answer = prev1;

  // iterate from the 2nd postion in the string through the last position.
  // Need to use input.length + 1 in order to capture the last postion because
  // the loop evaluates at i - 1 and i - 2
  for (let i = 2; i < input.length + 1; ++i) {
    if (input[i - 1] > 0) {
      answer = prev1; 
    }
    
    if (input.slice(i - 2, i) <= 26) {
      answer += prev2;
    }

    // shift prev1 & prev2
    prev2 = prev1;
    prev1 = answer;
  }

  return answer
}

// ---------------------- TESTS --------------------------------
console.log(decode_v1("111") === 3);
console.log(decode_v2("111") === 3);
