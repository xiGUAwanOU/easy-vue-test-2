import _ from "lodash";
import Vue, { VueConstructor } from "vue";

export default function cloneVue(originalVue: any): VueConstructor<Vue> {
  // _.cloneDeep won't work for Vue instance.
  // This implementation is simply stolen from the official vue-test-utils.
  // See https://github.com/vuejs/vue-test-utils/blob/dev/packages/test-utils/src/create-local-vue.js
  const clonedVue: any = originalVue.extend();

  Object.keys(originalVue).forEach((key) => {
    if (!clonedVue.hasOwnProperty(key)) {
      const original = originalVue[key];
      try {
        clonedVue[key] = typeof original === "object"
          ? _.cloneDeep(original)
          : original;
      } catch (e) {
        clonedVue[key] = original;
      }
    }
  });

  clonedVue.config = _.cloneDeep(originalVue.config);
  clonedVue.config.errorHandler = originalVue.config.errorHandler;
  clonedVue.config.optionMergeStrategies = originalVue.config.optionMergeStrategies;
  clonedVue.options._base = clonedVue;

  if (clonedVue._installedPlugins && clonedVue._installedPlugins.length) {
    clonedVue._installedPlugins.length = 0;
  }
  const use = clonedVue.use;
  clonedVue.use = (plugin: any, ...rest: any[]) => {
    if (plugin.installed === true) {
      plugin.installed = false;
    }
    if (plugin.install && plugin.install.installed === true) {
      plugin.install.installed = false;
    }
    use.call(clonedVue, plugin, ...rest);
  };

  return clonedVue;
}
