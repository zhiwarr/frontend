<template>
  <!-- loader strat -->
  <div class="loader" v-if="loading">
    <span></span>
    <span></span>
  </div>
  <!-- loader end -->

  <!-- header start -->
  <header>
    <div class="back-links">
      <router-link :to="{ name: 'categories' }">
        <i class="iconly-Arrow-Left icli"></i>
        <div class="content">
          <h2>
            Categories
            <span
              ><i class="iconly-Arrow-Right-2 icli"></i>{{ subcategories.name.en }}</span
            >
          </h2>
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
  <!-- category title start -->
  <section class="category-listing px-15 xl-space top-space pt-0">
    <router-link
      :to="{ name: 'shop', query: { category: subcategories.slug } }"
      class="category-wrap"
    >
      <div class="content-part">
        <h2>{{ subcategories.name.en }}</h2>
        <template v-for="products in subcategories.products" :key="products.id">
          <h4>{{ products.name }}</h4>
        </template>
      </div>
      <div class="img-part">
        <img src="@/assets/images/category/women.png" class="img-fluid" alt="" />
      </div>
    </router-link>
  </section>
  <!-- category title end -->
  <!-- category menu start -->
  <section class="px-15 category-menu">
    <div class="accordion px-15">
      <div
        class="accordion-item"
        v-for="sub in subcategories.subcategories"
        :key="sub.id"
      >
        <h2 class="accordion-header d-flex justify-content-between align-items-center">
          <router-link
            class="w-75"
            :to="{
              name: 'shop',
              query: { subcategory: sub.slug },
            }"
            >{{ sub.name.en }}</router-link
          >
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            :data-bs-target="'#' + sub.id"
          ></button>
        </h2>
        <div :id="sub.id" class="accordion-collapse collapse">
          <div class="accordion-body">
            <ul>
              <li v-for="child in sub.child_categories" :key="child.id">
                <router-link
                  :to="{
                    name: 'shop',
                    query: { childcategory: child.slug },
                  }"
                  >{{ child.name.en }}</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- category menu end -->
  <!-- inner category start -->
  <section class="inner-category px-15">
    <div class="row gx-3">
      <div class="col-4">
        <a href="shop.html">
          <img src="@/assets/images/category/flowerprint.png" class="img-fluid" alt="" />
          <h4>Flowerprint</h4>
        </a>
      </div>
      <div class="col-4">
        <a href="shop.html">
          <img src="@/assets/images/category/denim.png" class="img-fluid" alt="" />
          <h4>Denim</h4>
        </a>
      </div>
      <div class="col-4">
        <a href="shop.html">
          <img src="@/assets/images/category/skirts.png" class="img-fluid" alt="" />
          <h4>Skirts</h4>
        </a>
      </div>
    </div>
  </section>
  <!-- inner category end -->
</template>
<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, getCurrentInstance } from "vue";
const instance = getCurrentInstance();
const { $axios } = instance.appContext.config.globalProperties;

// Make loading a reactive variable

const route = useRoute();
const category = route.params.category;
const subcategories = ref([]);

const fetchData = async () => {
  try {
    const response = await $axios.get(`categories/${category}`);
    subcategories.value = response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchData();
</script>
