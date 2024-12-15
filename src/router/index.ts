import {createWebHistory, createRouter, RouteLocationNormalized, NavigationGuardNext} from "vue-router";
import { RouteRecordRaw } from "vue-router";
import {useAuthStore} from "../stores/auth.ts";
import AccountEdit from "../views/AccountEdit.vue";
//import {useAuthStore} from "../stores/auth.ts";


const routes: Array<RouteRecordRaw> = [
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue'),
    },
    {path: '/login', component:  () => import('../views/Login.vue'), name: 'login', meta: {requiresAuth: false, guestOnly: true}},
   {path: '/register', component:  () => import('../views/Register.vue'), meta: {requiresAuth: false, guestOnly: true}},
  //  {path: '/forgot-password', component: import('../views/ForgotPasswordPage.vue'), name: 'forgot-password', meta: {requiresAuth: false, guestOnly: true}},
    // {path: '/password-reset/:token', component: PasswordReset, name: 'password-reset', meta: {requiresAuth: false, guestOnly: true}},
      {path: '/account', component: () => import('../views/Account.vue'), name: 'account', meta: {requiresAuth: true}},
     {path: '/account-edit', component: AccountEdit, name: 'account-edit', meta: {requiresAuth: true}},
    //{path: '/home', component: Home, name: 'home', meta: {requiresAuth: true}},
    {path: '/:pathMatch(.*)*', component: () => import('../views/Page404.vue'), name: 'page404'},
];



const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach(async (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {


    // Исключаем проверку для страницы 404
    if (to.name === 'page404') {
        return next();
    }

    const isLoggedIn = (): boolean => JSON.parse(localStorage.getItem('isLoggedIn') || 'false');

    console.debug(`Router isLoggedIn=${isLoggedIn()}`);

    const authStore = useAuthStore();

    // Если маршрут доступен только для гостей, но пользователь уже вошел в систему, перенаправляем на страницу аккаунта
    if (to.meta.guestOnly && isLoggedIn()) {
        return next({ name: 'account' });
    }

    // Если маршрут требует аутентификации, и пользователь уже вошел в систему, загружаем данные пользователя
    if (to.meta.requiresAuth && isLoggedIn()) {
        try {
          await authStore.getUser();
        } catch (error) {
            console.error('Error fetching user:', error);
            localStorage.setItem('isLoggedIn', "false")
            return next({ name: 'login' }); // Перенаправление на страницу логина в случае ошибки
        }
    }

    next();
});



export default router;