<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>

<style scoped>
div {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
  background-color: #FFDAE4;
}
</style>
