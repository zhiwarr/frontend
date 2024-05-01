import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Public routes (no authentication required)
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { requiresAuth: false }
    },
    {
      path: '/category-products',
      name: 'category-product',
      component: () => import('../views/ShopPage.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/produuct-detail/:product',
      name: 'product-detail',
      component: () => import('../views/ProductDetail.vue'),
      props: true,
      meta: { requiresAuth: false }
    },
    {
      path: '/vendors',
      name: 'vendors',
      component: () => import('../views/VendorsPage.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterPage.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/ShopPage.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('../views/CategoryPage.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/categories/:category',
      name: 'subcategories',
      component: () => import('../views/SubcategoryPage.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutPage.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactPage.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/terms-conditions',
      name: 'terms-condition',
      component: () => import('../views/TermsConditionPage.vue'),
      meta: { requiresAuth: false }
    },
    // Private routes (authentication required)
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfilePage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/settings',
      name: 'profile-setting',
      component: () => import('../views/ProfileSettingPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path:'/orders',
      name: 'orders',
      component: () => import('../views/OrdersPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path:'/wishlist',
      name: 'wishlist',
      component: () => import('../views/WishlistPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path:'/notifications',
      name: 'notifications',
      component: () => import('../views/NotificationPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path:'/cart',
      name: 'cart',
      component: () => import('../views/CartPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path:'/saved-address',
      name:'saved-address',
      component: () => import('../views/SavedAddress.vue'),
      meta: { requiresAuth: true }
    },
    {
      path:'/address/:id/edit',
      name:'edit-address',
      component: () => import('../views/NewaddressPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path:'/new-address',
      name: 'new-address',
      component: () => import('../views/NewaddressPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path:'/checkout',
      name: 'payment',
      component: () => import('../views/CheckoutPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path:'/place-order',
      name: 'place-order',
      component: () => import('../views/PlaceOrderPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path:'/coupons',
      name: 'coupons',
      component: () => import('../views/CouponsPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path:'/order-tracking',
      name: 'order-tracking',
      component: () => import('../views/TrackYourOrderPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path:'/product-traking',
      name: 'product-traking',
      component: () => import('../views/OrderTrackingPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path:'/search',
      name: 'search',
      component: () => import('../views/SearchPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path:'/settings',
      name: 'settings',
      component: () => import('../views/SettingPage.vue'),
      meta: { requiresAuth: true }
    },
  ]
})
router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    // Check if user is authenticated (you can use any authentication logic here)
    const isAuthenticated = localStorage.getItem('token') !== null;
    if (!isAuthenticated) {
      // Redirect to login page if not authenticated
      next('/login');
    } else {
      // Proceed to the route
      next();
    }
  } else {
    // Proceed to the route
    next();
  }
});
export default router
