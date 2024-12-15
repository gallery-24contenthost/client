<template>
  <div class="w-full max-w-md bg-white border border-gray-200 mx-auto mt-12">
    <div class="p-6 space-y-4">
      <!-- Заголовок -->
      <h1 class="font-semibold text-gray-900 text-xl flex justify-center">
        Your account
      </h1>

      <!-- Аватарка -->
      <div class="flex justify-center">
        <i class="fas fa-user-circle text-gray-400" style="font-size: 5rem;"></i>
      </div>

      <!-- Профиль пользователя и кнопка Edit -->
      <div class="flex justify-between items-start" v-if="user">
        <!-- Данные профиля -->
        <div class="space-y-2">
          <div>
            <strong class="text-gray-700">Name:</strong>
            <span class="text-gray-900 ml-2">{{ user.name }}</span>
          </div>
          <div>
            <strong class="text-gray-700">Email:</strong>
            <span class="text-gray-900 ml-2">{{ user.email }}</span>
          </div>
          <div>
            <strong class="text-gray-700">Created at:</strong>
            <span class="text-gray-900 ml-2">{{ user?.created_at }}</span>
          </div>
          <div>
            <strong class="text-gray-700">Updated at:</strong>
            <span class="text-gray-900 ml-2">{{ user?.updated_at }}</span>
          </div>
        </div>
      <router-link
            :to="{ path: '/account-edit' }"
            class="text-blue-500 border border-blue-500 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-500 hover:text-white transition">
          Edit Profile
        </router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

import {storeToRefs} from "pinia";
import {useAuthStore} from "../stores/auth.ts";

const authStore = useAuthStore()

const {user} = storeToRefs(authStore)

console.debug('user', user.value)
</script>