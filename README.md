# Nuxt HTTP Preset

A Nuxt module to manage and simplify HTTP requests across multiple APIs and endpoints.

## ✨ Get started

1. Install and add to Nuxt with one command

```sh
npm install nuxt-http-preset
```
## Usage Example

```html
<template>
  <div>
    <p>{{ data }}</p>
  </div>
</template>

<script setup>
const data = ref()

# adds a new endpoint
useHttp().add('ddd', {
  baseURL: 'https://brasilapi.com.br/api/ddd/v1',
})

# makes a request to the "ddd" endpoint using its settings
useHttp().request('ddd').fetch('47').then((res) => {
  data.value = res
})
</script>
```
endpoints are linked globally and can be accessed from anywhere

## 📖 Docs

### useHttp().add()
adds a new endpoint

```bash
useHttp().add('closeApi', {
  baseURL: 'localhost:9000/api',
  headers: {
    authorization: 'yout-token-from-acess',
  },
})
```
you can configure default parameters as available in [$fetch](https://nuxt.com/docs/api/utils/dollarfetch)


### useHttp().request()
uses an available endpoint
```bash
useHttp().request('closeApi').fetch('verifySession', {
  method: 'POST',
}).catch((err) => {
  if (err.code == 401) {
    navigateTo('/')
    console.log('session expired')
  }
})
```


### useHttp().endpoints()
list available endpoints
```bash
# Return: [ "ddd", "closeApi" ]
console.log(useHttp().endpoints)
```
### Adding endpoints by  [app.config.ts](https://nuxt.com/docs/guide/directory-structure/app-config)
If you want to define an endpoint in a fixed way in your project, you can add it directly through "app.config.ts", this way the endpoint is defined as soon as the module is instantiated

```bash
# app.config.ts
export default defineAppConfig({
  http: {
    endpoints: [
      { name: 'example',
        fetchOptions: {
          baseURL: 'https://api.example.com',
        },
      },
      { name: 'another',
        fetchOptions: {
          baseURL: 'https://api.another.com',
        },
      },
    ],
  },
})
```
