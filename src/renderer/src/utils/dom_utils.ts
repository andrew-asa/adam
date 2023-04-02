/**
 * @description 获取最后一个文本节点
 * @param dom DOM节点
 */
export function getLastTextNode(dom) {
    const children = dom.childNodes;
    for (let i = children.length - 1; i >= 0; i--) {
        const node = children[i]
        if (node.nodeType === Node.TEXT_NODE && /\S/.test(node.nodeValue)) {
            // node.nodeValue = node.nodeValue.replace(/\s+$/, '')
            return node
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            const last = getLastTextNode(node)
            if (last) {
                return last
            }
        }
    }
    return null;
}