<template>
  <!-- category start -->
  <section class="category-section top-space">
    <ul class="category-slide">
      <li v-for="category in props.categories" :key="category.id">
        <router-link
          :to="{ name: 'category-product', query: { category: category.slug } }"
          class="category-box"
        >
          <i :class="category.icon"></i>
          <!-- Check if category.icon holds correct class names -->
          <h4>{{ category.name.en }}</h4>
        </router-link>
      </li>
    </ul>
  </section>
  <div class="divider t-12 b-20"></div>
  <!-- category end -->
</template>

<script setup>
const props = defineProps(["categories"]);
</script>
