import cookies from 'cookies-ts';
import _Vue from 'vue';
import './vue';

export { CookiesOption, Cookies } from 'cookies-ts';

declare const _default: {
  install(Vue: import('vue').VueConstructor<_Vue>): void;
};

export default _default;
