# shiny-tree
Tree Data Structure and methods to efficiently handle complex hierarchical structures of JS Objects.
The shiny-tree lets you create a Dynamic Tree from a list of Objects. Then, you can do the basic tree operations, such as BFS, DFS, node presence check, and add child node.
Also, there are following methods that let you efficiently traverse, filter, and fetch desired set of nodes from the tree.

<h2>filter</h2>

This method filters the tree based on the given searchAttribute and its attributeValue.

<h2>filterChildren</h2>

This method returns the children nodes of the given Node.

<h2>fetchChildComponents</h2>

This method returns the metadata of immediate children (in the form of a list) from the given Node.

<h2>filterParent</h2>

This method returns the immediate parent node of the given Node.
