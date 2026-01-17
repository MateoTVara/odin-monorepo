import { LinkedList } from "../odin-linked-lists/linkedList.js"

export class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.map = new Array(capacity).fill(null).map(() => new LinkedList());
    this.capacity = capacity;
    this.initialCapacity = capacity;
    this.loadFactor = loadFactor;
    this.size = 0;
  }



  /**
   * Generate a hash code for a given key.
   * @param {string} key - The key to hash.
   * @returns {number} The generated hash code.
   */
  #hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }



  /**
   * Resize the hashmap by either doubling or halving its capacity.
   * @param {Object} param0
   * @param {'double' | 'divide'} param0.ope - The operation to perform ('double' or 'divide').
   */
  #resize({ ope = 'double' } = {}){
    if (ope === 'double') {
      this.capacity *= 2;
    } else if (ope === 'divide') {
      this.capacity /= 2;
    }
    const currentMap = this.map;
    this.map = new Array(this.capacity).fill(null).map(() => new LinkedList());
    this.size = 0;

    for (const bucket of currentMap) {
      let current = bucket.head;
      while(current){
        this.set(current.value.key, current.value.value);
        current = current.nextNode;
      }
    }
  }



  /**
   * Get the bucket (linked list) at the index determined by the hash of the key.
   * @param {string} key - The key to find the bucket for.
   * @returns {LinkedList} The linked list (bucket) at the calculated index.
   */
  #getBucketAt(key) {
    const index = this.#hash(key) % this.capacity;
    return this.map[index];
  }



  /**
   * Iterate over the elements in a bucket and apply a callback function.
   * @param {LinkedList} bucket - The bucket (linked list) to iterate over.
   * @param {Function} cb - The callback function to apply to each element.
   * @returns {any} The result of the callback function, if defined.
   */
  #iterateOverBucket(bucket, cb) {
    let current = bucket.head;

    while (current) {
      const res = cb(current);
      if (res !== undefined) return res;
      current = current.nextNode;
    }

    return undefined;
  }



  /**
   * Set a key-value pair in the hashmap. If the key already exists, update its value.
   * @param {string} key - The key to set.
   * @param {any} value - The value to associate with the key.
   */
  set(key, value) {
    const bucket = this.#getBucketAt(key);

    const found = this.#iterateOverBucket(bucket, (current) => {
      if (current.value && current.value.key === key) {
        current.value.value = value;
        return true;
      }
    });

    if (found) return;

    bucket.append({key, value});
    this.size++;

    if (this.size > this.capacity * this.loadFactor){
      this.#resize();
    }
  }



  /**
   * Get the value associated with a key in the hashmap.
   * @param {string} key - The key to retrieve the value for.
   * @returns {any} The value associated with the key, or null if not found.
   */
  get(key) {
    const bucket = this.#getBucketAt(key);

    const found = this.#iterateOverBucket(bucket, (current) =>{
      if(current.value.key === key) return current.value.value;
    });

    if (found) return found;

    return null
  }



  /**
   * Check if a key exists in the hashmap.
   * @param {string} key - The key to check for existence.
   * @returns {boolean} True if the key exists, false otherwise.
   */
  has(key) {
    const bucket = this.#getBucketAt(key);

    const found = this.#iterateOverBucket(bucket, (current) => {
      if (current.value.key === key) return true; 
    });

    return found === true;
  }



  /**
   * Remove a key-value pair from the hashmap.
   * @param {string} key - The key to remove.
   */
  remove(key) {
    const bucket = this.#getBucketAt(key);

    const found = this.#iterateOverBucket(bucket, current => {
      if (current.value.key === key) return current.value;
    });

    const index = bucket.find(found);
    bucket.removeAt(index);
    this.size--;

    if (this.size <= this.capacity * this.loadFactor) {
      this.#resize({ope : 'divide'});
    }

    if (found) return true;
    return false;
  }


  
  /**
   * Get the current number of key-value pairs in the hashmap.
   * @returns {number} The number of key-value pairs in the hashmap.
   */
  length() {
    return this.size;
  }



  /**
   * Clear all key-value pairs from the hashmap and reset its capacity to the initial value.
   */
  clear() {
    this.map = Array(this.initialCapacity).fill(null).map(() => new LinkedList());
    this.capacity = this.initialCapacity;
    this.size = 0;
  }



  /**
   * Get an array of all keys in the hashmap.
   * @returns {string[]} An array of all keys in the hashmap.
   */
  keys() {
    const keys = [];
    for (const bucket of this.map) {
      let current = bucket.head;
      while(current){
        keys.push(current.value.key);
        current = current.nextNode;
      }
    }
    return keys;
  }



  /**
   * Get an array of all values in the hashmap.
   * @returns {any[]} An array of all values in the hashmap.
   */
  values() {
    const values = [];
    for (const bucket of this.map) {
      let current = bucket.head;
      while(current) {
        values.push(current.value.value);
        current = current.nextNode;
      }
    }
    return values;
  }



  /**
   * Get an array of all key-value pairs in the hashmap.
   * @returns {Object[]} An array of all key-value pairs in the hashmap, each represented as an object with 'key' and 'value' properties.
   */
  entries() {
    const entries = [];
    for (const bucket of this.map) {
      let current = bucket.head;
      while(current) {
        const key = current.value.key;
        const value = current.value.value;
        entries.push({key, value});
        current = current.nextNode;
      }
    }
    return entries;
  }
}

const test = new HashMap();

test.set("rabbit", "white");
console.dir(test, { depth: null });

test.set("rabbit", "black");
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');
console.dir(test, { depth: null });

console.dir(test.get("apple"), { depth: null });

console.dir(test.has("bjork"), { depth: null });

console.dir(test.remove("apple"), { depth: null});
console.dir(test.remove("rabbit"), { depth: null});

console.dir(test, { depth: null });

console.dir(test.keys(), {depth: null});

console.dir(test.values(), {depth: null});

console.dir(test.entries(), {depth: null});

// test.clear();
// console.dir(test, { depth: null });