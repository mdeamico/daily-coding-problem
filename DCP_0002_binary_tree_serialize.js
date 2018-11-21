// From https://www.dailycodingproblem.com/

// Given the root to a binary tree, implement serialize(root), which serializes 
// the tree into a string, and deserialize(s), which deserializes the
// string back into the tree.

// The following test should pass:
// tree = Node('root', Node('left', Node('left.left')), Node('right'))
// assert deserialize(serialize(node)).left.left.val == 'left.left'


// Class to represent a binary tree
class Node {
  constructor(val, left, right) {
    this.val = val;
    this.left = left || null;
    this.right = right || null;
  }
}

// Test binary tree:
//       root
//      /    \
//     left   right
//    /
//  left.left

let tree = new Node('root', new Node('left', new Node('left.left')), new Node('right'));


// ---------------------------- My solutions -----------------------------------

// Serialize a binary tree. Returns a csv string representing the tree 
// in "preorder" (root, left, right). Null children are represented by underscores.
serialize = function(binaryTree) {

  // recursive helper to serialize binary tree
  serialize_helper = function(array, node) {
    if (node) {
      array.push(node.val);
      serialize_helper(array, node.left);
      serialize_helper(array, node.right);
    } else {
      array.push("_");
    }
  }

  let array = [];
  serialize_helper(array, binaryTree);

  return array.join(',');
}

let serializedTree = serialize(tree);
console.log('serialized tree:', serializedTree);



// Deserializes a binary tree represented as a csv string in 
// "preorder" (root, left, right) with null children represented as underscores.
// The binary tree csv string is converted to an array, each element in the array
// is processed and removed in the recursive helper function.
deserialize = function(treeString) {

  // recursive helper function to build tree
  deserialize_helper = function(array) {
    
    // terminate if no data
    if (array === null) {
      return null;
    }
  
    // handle null children
    if (array[0] === '_') {
      array.shift();
      return null
    }
  
    // construct a new node
    let node = new Node(array[0]);
    array.shift();
    node.left = deserialize_helper(array);
    node.right = deserialize_helper(array);

    return node;
  }

  let tree = deserialize_helper(treeString.split(','));
  return(tree);
}


let deserializedTree = deserialize(serializedTree);
console.log('deserialized tree:', deserializedTree);


// Test
console.log('Test passed? : ', 
  deserialize(serialize(tree)).left.left.val === 'left.left');
