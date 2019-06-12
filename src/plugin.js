/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-underscore-dangle */

import mixin from './mixin';
import Livr from './livr';
import { setValidator } from './state';
import { setConfig, getConfig } from './config';

let Vue;

export let pluginInstance;

class LivrPlugin {
  constructor(config, _Vue) {
    this.configure(config);
    pluginInstance = this;
    if (_Vue) {
      Vue = _Vue;
    }

    this.livrInstance = setValidator(new Livr(null, this.config));
    this.initVM(this.config);
  }

  static install(_Vue, options = {}) {
    if (Vue && _Vue === Vue) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('already installed, Vue.use(LivrPlugin) should only be called once.');
      }
      return;
    }

    Vue = _Vue;

    pluginInstance = new LivrPlugin(options);
    Livr.$livr = pluginInstance;

    Vue.mixin(mixin);
  }

  initVM({ errorBagName, fieldsBagName }) {
    this._vm = new Vue({
      data: () => ({
        [errorBagName]: this.livrInstance.errors,
        [fieldsBagName]: this.livrInstance.fields,
      }),
    });
  }

  configure(cfg) {
    setConfig(cfg);
  }

  get config() {
    return getConfig();
  }

  static get config() {
    return getConfig();
  }

  static get instance() {
    return pluginInstance;
  }
}

export default LivrPlugin;
