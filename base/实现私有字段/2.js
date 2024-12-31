// 2. 使用 symbol, 不导出key
// 缺点：也能通过 getOwnPropertySymbols 获取 key 来访问

const key = Symbol('key');
export class B {
  [key] = 1;
  m(){
    console.log(this[key])
  }
}