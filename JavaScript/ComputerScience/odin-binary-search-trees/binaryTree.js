class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array = []) {
    this.root = this.buidlTree(array);
  }

  buidlTree(array = [], start = 0, end = (array.length - 1)){
    let toPopulate = [];
    array.forEach(ele => {
      if (!toPopulate.includes(ele)){
        toPopulate.push(ele);
      } 
    });
    toPopulate.sort((a, b) => a - b);

    const mid = Math.floor((start+end)/2);

    if(start>end || mid >= toPopulate.length || mid < 0) return null;

    const node = new Node(toPopulate[mid]);

    node.left = this.buidlTree(toPopulate, start, mid - 1);
    node.right = this.buidlTree(toPopulate, mid + 1, end);

    return node;
  }

  insert(value) {
    function traverseAndInsert(node, value){
      if (value < node.data) {
        if(node.left){
          traverseAndInsert(node.left, value);
        } else {
          node.left = new Node(value);
        }
      } else if (value > node.data) {
        if(node.right) {
          traverseAndInsert(node.right, value);
        } else {
          node.right = new Node(value);
        }
      }
    }

    this.root ? traverseAndInsert(this.root, value) : this.root = new Node(value);
  }

  deleteItem(value) {
    function getSuccesor(curr) {
      curr = curr.right;
      while (curr !== null && curr.left !== null) curr = curr.left;
      return curr;
    }

    function traverseAndDelete(node, value){
      if (node.data > value) {
        node.left = traverseAndDelete(node.left, value);
      } else if (node.data < value) {
        node.right = traverseAndDelete(node.right, value);
      } else {
        if (node.left === null) return node.right;
        if (node.right === null) return node.left;

        const succ = getSuccesor(node);
        node.data = succ.data;
        node.right = traverseAndDelete(node.right, succ.data);
      }

      return node;
    }

    this.root === null ? this.root : traverseAndDelete(this.root, value);
  }
  
  find(value) {
    function traverseAndFind (node, value) {
      if (!node) return null;
      if (node.data === value) return node;
      if (node.data > value) {
        return traverseAndFind(node.left, value);
      } else if (node.data < value) {
        return traverseAndFind(node.right, value);
      }
    }

    return this.root === null ? null : traverseAndFind(this.root, value); 
  }


  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function must be provided to levelOrderForEach()");
    }

    function levelOrderRec(node, level, res) {
      if (node === null) return;

      if (res.length <= level) res.push([]);

      res[level].push(node.data);

      levelOrderRec(node.left, level + 1, res);
      levelOrderRec(node.right, level + 1, res);
    }

    function levelOrder(root) {
      const res = [];

      levelOrderRec(root, 0, res);

      return res;
    }

    const res = levelOrder(this.root);
    for (const level of res) {
      for (const node of level) {
        callback(node);
      }
    }
  }

  inOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function must be provided to inOrderForEach()");
    }

    function inOrder(node){
      if (!node) return;
      inOrder(node.left);
      callback(node.data);
      inOrder(node.right);
    }

    inOrder(this.root);
  }

  preOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function must be provided to preOrderForEach()");
    }

    function preOrder(node) {
      if(!node) return;
      callback(node.data);
      preOrder(node.left);
      preOrder(node.right);
    }

    preOrder(this.root);
  }

  postOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("A callback function must be provided to postOrderForEach()");
    }

    function postOrder(node) {
      if(!node) return;
      postOrder(node.left);
      postOrder(node.right);
      callback(node.data);
    }

    postOrder(this.root);
  }

  height(value) {
    let height = -1;

    function dfs(node){
      if(!node) return -1;

      const left = dfs(node.left);
      const right = dfs(node.right);
      const currentHeight = Math.max(left, right) + 1;

      if (node.data === value) height = currentHeight;

      return currentHeight;
    }

    dfs(this.root);
    return height;
  }

  depth(value) {
    function traverseAndFind(node, value) {
      if (!node) return -1;

      let depth = -1;

      if (node.data === value ||
          (depth = traverseAndFind(node.left, value)) >= 0 ||
          (depth = traverseAndFind(node.right, value)) >= 0) {
        return depth + 1;
      }

      return -1;
    }

    return traverseAndFind(this.root, value);
  }

  isBalanced() {
    function checkBalance(node) {
      if (!node) return 0;

      const leftHeight = checkBalance(node.left);
      if (leftHeight === -1) return -1;
      const rightHeight = checkBalance(node.right);
      if (rightHeight === -1) return -1;
      if (Math.abs(leftHeight - rightHeight) > 1) return -1;

      return Math.max(leftHeight, rightHeight) + 1;
    }

    return checkBalance(this.root) !== -1;
  }

  balance() {
    function buildBalancedTree(nodes, start, end) {
      if (start > end) return null;
      const mid = Math.floor((start + end) / 2);
      const node = new Node(nodes[mid]);
      node.left = buildBalancedTree(nodes, start, mid - 1);
      node.right = buildBalancedTree(nodes, mid + 1, end);
      return node;
    }

    const nodes = [];
    this.inOrderForEach(v => nodes.push(v));

    this.root = buildBalancedTree(nodes, 0, nodes.length - 1);
  }
}

