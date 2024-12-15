import {defineStore} from "pinia";
import {computed, ref} from "vue";

import {
    AccountEditData, AccountEditResponse,
    ForgotPasswordData,
    LoginData,
    LoginResponse,
    RegisterData,
    RegisterResponse, ResetPasswordData,
    User
} from "../types";
import useApi from "../composables/useApi";

export const useAuthStore = defineStore("auth", () => {

    const user = ref<User | null>(null);

    const isLoggedIn = computed(() => !!user.value);

    const { api } = useApi();

    const login = async (loginData: LoginData) => {
        try {
            await api.get("/sanctum/csrf-cookie");

            const { data } = await api.post<LoginResponse>("/login", loginData);

            localStorage.setItem("isLoggedIn", "true");
            user.value = data.user;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const register = async (registerData: RegisterData) => {
        try {
            await api.get("/sanctum/csrf-cookie");

            const { data } = await api.post<RegisterResponse>("/register", registerData);

            localStorage.setItem("isLoggedIn", "true");
            user.value = data.user;
        } catch (error) {
            console.error("Registration failed:", error);
            throw error;
        }
    };


    const getUser = async () => {
        const fetchedUser = await api.get<User>("/api/user");
        user.value = fetchedUser.data;
        console.debug("User data fetched successfully.");
    }

    const accountEdit = async (accountEditData: AccountEditData) => {
        const {data} = await api.patch<AccountEditResponse>("/api/edit-account", accountEditData);

        user.value = data.user;
    }

    const forgotPassword = async (forgotPasswordData: ForgotPasswordData)  => {

        await api.get("/sanctum/csrf-cookie");

        const response = await api.post<{ status: string}>("/auth/forgot-password", forgotPasswordData);

        return response?.data?.status;
    }

    const resetPassword = async (resetPasswordData: ResetPasswordData)  => {
        const response = await api.post<{ status: string}>("/auth/reset-password", resetPasswordData);

        return response?.data?.status;
    }



    const logout = async () => {
        await api.post("/auth/logout");
        localStorage.setItem('isLoggedIn', 'false')
        user.value = null;
        console.debug(`after remove token`);
    }


    return {
        user,
        isLoggedIn,
        login,
        register,
        getUser,
        accountEdit,
        forgotPassword,
        resetPassword,
        logout,
    };
});
