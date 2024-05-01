<template>
  <!-- loader strat -->
  <div class="loader" v-if="loading">
    <span></span>
    <span></span>
  </div>
  <!-- loader end -->
  <header>
    <div class="back-links">
      <router-link :to="{ name: 'home' }">
        <i class="iconly-Arrow-Left icli"></i>
        <div class="content">
          <h2>Vendors</h2>
        </div>
      </router-link>
    </div>
    <div class="header-option">
      <ul>
        <li>
          <a href="wishlist.html"><i class="iconly-Heart icli"></i></a>
        </li>
        <li>
          <a href="cart.html"><i class="iconly-Buy icli"></i></a>
        </li>
      </ul>
    </div>
  </header>
  <!-- header end -->
  <!-- category start -->
  <section class="category-listing px-15 lg-space top-space pt-0">
    <router-link
      :to="{ name: 'shop',query: { vendor: vendor.id }}"
      class="category-wrap"
      v-for="vendor in vendors"
      :key="vendor.id"
    >
      <div class="content-part">
        <img :src="$uploads+vendor.banner" style="border-radius: 50%; height: 80px; width: 80px;" class="img-fluid " alt="" />
        <h4>{{ vendor.shop_name }}</h4>
      </div>
      <div class="img-part">
        <img src="@/assets/images/category/women.png" class="img-fluid" alt="" />
      </div>
    </router-link>
  </section>
  <!-- category end -->
  <the-footer></the-footer>
</template>
<script setup>
import { ref, onMounted, getCurrentInstance } from "vue";
const instance = getCurrentInstance();
const { $axios,$uploads } = instance.appContext.config.globalProperties;
import TheFooter from "@/components/TheFooter.vue";
import axios from "axios";
const vendors = ref([]);
const loading = ref(true);
const fetchData = async () => {
  try {
    const response = await $axios.get(`vendors`);
    vendors.value = response.data.vendors.data;
    console.log(response.data);
    // Set loading to false after data is fetched
    loading.value = false;
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle errors, such as setting loading to false even in case of error
    loading.value = false;
  }
};

fetchData();
</script>
