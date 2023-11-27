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
    let start = 0;
    let end = arr.length - 1;
    if (start > end) return null;

    const mid = Math.ceil((start + end) / 2);
    const root = new Node(arr[mid]);

    root.left = this.buildTree(arr.slice(start, mid));
    root.right = this.buildTree(arr.slice(mid + 1));

    return root;
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

let array = new Tree([1, 2, 3, 4, 5, 6, 7]);
prettyPrint(array.root);
