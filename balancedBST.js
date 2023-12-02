class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    arr = [...new Set(arr)].sort((a, b) => a - b);
    let start = 0;
    let end = arr.length - 1;
    if (start > end) return null;

    const mid = Math.ceil((start + end) / 2);
    const root = new Node(arr[mid]);

    root.left = this.buildTree(arr.slice(start, mid));
    root.right = this.buildTree(arr.slice(mid + 1));

    return root;
  }

  insert(value) {
    const insertNode = (node, value) => {
      if (node === null) return new Node(value);
      if (value < node.data) node.left = insertNode(node.left, value);
      else if (value > node.data) node.right = insertNode(node.right, value);
      return node;
    };
    this.root = insertNode(this.root, value);
    prettyPrint(array.root);
  }

  delete(value) {
    const deleteNode = (node, value) => {
      if (node === null) return null;
      if (value < node.data) {
        node.left = deleteNode(node.left, value);
        return node;
      } else if (value > node.data) {
        node.right = deleteNode(node.right, value);
        return node;
      } else {
        if (node.left === null && node.right === null) {
          node = null;
          return node;
        }
        if (node.left === null) {
          node = node.right;
          return node;
        } else if (node.right === null) {
          node = node.left;
          return node;
        }
        let temp = node.right;
        while (temp.left !== null) {
          temp = temp.left;
        }
        node.data = temp.data;
        node.right = deleteNode(node.right, temp.data);
        return node;
      }
    };
    this.root = deleteNode(this.root, value);

    prettyPrint(array.root);
  }

  find(value) {
    const findNode = (node, value) => {
      if (node === null) return null;
      if (value < node.data) return findNode(node.left, value);
      else if (value > node.data) return findNode(node.right, value);
      else return node;
    };
    return findNode(this.root, value);
  }

  //Iteration
  levelOrder(callback = null) {
    if (this.root === null) return [];
    const queue = [this.root];
    const result = [];
    while (queue.length > 0) {
      const node = queue.shift();
      if (callback !== null) callback(node);
      result.push(node.data);
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
    }
    prettyPrint(array.root);
    return result;
  }

  //Recursive
  levelOrderRecursive(callback = null) {
    if (this.root === null) return [];
    const queue = [this.root];
    const result = [];
    const traverse = () => {
      if (queue.length === 0) return;
      const node = queue.shift();
      if (callback !== null) callback(node);
      result.push(node.data);
      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);
      traverse();
    };
    prettyPrint(array.root);
    traverse();
    return result;
  }

  inOrder(callback = null) {
    const result = [];
    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      if (callback !== null) callback(node);
      result.push(node.data);
      traverse(node.right);
    };
    prettyPrint(array.root);
    traverse(this.root);
    return result;
  }

  preOrder(callback = null) {
    const result = [];
    const traverse = (node) => {
      if (node === null) return;
      if (callback !== null) callback(node);
      result.push(node.data);
      traverse(node.left);
      traverse(node.right);
    };
    prettyPrint(array.root);
    traverse(this.root);
    return result;
  }

  postOrder(callback = null) {
    const result = [];
    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      traverse(node.right);
      if (callback !== null) callback(node);
      result.push(node.data);
    };
    prettyPrint(array.root);
    traverse(this.root);
    return result;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

let array = new Tree([7, 6, 1, 2, 3, 4, 5]);

// prettyPrint(array.root);

// array.insert(0);
// array.insert(8);

// array.delete(1);
// array.delete(4);

// array.delete(6);
// array.delete(3);

// console.log(array.find(3));
// console.log(array.find(5));
// console.log(array.find(4));

// console.log(array.levelOrder());

// console.log(array.inOrder());

// console.log(array.preOrder());

console.log(array.postOrder());