// const test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// // 1 3 4 5 7 8 9 23 67 324 6345

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};


// test.insert(90);
// prettyPrint(test.root);

// test.deleteItem(9);
// prettyPrint(test.root);

// console.dir(test.find(7), {depth:null});

// console.log("\nPre-order:");
// test.preOrderForEach(v => console.log(v));

// console.log("\nIn-order:");
// test.inOrderForEach(v => console.log(v));

// console.log("\nPost-order:");
// test.postOrderForEach(v => console.log(v));

// console.log("\nLevel-order:");
// test.levelOrderForEach(v => console.log(v));

// console.log(`\nHeight: ${test.height(67)}`);

// console.log(`\nDepth: ${test.depth(67)}`);

// console.log(`\nIs balanced: ${test.isBalanced()}`);

// console.log('\nBalancing the tree...');
// test.balance();
// prettyPrint(test.root);

// console.log(`\nIs balanced: ${test.isBalanced()}`);

function randomArray(size = 10, maxValue = 100) {
  const arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * maxValue));
  }
  return arr;
}

function printTraversals(tree) {
  const lvl = [];
  tree.levelOrderForEach(v => lvl.push(v));
  const pre = [];
  tree.preOrderForEach(v => pre.push(v));
  const inf = [];
  tree.inOrderForEach(v => inf.push(v));
  const post = [];
  tree.postOrderForEach(v => post.push(v));

  console.log('Level-order: ', lvl);
  console.log('Pre-order:   ', pre);
  console.log('In-order:    ', inf);
  console.log('Post-order:  ', post);
}

// 1) Create a binary search tree from an array of random numbers < 100
const initialArray = randomArray(15, 100);
console.log('Initial random array (<100):', initialArray);

const test = new Tree(initialArray);

console.log('\nInitial tree (pretty):');
prettyPrint(test.root);

// 2) Confirm that the tree is balanced by calling isBalanced
console.log('\nIs balanced initially?', test.isBalanced());

// 3) Print out all elements in level, pre, post, and in order.
console.log('\nTraversals (initial):');
printTraversals(test);

// 4) Unbalance the tree by adding several numbers > 100.
const toUnbalance = [101, 150, 200, 250, 300];
console.log('\nInserting values to unbalance the tree:', toUnbalance);
for (const v of toUnbalance) test.insert(v);

console.log('\nAfter inserts (pretty):');
prettyPrint(test.root);

// 5) Confirm that the tree is unbalanced by calling isBalanced.
console.log('\nIs balanced after unbalancing inserts?', test.isBalanced());

// 6) Balance the tree by calling rebalance.
console.log('\nRebalancing (calling balance())...');
test.balance();

console.log('\nAfter rebalancing (pretty):');
prettyPrint(test.root);

// 7) Confirm that the tree is balanced by calling isBalanced.
console.log('\nIs balanced after rebalancing?', test.isBalanced());

// 8) Print out all elements in level, pre, post, and in order.
console.log('\nTraversals (after rebalancing):');
printTraversals(test);

console.log('\n--- driver finished ---');