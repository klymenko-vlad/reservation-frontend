import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'StayFinder' },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true, title: 'My profile' },
    },
    {
      path: '/hotels',
      name: 'hotels',
      component: () => import('../views/HotelsView.vue'),
      meta: { requiresNotHost: true, title: 'Hotels' },
    },
    {
      path: '/hotels/:id',
      name: 'hotel-detail',
      component: () => import('../views/HotelDetailView.vue'),
      props: true,
      meta: { requiresNotHost: true, title: 'Hotel details' },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { title: 'Login' },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: { title: 'Register' },
    },
    {
      path: '/hotels/:id/book',
      name: 'hotel-book',
      component: () => import('../views/BookingView.vue'),
      props: true,
      meta: { requiresAuth: true, title: 'Book Hotel' },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.id) {
    next({
      name: 'login',
    })
  }

  if (to.meta.requiresNotHost && userStore.role === 'HOST') {
    next({ name: 'home' })
  }

  next()
})

router.afterEach((to) => {
  document.title = (to.meta.title as string) || 'StayFinder'
})

export default router
