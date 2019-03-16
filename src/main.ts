import cookies, { CookiesOption, Cookies } from "cookies-ts";

export {
    CookiesOption,
    Cookies
}

export default {
    install(Vue: any) {
        Vue.prototype.$cookies = cookies
        Vue.cookies = cookies
    }
}