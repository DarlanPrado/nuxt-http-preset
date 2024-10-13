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

[details useHttp().add()
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
]

[details useHttp().request()
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
]

[details useHttp().endpoints()
list available endpoints
```bash
# Return: [ "ddd", "closeApi" ]
console.log(useHttp().endpoints)
```
]
