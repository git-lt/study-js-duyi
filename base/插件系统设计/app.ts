import { Plugin } from './types'

export class App {
  private installedPlugins: Map<string, Plugin> = new Map();

  public use(plugin: Plugin, ...options: any[]): this{
    if(!this.installedPlugins.has(plugin.name)){
      this.installedPlugins.set(plugin.name, plugin);
      plugin.install(this, ...options);
    }

    return this;
  }
  public getPlugin(pluginName: string) {
    return this.installedPlugins.get(pluginName)
  }

  public getPlugins<T extends Plugin>(pluginNames: string[]) {
    return pluginNames.map(name => this.installedPlugins.get(name))
  }

  getPluginList(plugins: string | string[]){
    if(Array.isArray(plugins)){
      return this.getPlugins(plugins);
    }
    const res = this.getPlugin(plugins);
    return [res]
  }

  public enablePlugin(plugins: string | string[]){
    const pluginList = this.getPluginList(plugins);
    pluginList?.forEach(plugin => {
        plugin?.enable?.();
    });
  }

  public disablePlugin(plugins: string | string[]){
    const pluginList = this.getPluginList(plugins);
    pluginList?.forEach(plugin => {
        plugin?.disable?.();
    });
  }

  public destroyPlugin(plugins: string | string[]){
    const pluginList = this.getPluginList(plugins);
    pluginList?.forEach(plugin => {
        plugin?.destroy?.();
    });
  }
}