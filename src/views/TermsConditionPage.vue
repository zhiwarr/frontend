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
      <router-link :to="{ name: 'home' }">
        <i class="iconly-Arrow-Left icli"></i>
        <div class="content">
          <h2>Terms & Condition</h2>
        </div>
      </router-link>
    </div>
  </header>
  <!-- header end -->
  <!-- content start -->
  <section class="px-15 top-space pt-0">
    <h2 class="mb-3">Terms and Conditions for kebazaar</h2>
    <h4 class="mb-1">Introduction</h4>
    <div class="content-color" v-html="term"></div>
  </section>
  <!-- content end -->
</template>
<script setup>
let loading = ref(true);
import { ref, getCurrentInstance, reactive } from "vue";
const instance = getCurrentInstance();
const term = ref();
const { $axios } = instance.appContext.config.globalProperties;
const fetchData = () => {
  $axios.get("/terms").then((res) => {
    console.log(res.data.terms);
    term.value = res.data.terms;
    loading.value = false;
  });
};

fetchData();
</script>
