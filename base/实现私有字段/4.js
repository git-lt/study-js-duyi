// 4. 使用ES2022(ES13) 私有属性
class A {
  #key = 1;
  m(){
    console.log(this.#key)
  }
}

const a = new A()
// console.log(a.#key)
console.log(a.m()) // 1
