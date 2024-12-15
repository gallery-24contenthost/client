<script lang="ts" setup>
import {nextTick} from "vue";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";
import {useAuthStore} from "../stores/auth.ts";


const authStore = useAuthStore();
const {user, isLoggedIn } = storeToRefs(authStore)

const router = useRouter();

const logout = async () => {
  try {
    await authStore.logout();
    console.debug("Current route before redirect:", router.currentRoute.value);

    // Используем nextTick для ожидания завершения всех изменений в состоянии
    await nextTick();

    // Редирект на страницу входа
    await router.push({name: 'login'});

    console.debug("Successfully redirected to login page.")
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
</script>

<template>
  <header class="flex justify-between items-center py-4 px-4 lg:px-8">
    <!-- Название сайта -->
    <router-link :to="{ path: '/' }" class="text-2xl font-semibold text-blue-600">
      Laravel Vue Website
    </router-link>
    <!-- Меню -->
    <nav class="flex items-center space-x-5 justify-end">
      <!-- Только для гостей -->
      <template v-if="!isLoggedIn">
        <router-link
            :to="{ path: '/register' }"
            class="text-blue-500 hover:underline">
          Register
        </router-link>
        <router-link
            :to="{ path: '/login' }"
            class="text-blue-500 hover:underline">
          Login
        </router-link>
      </template>

      <!-- Только для авторизованных -->
      <template v-else>
        <div class="text-gray-900 font-semibold flex space-x-2 items-center">
          <span class="fas fa-user-circle text-blue-500"></span>
          <span class="text-gray-500">Logged in as:</span>
          <span> {{ user?.name }}</span>
        </div>

        <div class="flex space-x-2 items-center">
          <router-link
              :to="{ name: 'account' }"
              class="text-blue-500 hover:underline">
            Account
          </router-link>
          <!-- Кнопка выхода -->
          <button
              class="text-blue-500 hover:underline"
              @click="logout">
            Logout
          </button>
        </div>
      </template>
    </nav>
  </header>
</template>
