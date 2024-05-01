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
          <h2>Categories</h2>
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
      :to="{ name: 'subcategories', params: { category: category.slug } }"
      class="category-wrap"
      v-for="category in categories"
      :key="category.id"
    >
      <div class="content-part">
        <img src="@/assets/images/sale.gif" class="img-fluid sale-gif" alt="" />
        <h4>{{ category.name.en }}</h4>
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
const { $axios } = instance.appContext.config.globalProperties;
import TheFooter from "@/components/TheFooter.vue";
import axios from "axios";
const categories = ref([]);
const loading = ref(true);
const fetchData = async () => {
  try {
    const response = await $axios.get(`categories`);
    categories.value = response.data;
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
