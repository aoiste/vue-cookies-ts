import cookies, { CookiesOption, Cookies } from "cookies-ts";

export {
    CookiesOption,
    Cookies
}

export default {
    install(Vue: any) {
        Vue.prototype.$cookies = new cookies()
        Vue.cookies = new cookies()
    }
}