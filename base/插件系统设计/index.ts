import { App } from './app.js'
import { PluginA } from './plugins/pluginA.js';

const app = new App();

app.use(new PluginA())

// app.getPlugin('PluginA')?.testFn1();
// app.getPlugin('PluginA')?.disable();
app.getPlugin('pluginA')?.destroy();