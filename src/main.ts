interface CookiesOption {
    expires?: string | number | Date,
    path?: string,
    domain?: string,
    secure?: boolean
}

interface VueCookies {
    config: (option: CookiesOption) => void;
    get: (key: string) => string | null | object;
    set: (key: string, value: any, option: CookiesOption) => VueCookies;
    remove: (key: string, option: CookiesOption) => VueCookies | boolean;
    isKey: (key: string) => boolean;
    keys: () => string[];
}

const DEFAULT_CONFIG: CookiesOption = {
    expires: "1d",
    path: "; path=/"
}

const vueCookies: VueCookies = {
    config(option: CookiesOption) {
        if (option.expires) {
            DEFAULT_CONFIG.expires = option.expires;
        }
        if (option.path === "") {
            DEFAULT_CONFIG.path = ""
        } else {
            DEFAULT_CONFIG.path = "; path=" + option.path;
        }
    },

    get(key: string) {
        let value = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

        if (value && value.startsWith("{") && value.endsWith("}")) {
            try {
                value = JSON.parse(value);
            } catch (e) {
                return value;
            }
        }
        return value;
    },

    set(key: string, value: any, option: CookiesOption = {}) {
        if (!key) {
            throw new Error("cookie name is not find in first argument")
        } else if (/^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
            throw new Error("cookie key name illegality ,Cannot be set to ['expires','max-age','path','domain','secure']\tcurrent key name: " + key);
        }

        // support json object
        if (value && value.constructor === Object) {
            value = JSON.stringify(value);
        }

        let _expires = "; max-age=86400"; // temp value, default expire time for 1 day
        let expires = option.expires || DEFAULT_CONFIG.expires;
        if (expires) {
            switch (expires.constructor) {
                case Number:
                    if (expires === Infinity || expires === -1) _expires = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
                    else _expires = "; max-age=" + expires;
                    break;
                case String:
                    if (/^(?:\d{1,}(y|m|d|h|min|s))$/i.test(expires as string)) {
                        // get capture number group
                        let _expireTime = (expires as string).replace(/^(\d{1,})(?:y|m|d|h|min|s)$/i, "$1");
                        // get capture type group , to lower case
                        switch ((expires as string).replace(/^(?:\d{1,})(y|m|d|h|min|s)$/i, "$1").toLowerCase()) {
                            // Frequency sorting
                            case 'm': _expires = "; max-age=" + +_expireTime * 2592000; break; // 60 * 60 * 24 * 30
                            case 'd': _expires = "; max-age=" + +_expireTime * 86400; break; // 60 * 60 * 24
                            case 'h': _expires = "; max-age=" + +_expireTime * 3600; break; // 60 * 60
                            case 'min': _expires = "; max-age=" + +_expireTime * 60; break; // 60
                            case 's': _expires = "; max-age=" + _expireTime; break;
                            case 'y': _expires = "; max-age=" + +_expireTime * 31104000; break; // 60 * 60 * 24 * 30 * 12
                            default: new Error("unknown exception of 'set operation'");
                        }
                    } else {
                        _expires = "; expires=" + expires;
                    }
                    break;
                case Date:
                    _expires = "; expires=" + (expires as Date).toUTCString();
                    break;
            }
        }
        document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value) + _expires + (option.domain ? "; domain=" + option.domain : "") + (option.path ? "; path=" + option.path : DEFAULT_CONFIG.path) + (option.secure ? "; secure" : "");
        return this;
    },

    remove(key: string, option: CookiesOption = {}) {
        if (!key || !this.isKey(key)) {
            return false;
        }
        document.cookie = encodeURIComponent(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (option.domain ? "; domain=" + option.domain : "") + (option.path ? "; path=" + option.path : DEFAULT_CONFIG.path);
        return this;
    },

    isKey(key: string) {
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },

    keys() {
        if (!document.cookie) return [];
        var _keys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var _index = 0; _index < _keys.length; _index++) {
            _keys[_index] = decodeURIComponent(_keys[_index]);
        }
        return _keys;
    }
}

export default {
    install(Vue: any) {
        Vue.prototype.$cookies = vueCookies
        Vue.cookies = vueCookies
    }
}