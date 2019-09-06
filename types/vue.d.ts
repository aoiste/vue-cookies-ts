import { Cookies } from 'cookies-ts';
import Vue, { VueConstructor } from 'vue';

declare module 'vue/types/vue' {
  interface Vue {
    $cookies: Cookies;
  }
  interface VueConstructor {
    cookies: Cookies;
  }
}
