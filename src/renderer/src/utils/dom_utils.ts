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

const COMMON_KEYS = {
    F12: 'F12',
    ESCAPE: 'Escape',
    ENTER: 'Enter',
    TAB: 'Tab',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
};
/**
 * @description 在给定的元素上模拟按键
 * @param {HTMLElement} [element=document] 要在其上分派事件的元素
 * @param {string} key 要模拟按下的键
 * @param {KeyboardEventInit} [options] 事件的其他选项
 * 
 * @example simulateKeyPress(document, KEYS.ENTER);
 * @returns {void}
 */
// export function simulateKeyPress(element: HTMLElement = document, key: string, options?: KeyboardEventInit) {
//     const event = new KeyboardEvent('keydown', { key, ...options });
//     element.dispatchEvent(event);
// }

