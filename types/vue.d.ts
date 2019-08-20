import { Cookies } from './main';
import Vue, { VueConstructor } from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $cookies: Cookies;
  }
  interface VueConstructor {
    cookies: Cookies;
  }
}
