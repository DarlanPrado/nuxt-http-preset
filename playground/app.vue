<template>
  <div>
    <p>{{ data }}</p>
  </div>
</template>

<script setup>
const data = ref()

// adds a new endpoint
useHttp().add('ddd', {
  baseURL: 'https://brasilapi.com.br/api/ddd/v1',
})

// makes a request to the "ddd" endpoint using its settings
useHttp().request('ddd').fetch('47').then((res) => {
  data.value = res
}).catch((error) => {
  console.log(error)
})
</script>
