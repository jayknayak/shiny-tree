import { Queue } from "./Queue";

// Add a JS object in the form of a Node in a Tree
function Node(data) {
  this.data = data;
  this.parent = null;
  this.children = [];
}

export function Tree(data) {
  let node = new Node(data);
  this._root = node;
}

// Depth First search
Tree.prototype.traverseDF = function (callback) {
  // this is a recurse and immediately-invoking function
  (function recurse(currentNode) {
    // step 2
    for (let i = 0, length = currentNode.children.length; i < length; i++) {
      // step 3
      recurse(currentNode.children[i]);
    }

    // step 4
    callback(currentNode);

    // step 1
  })(this._root);
};

// Breadth First search
Tree.prototype.traverseBF = function (callback) {
  let queue = new Queue();

  queue.enqueue(this._root);

  let currentTree = queue.dequeue();

  while (currentTree) {
    for (let i = 0, length = currentTree.children.length; i < length; i++) {
      queue.enqueue(currentTree.children[i]);
    }

    callback(currentTree);
    currentTree = queue.dequeue();
  }
};

Tree.prototype.contains = function (callback, traversal) {
  traversal.call(this, callback);
};

Tree.prototype.add = function (data, toData, traversal) {
  let child = new Node(data),
    parent = null,
    callback = function (node) {
      if (node.data === toData) {
        parent = node;
      }
    };

  this.contains(callback, traversal);

  if (parent) {
    parent.children.push(child);
    child.parent = parent;
  } else {
    throw new Error("Cannot add node to a non-existent parent.");
  }
};

// The following method filters tree based on the given searchAttribute and its attributeValue.
// tree = the root tree, searchAttribute = JS Object key, attributeValue = value of JS Object Key
export function filter(tree, searchAttribute, attributeValue) {
  const getNodes = (result, object) => {
    if (object.data[searchAttribute] === attributeValue) {
      result.push(object);
      return result;
    }
    if (Array.isArray(object.children)) {
      const children = object.children.reduce(getNodes, []);
      if (children.length) result.push({ ...object, children });
    }
    return result;
  };

  return tree.reduce(getNodes, []);
}

// The following method returns the children nodes of the given Node.
// tree = the root tree, searchAttribute = JS Object key, attributeValue = value of JS Object Key
export function filterChildren(tree, searchAttribute, attributeValue) {
  const getNodes = (result, object) => {
    if (object.data[searchAttribute] === attributeValue) {
      result.push(object);
      return result;
    }
    if (Array.isArray(object.children)) {
      const children = object.children.reduce(getNodes, []);
      if (children.length) {
        return children;
      }
    }
    return result;
  };
  return tree.reduce(getNodes, []);
}

// The following method returns the metadata of immediate children (in the form of a list) from the given Node.
export const fetchChildComponents = (targetNode) => {
  if (targetNode) {
    return targetNode
      .map((node) => node.children)
      .flat()
      .map(({ children, data }) => ({ children, data }));
  }
  return [];
};

// The following method returns the parent node of the given Node.
// tree = the root tree, searchAttribute = JS Object key, attributeValue = value of JS Object Key
export function filterParent(tree, searchAttribute, attributeValue) {
  const getNodes = (result, object) => {
    if (result) {
      return result;
    }
    if (object.data[searchAttribute] === attributeValue) {
      return true;
    }
    if (Array.isArray(object.children) && object.children.length) {
      let finalResult = object.children.reduce(getNodes, null);
      if (finalResult === true) {
        result = object;
        return result;
      } else {
        return finalResult;
      }
    }
  };
  return tree.reduce(getNodes, null);
}
