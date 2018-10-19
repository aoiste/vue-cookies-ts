# vue-cookies-ts

A simple Vue.js plugin for handling browser cookies

## Installation

```bash
npm install vue-cookies-ts --save
```

```ts
import Vue from "vue"
import VueCookies from "vue-cookies-ts"

Vue.use(VueCookies)
```

## Api

syntax format: **[this | Vue | window].$cookies.[method]**

### config

Set global config

```ts
(option: CookiesOption) => void

//example

this.$cookies.config({
    expires?: string | number | Date,
    path?: string,
})  // default: expireTimes = 1d , path=/
```

### set

Set a cookie

```ts
(key: string, value: any, option: CookiesOption) => VueCookies

//example

this.$cookies.set(keyName: string, {
    expires?: string | number | Date,
    path?: string,
    domain?: string,
    secure?: boolean
}) 
```

### get

Get a cookie

```ts
(key: string) => string | null | object

//example

this.$cookies.get(keyName: string)
```

### remove

Remove a cookie

```ts
(key: string, option: CookiesOption) => VueCookies | boolean

//example

this.$cookies.remove(keyName: string, {path: string, domain: string})
```

### isKey

If exist a `cookie name`

```ts
(key: string) => boolean

//example

this.$cookies.isKey(keyName: string)
```

### keys

Get All `cookie name`

```ts
() => string[]

//example

this.$cookies.keys()
```

## Example Usage

#### Set global config

```js
// 30 day after, expire
this.$cookies.config({ expires: "30d" })

this.$cookies.config({ expires: new Date(2019,03,13).toUTCString() })

// 30 day after, expire, '' current path , browser default
this.$cookies.config({ expires: 60 * 60 * 24 * 30, path: "" })

// window object
window.$cookies.config({ expires: "30d" })
```

#### Support json object

```js
var user = { id:1, name:'Journal', session:'25j_7Sl6xDq2Kc3ym0fmrSSk2xV2XkUkX' }

this.$cookies.set('user', user)

// print user name
console.log(this.$cookies.get('user').name)
```

#### Set expire times

**Suppose the current time is : Sat, 11 Mar 2017 12:25:57 GMT**

**Following equivalence: 1 day after, expire**

**Support chaining sets together**

``` javascript
 // default expire time: 1 day
this.$cookies
        .set("user_session", "25j_7Sl6xDq2Kc3ym0fmrSSk2xV2XkUkX")
        // number + d , ignore case
        .set("user_session", "25j_7Sl6xDq2Kc3ym0fmrSSk2xV2XkUkX", { expires: "1d" })
        .set("user_session", "25j_7Sl6xDq2Kc3ym0fmrSSk2xV2XkUkX", { expires: "1D" })
        // Base of second
        .set("user_session", "25j_7Sl6xDq2Kc3ym0fmrSSk2xV2XkUkX", { expires: 60 * 60 * 24 })
        // input a Date, + 1day
        .set("user_session", "25j_7Sl6xDq2Kc3ym0fmrSSk2xV2XkUkX", { expires: new Date(2017, 03, 12) })
        // input a date string, + 1day
        .set("user_session", "25j_7Sl6xDq2Kc3ym0fmrSSk2xV2XkUkX", { expires: "Sat, 13 Mar 2017 12:25:57 GMT" })
```

#### Set expire times, input number type

```js
// 1 second after, expire
this.$cookies.set("default_unit_second", "input_value", { expires: 1 })

// 1 minute 30 second after, expire
this.$cookies.set("default_unit_second", "input_value", { expires: 60 + 30 })

// 12 hour after, expire
this.$cookies.set("default_unit_second", "input_value", { expires: 60 * 60 * 12 })

// 1 month after, expire
this.$cookies.set("default_unit_second", "input_value", { expires: 60 * 60 * 24 * 30 })
```

#### Set expire times - end of browser session

```js
// end of session - use string!
this.$cookies.set("default_unit_second", "input_value", { expires: "0" })
```

#### Set expire times , input string type

| Unit   | full name |
| ----------- | ----------- |
| y           |  year       |
| m           |  month      |
| d           |  day        |
| h           |  hour       |
| min         |  minute     |
| s           |  second     |

**✔ caseless for unit**

**❌ combination not supported**

**❌ double value not supported**

```js
// 60 second after, expire
this.$cookies.set("token","GH1.1.1689020474.1484362313", { expires: "60s" })

// 30 minute after, expire, ignore case
this.$cookies.set("token","GH1.1.1689020474.1484362313", { expires: "30min" })

// 24 day after, expire
this.$cookies.set("token","GH1.1.1689020474.1484362313", { expires: "24d" })

// 4 month after, expire
this.$cookies.set("token","GH1.1.1689020474.1484362313", { expires: "4m" })

// 16 hour after, expire
this.$cookies.set("token","GH1.1.1689020474.1484362313", { expires: "16h" })

// 3 year after, expire
this.$cookies.set("token","GH1.1.1689020474.1484362313", { expires: "3y" })

// input date string 
this.$cookies.set('token',"GH1.1.1689020474.1484362313", { expires: new Date(2017,03,13).toUTCString() })

this.$cookies.set("token","GH1.1.1689020474.1484362313", { expires: "Sat, 13 Mar 2017 12:25:57 GMT " })
```

#### Set expire support date

```js
var date = new Date

date.setDate(date.getDate() + 1)

this.$cookies.set("token","GH1.1.1689020474.1484362313", { expires: date })
```

#### Set never expire

```js
// never expire
this.$cookies.set("token","GH1.1.1689020474.1484362313", { expires: Infinity })

// never expire , only -1,Other negative Numbers are invalid
this.$cookies.set("token","GH1.1.1689020474.1484362313", { expires: -1 }) 
```

#### Set other arguments

```js
// set path
this.$cookies.set("use_path_argument","value", { expires: "1d", path: "/app" })

// set domain, default 1 day after,expire
this.$cookies.set("use_path_argument","value", { domain: "domain.com" })

// set secure
this.$cookies.set("use_path_argument","value", { secure: true })
```

#### Other operation

```js
// check a cookie exist
this.$cookies.isKey("token")

// get a cookie
this.$cookies.get("token")

// remove a cookie
this.$cookies.remove("token")

// get all cookie key names, line shows
this.$cookies.keys().join("\n") 

// vue-cookies global
[this | Vue].$cookies.[method] 
```

## Warning

**`$cookies` key names Cannot be set to `['expires','max-age','path','domain','secure']`**

## Explaination

**[vue-cookies-ts](https://github.com/ztytotoro/vue-cookies-ts) is developed from [vue-cookies](https://github.com/cmp-cc/vue-cookies) without dependencies, It can exist independently, Friendly to [vuejs](https://github.com/vuejs/vue)**

## License
[MIT](http://opensource.org/licenses/MIT)
Copyright (c) 2016-present, ztytotoro
