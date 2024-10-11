<template>
  <div>
    Nuxt module playground!
  </div>
</template>

<script setup>
useHttp().add('ddd', {
  baseURL: 'https://brasilapi.com.br/api/ddd/v1',
})

console.log(useHttp().request('ddd').fetch('47'))
</script>
