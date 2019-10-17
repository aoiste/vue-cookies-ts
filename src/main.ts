import cookies from 'cookies-ts';
import Vue from 'vue';

export { CookiesOption, Cookies } from 'cookies-ts';

export default {
  install(_Vue: typeof Vue) {
    const vueCookies = new cookies();
    _Vue.prototype.$cookies = vueCookies;
    (_Vue as any).cookies = vueCookies;
  }
};
