let objectTree = null;

// rootAttributeName = key of the designated root in the objList, rootAttributeValue = value to match for the rootAttributeName in the objList
export function createTree(objList, rootAttributeName, rootAttributeValue) {
  Object.values(objList).forEach((attribute) => {
    if (
      objectTree === null &&
      attribute[rootAttributeName] === rootAttributeValue
    ) {
      objectTree = new Tree(attribute);
      return;
    } else if (attribute.toData === null) {
      return;
    } // toData = reference to the parent Node's attributeName to attach the child node, e.g., parentItemId.
    objectTree.add(attribute, objList[attribute.toData], objectTree.traverseBF);
  });
  return objectTree;
}
