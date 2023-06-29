export class LRUCache<K, V> {
    private capacity: number;
    private cache: Map<K, Node<K, V>>;
    private head: Node<K, V> | null;
    private tail: Node<K, V> | null;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = new Map();
        this.head = null;
        this.tail = null;
    }

    private addToCache(key: K, value: V): void {
        const node = new Node(key, value);
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
        }
        this.cache.set(key, node);

        if (this.cache.size > this.capacity) {
            const removedNode = this.tail;
            this.removeNode(removedNode);
            this.cache.delete(removedNode.key);
        }
    }

    private updateNode(node: Node<K, V>): void {
        if (node === this.head) {
            return;
        }

        this.removeNode(node);
        node.next = this.head;
        this.head!.prev = node;
        this.head = node;
    }

    private removeNode(node: Node<K, V>): void {
        if (node.prev !== null) {
            node.prev.next = node.next;
        } else {
            this.head = node.next;
        }

        if (node.next !== null) {
            node.next.prev = node.prev;
        } else {
            this.tail = node.prev;
        }
    }

    get(key: K): V | undefined {
        if (this.cache.has(key)) {
            const node = this.cache.get(key)!;
            this.updateNode(node);
            return node.value;
        }
        return undefined;
    }

    set(key: K, value: V): void {
        if (this.cache.has(key)) {
            const node = this.cache.get(key)!;
            node.value = value;
            this.updateNode(node);
        } else {
            this.addToCache(key, value);
        }
    }

    remove(key: K): void {
        if (this.cache.has(key)) {
            const node = this.cache.get(key)!;
            this.removeNode(node);
            this.cache.delete(key);
        }
    }

}

export class Node<K, V> {
    key: K;
    value: V;
    next: Node<K, V> | null;
    prev: Node<K, V> | null;

    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
        this.next = null;
        this.prev = null;
    }
}