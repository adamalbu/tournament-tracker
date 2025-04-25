<template>
    <header class="header">
      <h1 data-test="page-title">{{ pageTitle }}</h1>
      <button @click="goHome" class="center" data-test="home-button"><House /></button>
    </header>
    <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import House from "@/components/icons/house.vue";

export default defineComponent({
  name: 'App',
  components: {House},
  data() {
    return {
      pageTitle: 'Default Title' as string,
    }
  },
  mounted() {
    this.updateTitle()
  },
  watch: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    '$route'(newRoute) {
      this.updateTitle()
    }
  },
  methods: {
    updateTitle() {
      const route = this.$route
      this.pageTitle = (route.meta.title || '') as string
    },
    goHome() {
      this.$router.push('/')
    }
  }
})


</script>

<style scoped>
</style>
