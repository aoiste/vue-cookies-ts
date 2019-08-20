import '../types/vue';
import cookies from 'cookies-ts';

import _Vue from 'vue';

export { CookiesOption, Cookies } from 'cookies-ts';

export default {
  install(Vue: typeof _Vue) {
    const vueCookies = new cookies();
    Vue.prototype.$cookies = vueCookies;
    (Vue as any).cookies = vueCookies;
  }
};
