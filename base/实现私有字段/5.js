// 5. babel #key私有字段 降级方案
const privateFields  = new WeakMap();

class A {
  constructor() {
    privateFields.set(this, {
      name: 'A'
    });
  }

  getName() {
    return privateFields.get(this).name;
  }
}

const a = new A();
console.log(a.getName()); // A
