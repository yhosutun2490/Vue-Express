<template>
  <div class="app__container">
    <RouterView></RouterView>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>

<style scoped>
.app__container {
  width: 100%;
  height: 100%;
  color: black;
}
</style>
