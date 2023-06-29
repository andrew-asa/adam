import { LRUCache } from "../LRUCache";

const cache = new LRUCache<number, string>(3);
cache.set(1, 'data 1');
cache.set(2, 'data 2');
cache.set(3, 'data 3');

console.log(cache.get(2)); // 输出：data 2

cache.set(4, 'data 4'); // 引起淘汰，将最旧的数据 'data 1' 删除

console.log(cache.get(1)); // 输出：undefined
console.log(cache.get(2)); // 输出：data 2
console.log(cache.get(3)); // 输出：data 3
console.log(cache.get(4)); // 输出：data 4

cache.remove(4); // 移除键为 4 的键值对

console.log(cache.get(4)); // 输出：undefined