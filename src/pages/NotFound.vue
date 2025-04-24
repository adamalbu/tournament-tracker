<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "NotFound"
})
</script>

<template>
  <h1>404</h1>
  <p>Page not found</p>
  <router-link to="/">Go Home</router-link>
</template>

<style scoped>

</style>
