import Vue, { VueConstructor } from 'vue';
import { Cookies } from './index';

declare module 'vue/types/vue' {
  interface Vue {
    $cookies: Cookies;
  }
  interface VueConstructor {
    cookies: Cookies;
  }
}
