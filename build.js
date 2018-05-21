"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = parseNodes;
function parseNodes() {
    var selection = window.getSelection() || window.document.getSelection();
    var isEmpty = selection.focusOffset === selection.anchorOffset;

    if (isEmpty) {
        return [];
    }

    var range = selection.getRangeAt(0);
    var rootNode = range.commonAncestorContainer;
    var startNode = range.startContainer;
    var endNode = range.endContainer;
    var startOffset = range.startOffset;
    var endOffset = range.endOffset;
    var parsedNodes = [];
    var pastStartNode = false;
    var reachedEndNode = false;
    var element = null;

    function parse(node) {
        var val = node.nodeValue;
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

        for (var i = 0, len = node.childNodes.length; i < len && !reachedEndNode; i++) {
            if (node) {
                parse(node.childNodes[i]);
            }
        }
    }

    parse(rootNode);
    return parsedNodes;
}
