<template>
  <!-- loader strat -->
  <div class="loader" v-if="loading">
    <span></span>
    <span></span>
  </div>
  <!-- loader end -->
  <!-- header start -->
  <header class="bg-transparent">
    <div class="back-links">
      <router-link :to="{ name: 'order-tracking' }">
        <i class="iconly-Arrow-Left icli"></i>
        <div class="content">
          <h2>Order Details</h2>
        </div>
      </router-link>
    </div>
  </header>
  <!-- header end -->
  <!-- product detail start -->
  <div class="mt-5 px-15" v-for="product in tracker.order_products" :key="product.id">
    <div class="product-inline">
      <a href="product.html">
        <img :src="$uploads + product.product.thumb_image" class="img-fluid" alt="" />
      </a>
      <div class="product-inline-content">
        <div>
          <a href="product.html">
            <h4>{{ product.product_name }}</h4>
          </a>
          <template v-if="product.variants">
            <span v-for="(variant, key) in JSON.parse(product.variants)" :key="key">
              <template v-if="key === 'Color'">
                <span> Color: {{ variant["name"] }},</span>
              </template>
              <template v-if="key === 'size'">
                <span> Size: {{ variant["name"] }},</span>
              </template>
            </span>
            Qty: {{ product.qty }}
          </template>
        </div>
      </div>
    </div>
  </div>
  <!-- product detail end -->
  <!-- order tracking start -->
  <div class="order-track px-15">
    <div
      class="order-track-step"
      :class="tracker.order_status == 'delivered' ? '' : 'in-process'"
    >
      <div class="order-track-status">
        <span class="order-track-status-dot">
          <img src="@/assets/svg/check.svg" class="img-fluid" alt="" />
        </span>
        <span class="order-track-status-line"></span>
      </div>
      <div class="order-track-text">
        <p class="order-track-text-stat">Delivered</p>
        <span class="order-track-text-sub" v-if="tracker.order_status == 'delivered'">{{
          tracker.time_date_readable
        }}</span>
      </div>
    </div>
    <div
      class="order-track-step"
      :class="
        tracker.order_status == 'out_for_delivery' || tracker.order_status == 'delivered'
          ? ''
          : 'in-process'
      "
    >
      <div class="order-track-status">
        <span class="order-track-status-dot">
          <img src="@/assets/svg/check.svg" class="img-fluid" alt="" />
        </span>
        <span class="order-track-status-line"></span>
      </div>
      <div class="order-track-text">
        <p class="order-track-text-stat">On The Way</p>
        <span
          class="order-track-text-sub"
          v-if="
            tracker.order_status == 'out_for_delivery' ||
            tracker.order_status == 'shipped'
          "
        >
          {{ tracker.time_date_readable }}</span
        >
      </div>
    </div>
    <div
      class="order-track-step"
      :class="
        tracker.order_status == 'processed_and_ready_to_ship' ||
        tracker.order_status == 'dropped_off' ||
        tracker.order_status == 'shipped' ||
        tracker.order_status == 'out_for_delivery' ||
        tracker.order_status == 'delivered'
          ? ''
          : 'in-process'
      "
    >
      <div class="order-track-status">
        <span class="order-track-status-dot">
          <img src="@/assets/svg/check.svg" class="img-fluid" alt="" />
        </span>
        <span class="order-track-status-line"></span>
      </div>
      <div class="order-track-text">
        <p class="order-track-text-stat" v-if="tracker.order_status == 'canceled'">
          Order Canceled
        </p>
        <p class="order-track-text-stat" v-else>
          <span>Order Processing</span>
        </p>
        <span
          class="order-track-text-sub"
          v-if="
            tracker.order_status == 'processed_and_ready_to_ship' ||
            tracker.order_status == 'dropped_off'
          "
          >{{ tracker.time_date_readable }}</span
        >
      </div>
    </div>
    <div class="order-track-step">
      <div class="order-track-status">
        <span class="order-track-status-dot">
          <img src="@/assets/svg/check.svg" class="img-fluid" alt="" />
        </span>
        <span class="order-track-status-line"></span>
      </div>
      <div class="order-track-text">
        <p class="order-track-text-stat">Pending</p>
        <span class="order-track-text-sub">{{ tracker.time_date_readablec }}</span>
      </div>
    </div>
  </div>
  <div class="divider"></div>
  <!-- order tracking end -->
  <!-- address section start -->
  <div class="px-15">
    <h2 class="tracking-title content-color">
      {{ JSON.parse(tracker.order_address).name }}
    </h2>
    <h4 class="fw-bold mb-1">{{ JSON.parse(tracker.order_address).email }}</h4>
    <h4 class="fw-bold mt-1">Phone No: {{ JSON.parse(tracker.order_address).phone }}</h4>
    <h4 class="content-color">
      Address :{{ JSON.parse(tracker.order_address).address }}
    </h4>
    <h4 class="content-color">City :{{ JSON.parse(tracker.order_address).city }}</h4>
    <h4 class="content-color">zip-code:{{ JSON.parse(tracker.order_address).zip }}</h4>
  </div>
  <div class="divider"></div>
  <!-- address section end -->

  <!-- order details section start -->
  <div class="px-15 section-b-space">
    <h6 class="tracking-title content-color">Price Details</h6>
    <div class="order-details">
      <ul>
        <li>
          <h4>
            subtotal <span>{{ tracker.sub_total }} {{ tracker.currency_icon }}</span>
          </h4>
        </li>
        <li v-if="tracker.coupon == !null">
          <h4>
            Coupon Discount <span>{{ tracker.coupon }}</span>
          </h4>
        </li>
        <li>
          <h4>
            shipping cost
            <span class="text-green">{{ JSON.parse(tracker.shpping_method).cost }}</span>
          </h4>
        </li>
        <li>
          <h4>
            Shipping Method
            <span class="text-green">{{ JSON.parse(tracker.shpping_method).name }}</span>
          </h4>
        </li>
      </ul>
      <div class="total-amount">
        <h4>
          Total Amount <span>{{ tracker.amount }} {{ tracker.currency_icon }}</span>
        </h4>
      </div>
      <a href="#" class="btn btn-outline content-color w-100 mt-4">Download Invoice</a>
    </div>
  </div>
  <!-- order details section end -->
</template>
<script setup>
import { ref, getCurrentInstance } from "vue";
import { useRoute } from "vue-router";
const instance = getCurrentInstance();
const route = useRoute();
const loading = ref(true);
const tracker = ref([]);
const { $axios } = instance.appContext.config.globalProperties;
const trackOrder = () => {
  $axios.get(`product-traking?tracker=${route.query.tracker}`).then((response) => {
    tracker.value = response.data.order;
    loading.value = false;
  });
};
trackOrder();
</script>
