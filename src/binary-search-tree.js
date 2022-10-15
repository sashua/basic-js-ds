const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    if (this.has(data)) {
      return;
    }
    const newNode = new Node(data);
    const parent = this.findParent(data);
    if (!parent) {
      this._root = newNode;
    } else if (data < parent.data) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }
  }

  has(data) {
    return Boolean(this.find(data));
  }

  find(data) {
    let n = this.root();
    while (n) {
      if (data === n.data) {
        return n;
      }
      n = data < n.data ? n.left : n.right;
    }
    return null;
  }

  findParent(data) {
    if (data === this.root()?.data) {
      return null;
    }

    let n = this.root();
    while (n) {
      const nextN = data < n.data ? n.left : n.right;
      if (
        !nextN ||
        (!n.left && !n.right) ||
        data === n.left?.data ||
        data === n.right?.data
      ) {
        return n;
      }
      n = nextN;
    }
    return null;
  }

  remove(data) {
    const found = this.find(data);
    if (!found) {
      return;
    }
    const parent = this.findParent(data);
    if (data === parent?.left?.data || !parent) {
      const newChild = found.left ?? found.right;
      if (found.left) {
        let leftMax = found.left;
        while (leftMax.right) {
          leftMax = leftMax.right;
        }
        leftMax.right = found.right;
      }
      if (parent) {
        parent.left = newChild;
      } else {
        this._root = newChild;
      }
    } else {
      const newChild = found.right ?? found.left;
      if (found.right) {
        let rightMin = found.right;
        while (rightMin.left) {
          rightMin = rightMin.left;
        }
        rightMin.left = found.left;
      }
      if (parent) {
        parent.right = newChild;
      } else {
        this._root = newChild;
      }
    }
  }

  min() {
    let n = this.root();
    while (n?.left) {
      n = n.left;
    }
    return n ? n.data : n;
  }

  max() {
    let n = this.root();
    while (n?.right) {
      n = n.right;
    }
    return n ? n.data : n;
  }
}

const tree = new BinarySearchTree();
tree.add(9);
tree.add(54);
tree.add(2);
console.log(tree.remove(9));
console.log(tree.root());

module.exports = {
  BinarySearchTree,
};
