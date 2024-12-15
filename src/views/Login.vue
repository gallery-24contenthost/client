<script  lang="ts" setup>
import {reactive} from "vue";
import {useAuthStore} from "../stores/auth.ts";
import {useRouter} from "vue-router";
import {LoginData, LoginErrors} from "../types";


const form = reactive<LoginData>({
  email: null,
  password: null,
});

const errors = reactive<LoginErrors>({
  email: null,
  password: null,
});

const clearErrors = () => {
  errors.email = null;
  errors.password = null;
};

const authStore = useAuthStore()
const router = useRouter()

const handleSubmit = async () => {
  clearErrors();
  try {
    await authStore.login({ email: form.email, password: form.password})

    return router.push({path: '/account'});
  } catch (error: any) {
    if (error.response && error.response.status === 422) {
      const validationErrors = error.response.data.errors;
      errors.email = validationErrors.email ? validationErrors.email[0] : null;
      errors.password = validationErrors.password ? validationErrors.password[0] : null;
    } else if (error.response && error.response.status === 401) {
      errors.email = "Invalid credentials";
    } else {
      console.error("Unknown error:", error.message);
    }
  }
};
</script>

<template>
  <div class="w-full max-w-md bg-white border border-gray-200 mx-auto mt-12">
    <div class="p-6 space-y-4">
      <h1 class="font-semibold text-gray-900 text-xl text-center">
        Sign in to your account
      </h1>
      <form action="#" class="space-y-4" @submit.prevent="handleSubmit">
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

        <button class="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
                type="submit">
          Sign in
        </button>
      </form>

      <!-- Ссылка для регистрации -->
      <p class="text-sm font-light text-gray-600">
        Don’t have an account yet?
        <router-link :to="{path:'/register'}" class="font-medium text-blue-500 hover:underline">Sign up
        </router-link>
      </p>

      <!-- Ссылка для напоминания пароля -->
      <p class="text-sm font-light text-gray-600">
        Forgot your password?
        <router-link :to="{path:'/forgot-password'}" class="font-medium text-blue-500 hover:underline">Reset it
        </router-link>
      </p>
    </div>
  </div>
</template>


<style></style>
