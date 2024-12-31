// 3. 使用 TS 
// 缺点: 
// 1. 编译后的代码，没有private
// 2. 使用动态属性也能访问

class A {
  private key = 1;
}

const a = new A();
console.log(a.key); // error
console.log(a['key']);