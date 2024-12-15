<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Рабочая область -->
    <div class="max-w-screen-lg mx-auto">
      <Header/>

      <!-- Основной контент -->
      <main>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Header from "./components/Header.vue";
</script>
