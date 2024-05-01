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
      <a href="payment.html">
        <i class="iconly-Arrow-Left icli"></i>
        <div class="content">
          <h2>Order Placed</h2>
        </div>
      </a>
    </div>
  </header>
  <!-- header end -->
  <!-- order success section start -->
  <section class="order-success-section px-15 top-space xl-space">
    <div>
      <img src="@/assets/images/check-circle.gif" class="img-fluid" alt="">
      <h1>Order successfully!</h1>
      <h2>Payment is successfully processed and your Order is on the way.</h2>
    </div>
  </section>
  <!-- order success section end -->
  <!-- order details section start -->
  <section class="px-15" v-if="order">
    <h2 class="page-title">Order Details</h2>
    <div class="details">
      <ul>
        <li class="mb-3 d-block">
          <h4 class="fw-bold mb-1">Your order # is: {{ order?.invocie_id }}</h4>
          <h4 class="content-color">An email receipt including the details about your order has been sent to your email ID.</h4>
        </li>
        <li class="mb-3 d-block" >
          <h4 class="fw-bold mb-1">This order will be shipped to:</h4>
          <!-- Access and parse order_address -->
          <template v-if="order.order_address">
            <h4>{{ JSON.parse(order.order_address).name }}</h4>
            <h4>{{ JSON.parse(order.order_address).phone }}</h4>
            <h4>{{ JSON.parse(order.order_address).email }}</h4>
            <h4>{{ JSON.parse(order.order_address).country }}</h4>
            <h4>{{ JSON.parse(order.order_address).city }}</h4>
            <h4>{{ JSON.parse(order.order_address).address }}</h4>
            <!-- Access other properties of order_address as needed -->
          </template>
        </li>
        <li class="d-block">
          <h4 class="fw-bold mb-1">Payment Method</h4>
          <h4 class="content-color">Cash On Delivery</h4>
        </li>
      </ul>
    </div>
  </section>
  <!-- order details section end -->
  <!-- Remaining sections omitted for brevity -->
  <div class="divider"></div>
  <!-- order details section end -->


  <!-- panel space start -->
  <section class="panel-space"></section>
  <!-- panel space end -->


  <!-- bottom panel start -->
  <div class="delivery-cart cart-bottom">
    <div>
      <div class="left-content">
        <router-link :to="{name:'order-tracking'}" class="title-color">Track Order</router-link>
      </div>
      <router-link :to="{name:'home'}" class="btn btn-solid">Continue shopping</router-link>
    </div>
  </div>
  <!-- bottom panel end -->
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
const instance = getCurrentInstance();
const order = ref();
const loading = ref(true);

const { $axios } = instance.appContext.config.globalProperties;

const fetchData = async () => {
  try {
    const response = await $axios.get("payment-success");
    order.value = response.data.data;
    loading.value = false;
  } catch (error) {
    console.error("Error fetching order data:", error);
  }
};

fetchData();

</script>
