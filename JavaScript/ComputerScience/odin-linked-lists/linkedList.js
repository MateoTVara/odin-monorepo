class Node {
  constructor(value) {
    this.value = value;
    this.nextNode = null;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  append(value) {
    const node = new Node(value);

    if (!this.head){
      this.head = node;
    } else {
      let current = this.head;
      while(current.nextNode) {
        current = current.nextNode;
      }
      current.nextNode = node;
    }

    this.size += 1;
  }

  prepend(value) {
    const node = new Node(value);

    let currentState = this.head;

    this.head = node;
    this.head.nextNode = currentState;

    this.size += 1;
  }

  getSize() {
    return this.size;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    let current = this.head;
    while(current.nextNode) {
      current = current.nextNode;
    }
    return current;
  }

  at(index) {
    if (!this.head) return undefined;
    if (index < 0 || index >= this.size) return undefined;
    if (index === 0) return this.head;
    let i = 0;
    let current = this.head;
    while (current.nextNode) {
      i += 1;
      current = current.nextNode;
      if (index === i) {
        return current;
      }
    }
    return undefined;
  }

  pop() {
    const toPop = this.at(this.size - 2);
    toPop.nextNode = null;
    this.size -= 1;
  }

  contains(value) {
    let current = this.head;
    if (current.value === value) return true
    while(current.nextNode) {
      current = current.nextNode;
      if(current.value === value) return true
    }
    return false
  }

  find(value) {
    let i = 0;
    if (!this.head) return undefined;
    if (this.head.value === value) return i;
    let current = this.head;
    while(current.nextNode) {
      current = current.nextNode;
      i += 1;
      if (current.value === value) return i;
    }
    return undefined;
  }

  toString() {
    let current = this.head;
    let string = `${this.head.value}`;
    while(current.nextNode) {
      current = current.nextNode;
      string = `${string} -> ${current.value}`;
    }
    string = `${string} -> null`;

    return string;
  }

  insertAt(value, index){
    const node = new Node(value);

    const currentState = this.at(index-1);
    
    if (index === 0) {
      node.nextNode = this.head;
      this.head = node;
      this.size += 1;
      return;
    }
    
    const nextCurrentState = currentState.nextNode;

    currentState.nextNode = node;
    node.nextNode = nextCurrentState || null;
    this.size += 1;
  }

  removeAt(index){
    if (!this.head || index < 0 || index >= this.size) return;

    if(index === 0){
      this.head = this.head.nextNode;
      this.size -= 1;
      return;
    }

    const prev = this.at(index-1);
    if (!prev || !prev.nextNode) return;

    const toRemove = prev.nextNode;
    prev.nextNode = toRemove.nextNode;
    this.size -= 1;
  }
}

// const list = new LinkedList();

// list.append(10);
// list.append(20);
// list.append(30);

// list.prepend(40);

// console.dir(list, { depth: null });

// console.log("Size:")
// console.log(list.getSize());

// console.log("Head:");
// console.log(list.getHead());

// console.log("Tail:");
// console.log(list.getTail());

// console.log("At 0:")
// console.log(list.at(0));

// list.pop();
// console.dir(list, { depth: null });

// console.log(list.contains(40));
// console.log(list.contains(23));

// console.log(list.find(30));

// console.log(list.toString());

// list.insertAt(50, 3);

// console.dir(list, { depth: null });
// console.log(list.toString());

// list.removeAt(2);

// console.dir(list, { depth: null});
// console.log(list.toString());