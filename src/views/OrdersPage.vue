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
      <router-link :to="{ name: 'profile' }">
        <i class="iconly-Arrow-Left icli"></i>
        <div class="content">
          <h2>Order History</h2>
        </div>
      </router-link>
    </div>
  </header>
  <!-- header end -->

  <section class="px-15">
    <h2 class="page-title mt-5">Requested Orders</h2>
    <ul class="order-listing" v-if="orders">
      <template v-for="order in orders" :key="order.id">
        <li v-if="order.order_status !== 'delivered'">
          <div
            class="order-box"
            v-for="product in order.order_products"
            :key="product.id"
          >
            <div class="d-flex align-items-center">
              <img
                :src="$uploads + product.product.thumb_image"
                class="img-fluid order-img"
                alt=""
              />
              <div class="media-body">
                <h4>{{ product.product.name }}</h4>
                <h5 class="content-color my-1">
                  <template v-if="product.variants">
                    <span
                      v-for="(variant, key) in JSON.parse(product.variants)"
                      :key="key"
                    >
                      <template v-if="key === 'Color'">
                        <span> Color: {{ variant["name"] }},</span>
                      </template>
                      <template v-if="key === 'size'">
                        <span> Size: {{ variant["name"] }},</span>
                      </template>
                    </span>
                    Qty: {{ product.qty }}
                  </template>
                </h5>
                <a class="theme-color" href="#">View Details</a>
              </div>
              <span class="status-label">{{ order.order_status }}</span>
            </div>
            <div class="delivery-status">
              <div class="d-flex">
                <div>
                  <h6 class="content-color">Ordered:</h6>
                  <!-- Use proper date formatting here -->
                  <h6>{{ product.created_at_formatted }}</h6>
                </div>
                <div>
                  <h6 class="content-color">Delivery Status:</h6>
                  <h6>{{ order.order_status }}</h6>
                </div>
              </div>
            </div>
          </div>
        </li>
      </template>
    </ul>
    <h2 v-else>no orders....</h2>
  </section>
  <div class="divider"></div>

  <!-- section start -->
  <section class="section-b-space pt-0 px-15">
    <h2 class="page-title">Delivered Orders</h2>
    <ul class="order-listing" v-if="orders">
      <template v-for="order in orders" :key="order.id">
        <li v-if="order.order_status == 'delivered'">
          <div
            class="order-box"
            v-for="product in order.order_products"
            :key="product.id"
          >
            <div class="d-flex align-items-center">
              <img
                :src="$uploads + product.product.thumb_image"
                class="img-fluid order-img"
                alt=""
              />
              <div class="media-body">
                <h4>{{ product.product.name }}</h4>
                <h5 class="content-color my-1">
                  <template v-if="product.variants">
                    <span
                      v-for="(variant, key) in JSON.parse(product.variants)"
                      :key="key"
                    >
                      <template v-if="key === 'Color'">
                        <span> Color: {{ variant["name"] }},</span>
                      </template>
                      <template v-if="key === 'size'">
                        <span> Size: {{ variant["name"] }},</span>
                      </template>
                    </span>
                    Qty: {{ product.qty }}
                  </template>
                </h5>
                <a class="theme-color" href="#">View Details</a>
              </div>
              <span class="status-label">{{ order.order_status }}</span>
            </div>
            <div class="delivery-status">
              <div class="d-flex">
                <div>
                  <h6 class="content-color">Ordered:</h6>
                  <!-- Use proper date formatting here -->
                  <h6>{{ product.created_at_formatted }}</h6>
                </div>
                <div>
                  <h6 class="content-color">Delivery Status:</h6>
                  <h6>{{ order.order_status }}</h6>
                </div>
              </div>
            </div>
          </div>
          <div class="rate-section">
            <ul>
              <li data-bs-toggle="offcanvas" data-bs-target="#offcanvasreview">
                <i class="iconly-Star icli"></i> Rate & Review Product
              </li>
              <li><i class="iconly-Star icli"></i> Need Help?</li>
            </ul>
          </div>
        </li>
      </template>
    </ul>
  </section>
  <!-- section end -->
  <!-- add review canvas start -->
  <div class="offcanvas offcanvas-bottom h-auto" tabindex="-1" id="offcanvasreview">
    <div class="offcanvas-body">
      <h2 class="mb-2">Write Review</h2>
      <div class="d-flex align-items-center">
        <h4 class="content-color me-2">Your rating:</h4>
        <ul class="ratings">
          <li><i class="iconly-Star icbo"></i></li>
          <li><i class="iconly-Star icbo"></i></li>
          <li><i class="iconly-Star icbo"></i></li>
          <li><i class="iconly-Star icbo"></i></li>
          <li><i class="iconly-Star icbo empty"></i></li>
        </ul>
      </div>
      <h4 class="content-color mt-2 mb-2">Review:</h4>
      <form class="mb-4 section-b-space">
        <textarea rows="4" class="form-control"> </textarea>
      </form>
      <div class="cart-bottom row m-0">
        <div>
          <div class="left-content col-5">
            <a href="#" class="title-color">BACK</a>
          </div>
          <a
            data-bs-dismiss="offcanvas"
            href="javascript:void(0)"
            class="btn btn-solid col-7 text-uppercase"
            >Submit</a
          >
        </div>
      </div>
    </div>
  </div>
  <!-- add review canvas end -->
</template>
<script setup>
import { ref, getCurrentInstance } from "vue";
const instance = getCurrentInstance();
const orders = ref([]);
const loading = ref(true);
const { $axios, $uploads } = instance.appContext.config.globalProperties;
const fetchData = async () =>
  await $axios.get("orders").then((response) => {
    orders.value = response.data.data;
    loading.value = false;
    console.log(orders.value);
  });

fetchData();
</script>
