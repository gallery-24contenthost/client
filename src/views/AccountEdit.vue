<template>
  <div class="w-full max-w-md bg-white border border-gray-200 mx-auto mt-12">
    <div class="p-6 space-y-4">
      <!-- Заголовок -->
      <h1 class="font-semibold text-gray-900 text-xl text-center">
        Edit account info
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

        <!-- Кнопка "Sign up" -->
        <button
            class="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
            type="submit"

        >
          Save changes
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {reactive} from "vue";
import {AccountEditData, AccountEditErrors} from "../types";
import {useAuthStore} from "../stores/auth.ts";
import {useRouter} from "vue-router";



const authStore = useAuthStore()
const router = useRouter();

const form = reactive<AccountEditData>({
  name: authStore.user?.name,
});

const errors = reactive<AccountEditErrors>({
  name: null,
});

const clearErrors = () => {
  errors.name = null;
};


const handleSubmit = async () => {
  clearErrors();
  try {
    await authStore.accountEdit({ name:form.name} )
    return router.push({name: 'account'});
  } catch (error: any) {
    if (error.response && error.response.status === 422) {
      const validationErrors = error.response.data.errors;
      errors.name = validationErrors.name ? validationErrors.name[0] : null;
    } else {
      console.error("Unknown error:", error.message);
    }
  }
};
</script>
