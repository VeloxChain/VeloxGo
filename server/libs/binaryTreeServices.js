class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = this.right = null;
    }
};

class BinaryTreeServices {
    constructor(arrayData) {
        this.root = this.arrayToBinaryTree(arrayData, 0, arrayData.length - 1);
    }

    arrayToBinaryTree(arrayData, start, end) {
        if (start > end) {
            return null
        }
        let mid = Math.floor((end + start) / 2)
        let root = new TreeNode(arrayData[mid])
        root.left = this.arrayToBinaryTree(arrayData, start, mid - 1)
        root.right = this.arrayToBinaryTree(arrayData, mid + 1, end)
        return root
    }

    traverse() {
        this.traverseBinaryData(this.root);
    }

    traverseBinaryData(root) {
        console.log(root.val);
        if (root.left) {
            this.traverseBinaryData(root.left);
        }
        if (root.right) {
            this.traverseBinaryData(root.right);
        }
    };

    transferETHForAllNode() {
        if (root.left) {
            this.traverseBinaryData(root.left);
        }
        if (root.right) {
            this.traverseBinaryData(root.right);
        }
    }

    getLeafCount(node) {
        var count = 1;
        if (node == null)
            return 0;
        else {
            count += this.getLeafCount(node.left);
            count += this.getLeafCount(node.right);
            return count;
        }
    }

    getLevelOfNode(node, level, val) {
        if (node == null) {
            return 0;
        }

        if (node.val.address == val) {
            return level;
        }

        let result = getLevelOfNode(node.left, level + 1, val);

        if (result != 0) {
            return level;
        }

        result = getLevelOfNode(node.right, level + 1, val);

        return result;
    }
}

module.exports = BinaryTreeServices;