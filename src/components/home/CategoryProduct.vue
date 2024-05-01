<template>
  <!-- kids corner section start -->
  <section class="pt-0 product-slider-section overflow-hidden">
    <div class="title-section px-15">
      <h2>Order what you like</h2>
      <h3>from our diffrent vendors</h3>
    </div>
    <swiper-container
      :slides-per-view="3"
      :autoplay="true"
      :space-between="10"
      :breakpoints="{
        768: {
          slidesPerView: 3,
        },
      }"
      class="product-slider slick-default pl-15"
    >
      <swiper-slide v-for="product in props.categoryProducts" :key="product.id">
        <div class="product-box ratio_square">
          <div class="img-part">
            <router-link
              :to="{ name: 'product-detail', params: { product: product.slug } }"
            >
              <img
                :src="$uploads + product.thumb_image"
                style="height: 200px; width: 200px"
                alt=""
                class="img-fluid bg-img"
            /></router-link>
            <div class="wishlist-btn">
              <button class="btn" @click.prevent="toWishlist(product.id)">
                <i class="iconly-Heart icli"></i>
                <i class="iconly-Heart icbo"></i>
                <div class="effect-group">
                  <span class="effect"></span>
                  <span class="effect"></span>
                  <span class="effect"></span>
                  <span class="effect"></span>
                  <span class="effect"></span>
                </div>
              </button>
            </div>
          </div>
          <div class="product-content">
            <router-link
              :to="{ name: 'product-detail', params: { product: product.slug } }"
            >
              <h4>{{ product.name }}</h4>
            </router-link>
            <div class="price">
              <h4 v-if="product.offer_price">
                {{ product.offer_price }} IQD
                <del v-if="product.offer_price">{{ product.price }} IQD</del>
                <span v-if="product.offer_price">
                  %{{ calculateDiscountPercent(product.price, product.offer_price) }}
                </span>
              </h4>
              <h4 v-else>{{ product.price }} IQD</h4>
            </div>
          </div>
        </div>
      </swiper-slide>
      <div></div>
    </swiper-container>
  </section>
  <!-- kids corner section end -->
</template>
<script setup>
import { calculateDiscountPercent } from "@/helpers.js";
import { onMounted } from "vue";
const props = defineProps(["categoryProducts"]);
import { useUserStore } from "../../stores/user";
import { getCurrentInstance } from "vue";
import { toast } from "vue3-toastify";
const userStore = useUserStore();
const instance = getCurrentInstance();
const { $axios, $uploads } = instance.appContext.config.globalProperties;
calculateDiscountPercent();

const toWishlist = async (id) => {
  const product_id = id;
  try {
    const response = await $axios.post("wishlist/add-product", {
      id: product_id,
      user_id: userStore.id,
    });
    if (response.data.status === "success") {
      // Product added to wishlist successfully
      toast.success(response.data.message);
      // You can update the count of wishlist items here if needed
    } else {
      // Some error occurred
      toast.error(response.data.message);
    }
  } catch (error) {
    // Handle error if request fails
    console.error("Error:", error);
  }
};
</script>
