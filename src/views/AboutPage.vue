<template>
  <!-- loader strat -->
  <div class="loader" v-if="loading">
    <span></span>
    <span></span>
  </div>
  <!-- loader end -->
  <!-- section start -->
  <section class="px-15 top-space pt-0">
    <h2 class="fw-bold mb-2">About Us</h2>
    <div class="help-img">
      <img
        src="@/assets/images/introduction.jpg"
        class="img-fluid rounded-1 mb-3 w-100"
        alt=""
      />
    </div>
    <div class="mb-2" v-html="about"></div>
    <p class="content-color"></p>
  </section>
  <!-- section end -->
</template>
<script setup>
import { ref, getCurrentInstance } from "vue";
const instance = getCurrentInstance();
const loading = ref(true);
const { $axios } = instance.appContext.config.globalProperties;
import { useRoute, useRouter } from "vue-router";
const about = ref("");
const fetchData = async () => {
  await $axios.get("/about").then((response) => {
    about.value = response.data.about;
    loading.value = false;
  });
};
fetchData();
</script>
