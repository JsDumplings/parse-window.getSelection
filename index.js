export default function parseNodes() {
    const selection = window.getSelection() || window.document.getSelection();
    const isEmpty = selection.focusOffset === selection.anchorOffset;

    if (isEmpty) {
        return [];
    }

    const range = selection.getRangeAt(0);
    const rootNode = range.commonAncestorContainer;
    const startNode = range.startContainer;
    const endNode = range.endContainer;
    const startOffset = range.startOffset;
    const endOffset = range.endOffset;
    const parsedNodes = [];
    let pastStartNode = false;
    let reachedEndNode = false;
    let element = null;

    function parse(node) {
        const val = node.nodeValue;
        if (node === startNode && startNode === endNode) {
            if (val) {
                parsedNodes.push({
                    parentNode: node.parentNode,
                    isPartial: val !== val.substring(startOffset, endOffset),
                    text: val.substring(startOffset, endOffset)
                });
            }

            pastStartNode = reachedEndNode = true;
        } else if (node === startNode) {
            if (val) {
                parsedNodes.push({
                    parentNode: node.parentNode,
                    isPartial: val !== val.substring(startOffset),
                    text: val.substring(startOffset)
                });
            }

            pastStartNode = true;
        } else if (node === endNode) {
            if (val) {
                parsedNodes.push({
                    parentNode: node.parentNode,
                    isPartial: val !== val.substring(0, endOffset),
                    text: val.substring(0, endOffset)
                });
            }

            reachedEndNode = true;
        } else if (node.nodeType === 3) {
            if (val && pastStartNode && !reachedEndNode) {
                parsedNodes.push({
                    parentNode: node.parentNode,
                    isPartial: false,
                    text: val
                });
            }
        }

        for (
            let i = 0, len = node.childNodes.length;
            i < len && !reachedEndNode;
            i++
        ) {
            if (node) {
                parse(node.childNodes[i]);
            }
        }
    }

    parse(rootNode);
    return parsedNodes;
}
