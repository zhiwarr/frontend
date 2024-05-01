<template>
  <!-- deals section start -->
  <section class="deals-section px-15 pt-0">
    <div class="title-part">
      <h2>Deals of the Day</h2>
      <router-link :to="{ name: 'shop' }">See All</router-link>
    </div>
    <div class="product-section">
      <div class="row gy-3">
        <div v-for="product in products" :key="product.id" class="col-12">
          <div class="product-inline">
            <router-link
              :to="{ name: 'product-detail', params: { product: product.slug } }"
            >
              <img :src="$uploads + product.thumb_image" class="img-fluid" alt="" />
            </router-link>
            <div class="product-inline-content">
              <div>
                <router-link
                  :to="{ name: 'product-detail', params: { product: product.slug } }"
                >
                  <h4>{{ product.name }}</h4>
                </router-link>
                <h5>by {{ product.vendor.shop_name }}</h5>
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
        </div>
      </div>
    </div>
  </section>
  <div class="divider"></div>
  <!-- deals section end -->
</template>

<script setup>
import { useUserStore } from "../../stores/user";
import { calculateDiscountPercent } from "@/helpers.js";
import { getCurrentInstance } from "vue";
import { toast } from "vue3-toastify";
const userStore = useUserStore();
const instance = getCurrentInstance();
const { $axios, $uploads } = instance.appContext.config.globalProperties;
const props = defineProps(["products"]);
calculateDiscountPercent();

const toWishlist = async (id) => {
  const product_id = id;
  console.log(product_id);
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
