<template>
  <!-- panel space start -->
  <section class="panel-space"></section>
  <!-- panel space end -->

  <!-- bottom panel start -->
  <div class="bottom-panel">
    <ul>
      <li :class="{ active: isRouteActive('home') }">
        <router-link to="/">
          <div class="icon">
            <i class="iconly-Home icli"></i>
            <i class="iconly-Home icbo"></i>
          </div>
          <span>home</span>
        </router-link>
      </li>
      <li :class="{ active: isRouteActive('vendors') }">
        <router-link :to="{ name: 'vendors' }">
          <div class="icon">
            <i class="iconly-User3 icli"></i>
            <i class="iconly-User3 icbo"></i>
          </div>
          <span>vendors</span>
        </router-link>
      </li>
      <li :class="{ active: isRouteActive('shop') }">
        <router-link :to="{ name: 'shop' }">
          <div class="icon">
            <i class="iconly-Buy icli"></i>
            <i class="iconly-Buy icbo"></i>
          </div>
          <span>shop</span>
        </router-link>
      </li>
      <li :class="{ active: isRouteActive('categories') }">
        <router-link :to="{ name: 'categories' }">
          <div class="icon">
            <i class="iconly-Category icli"></i>
            <i class="iconly-Category icbo"></i>
          </div>
          <span>categories</span>
        </router-link>
      </li>
      <li :class="{ active: isRouteActive(linkDestination.name) }">
        <router-link :to="linkDestination">
          <div class="icon">
            <i class="iconly-Profile icli"></i>
            <i class="iconly-Profile icbo"></i>
          </div>
          <span>{{ linkText }}</span>
        </router-link>
      </li>
    </ul>
  </div>
  <!-- bottom panel end -->
</template>
<script setup>
import { computed, watch } from "vue";
import { useRouter } from "vue-router";

// Function to get the token from local storage
const getToken = () => localStorage.getItem("token");

// Watch for changes in the token in local storage
watch(getToken, (newValue) => {
  // If token exists, set it in axios headers
  if (newValue) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${newValue}`;
  }
});

const router = useRouter();
// Function to check if the route is active
const isRouteActive = (routeName) => {
  return router.currentRoute.value.name === routeName;
};
// Computed property to determine the link destination based on token presence
const linkDestination = computed(() => {
  const token = getToken();
  return token ? { name: "profile" } : { name: "login" };
});

// Computed property to determine the link text based on token presence
const linkText = computed(() => {
  const token = getToken();
  return token ? "Profile" : "Login";
});
</script>
