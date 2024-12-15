<template>
  <div class="w-full max-w-md bg-white border border-gray-200 mx-auto mt-12">
    <div class="p-6 space-y-4">
      <h1 class="font-semibold text-gray-900 text-xl text-center">
        Create an account
      </h1>
      <form action="#" class="space-y-4" @submit.prevent="handleSubmit">
        <div>
          <label class="block text-sm font-medium text-gray-900 mb-2" for="name">Your name</label>
          <input
              id="name"
              v-model="form.name"
              class="w-full border border-gray-300 text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Name"
              type="text"

          >
          <span v-if="errors.name" class="text-red-600 text-sm mt-1">{{ errors.name }}</span>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-900 mb-2" for="email">Your email</label>
          <input
              id="email"
              v-model="form.email"
              class="w-full border border-gray-300 text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
              placeholder="name@company.com"
              type="text"

          >
          <span v-if="errors.email" class="text-red-600 text-sm mt-1">{{ errors.email }}</span>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-900 mb-2" for="password">Password</label>
          <input
              id="password"
              v-model="form.password"
              class="w-full border border-gray-300 text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
              type="password"

          >
          <span v-if="errors.password" class="text-red-600 text-sm mt-1">{{ errors.password }}</span>
        </div>

        <!-- Повтор пароля -->
        <div>
          <label class="block text-sm font-medium text-gray-900 mb-2" for="confirm_password">Confirm
            password</label>
          <input
              id="password_confirmation"
              v-model="form.password_confirmation"
              class="w-full border border-gray-300 text-gray-900 rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
              type="password"

          >
          <span v-if="errors.password_confirmation"
                class="text-red-600 text-sm mt-1">{{ errors.password_confirmation }}</span>

        </div>

        <!-- Кнопка "Sign up" -->
        <button
            class="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
            type="submit"

        >
          Sign up
        </button>
      </form>

      <!-- Ссылка для входа -->
      <p class="text-sm font-light text-gray-600">
        Already have an account?
        <router-link :to="{ name: 'login' }" class="font-medium text-blue-500 hover:underline">
          Login
        </router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useAuthStore } from "../stores/auth.ts";
import { useRouter } from "vue-router";
import { RegisterData, RegisterErrors } from "../types";

// Типизация данных формы для регистрации
const form = reactive<RegisterData>({
  name: null,
  email: null,
  password: null,
  password_confirmation: null,
});

// Типизация ошибок формы
const errors = reactive<RegisterErrors>({
  name: null,
  email: null,
  password: null,
  password_confirmation: null,
});

// Функция очистки ошибок
const clearErrors = () => {
  errors.name = null;
  errors.email = null;
  errors.password = null;
  errors.password_confirmation = null;
};

const authStore = useAuthStore();
const router = useRouter();

// Функция обработки отправки формы
const handleSubmit = async () => {
  clearErrors();

  try {
    await authStore.register( { name: form.name, email: form.email, password: form.password, password_confirmation: form.password_confirmation } );
    return router.push({ path: '/account' });
  } catch (error: any) {
    if (error.response && error.response.status === 422) {
      const validationErrors = error.response.data.errors;
      errors.name = validationErrors.name ? validationErrors.name[0] : null;
      errors.email = validationErrors.email ? validationErrors.email[0] : null;
      errors.password = validationErrors.password ? validationErrors.password[0] : null;
      errors.password_confirmation = validationErrors.password_confirmation
          ? validationErrors.password_confirmation[0]
          : null;
    } else {
      console.error("Unknown error:", error.message);
    }
  }
};
</script>