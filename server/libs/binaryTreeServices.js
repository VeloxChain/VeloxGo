
class TreeNode {
    constructor(val){
        this.val = val;
        this.left = this.right = null;
    }
};

class BinaryTreeServices {
    constructor(arrayData){
        this.root = this.arrayToBinaryTree(arrayData);
    }

    arrayToBinaryTree(arrayData) {
        function sortedArrayToBSTRec(arrays, start, end) {
            if (start > end) {
                return null
            }
            let mid = Math.floor((end + start) / 2)
            let root = new TreeNode(arrayData[mid])
            root.left = sortedArrayToBSTRec(arrayData, start, mid - 1)
            root.right = sortedArrayToBSTRec(arrayData, mid + 1, end)
            return root
        }
        return sortedArrayToBSTRec(arrayData, 0, arrayData.length - 1)
    }

    traverse(){
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

    transferETHForAllNode(){
        if (root.left) {
            this.traverseBinaryData(root.left);
        } 
        if (root.right) {
            this.traverseBinaryData(root.right);
        }
    }

    getLevelOfNode(node, level, val){
        if(node == null) {
            return 0;
        }
        
        if(node.val.address == val){
            return level;
        }
        
        let result = getLevelOfNode(node.left, level+1, val);
        
        if(result != 0){
            return level;
        }
        
        result = getLevelOfNode(node.right, level+1, val);
        
        return result;
    }
}

module.exports = BinaryTreeServices;
