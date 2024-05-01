<template>
  <!-- <div class="loader">
    <span></span>
    <span></span>
  </div> -->
  <!-- header start -->
  <header class="bg-transparent">
    <div class="back-links">
      <router-link :to="{ name: 'orders' }">
        <i class="iconly-Arrow-Left icli"></i>
        <div class="content">
          <h2>Order Details</h2>
        </div>
      </router-link>
    </div>
  </header>
  <!-- header end -->
  <section class="px-15 top-space pt-0">
    <div class="mt-5">
      <img src="@/assets/images/help.jpg" class="img-fluid rounded-1 w-100" alt="" />

      <h2 class="page-title mt-5 pb-2">Track Your Order</h2>
      <div class="form-floating">
        <input
          type="text"
          v-model="invoiceId"
          class="form-control"
          id="one"
          placeholder="Order ID"
        />
        <label for="one">Order ID</label>
      </div>
      <div class="form-floating mt-3">
        <router-link
          :to="{ name: 'product-traking', query: { tracker: invoiceId } }"
          class="btn btn-dark"
          >Track</router-link
        >
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref } from "vue";
const invoiceId = ref();
</script>
