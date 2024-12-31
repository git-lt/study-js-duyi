import { Plugin } from '../types'

export class PluginA implements Plugin {
  private  _enable = false;
  public name = 'pluginA';
  public version = '1.0.0';
  public description = '插件A';

  public app: any;
  public options = [] as  any[];

  install(app: any, ...options: any[]) {
    this._enable = true;
    this.app = app;
    this.options = options;
    console.log(`${this.name} 安装了`)
  }
  destroy() {
    this._enable = false;
    console.log(`${this.name} 卸载了`)
  }
  enable() {
    this._enable = true;
    console.log(`${this.name} 启用了`)
  }
  disable() {
    this._enable = false;
    console.log(`${this.name} 禁用了`)
  }
  isEnabled(): boolean {
    return this._enable;
  }
  
  // 插件自定义的方法
  testFn1() {
    console.log('pluginA testFn1');
  }
}